'use client'

import { motion, useAnimationFrame, useMotionValue, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'

import { Button } from '@/app/[lang]/_components/Button'
import { IconFox } from '@/app/[lang]/_icons/IconFox'
import { IconSettings } from '@/app/[lang]/_icons/IconSettings'
import { DEVELOPERS_DICT } from '@/app/[lang]/_utils/dictionary/developers'

import type { FocusEvent, KeyboardEvent, PointerEvent, ReactNode } from 'react'

// Real preset names and their real background/card/accent colors, read directly off
// widget.shapeshift.com's own "Customize Widget" panel (clicked through all seven, recorded
// what actually rendered) — not invented.
const presets = [
  { name: 'Blue', background: '#0a0a14', card: '#12121c', accent: '#3861fb' },
  { name: 'Rose', background: '#140a0f', card: '#1c1218', accent: '#f43f5e' },
  { name: 'Purple', background: '#0e0a14', card: '#1a1424', accent: '#a855f7' },
  { name: 'Cyan', background: '#0a1214', card: '#141d20', accent: '#06b6d4' },
  { name: 'Green', background: '#0a140e', card: '#141c18', accent: '#10b981' },
  { name: 'Orange', background: '#14100a', card: '#1c1814', accent: '#f97316' },
  { name: 'Stucco', background: '#0d1117', card: '#161b22', accent: '#bea989' },
] as const

const SEGMENT_DEG = 360 / presets.length

// One color stop per preset, evenly spaced — the ring IS the preset list, just laid out
// around a circle instead of a row of squares.
const RING_GRADIENT =
  'conic-gradient(from 0deg, ' +
  presets.map((item, index) => `${item.accent} ${index * SEGMENT_DEG}deg`).join(', ') +
  `, ${presets[0].accent} 360deg)`

// The visual ring runs from inset-[11.5%] to inset-[4%]. The hit area is slightly
// more forgiving than the visible band so the control remains easy to drag.
// yields a circle of radius S*(0.5 - X/100), i.e. (1 - 2X/100) as a fraction of the
// half-width (S/2), which is what radiusFraction below is measured in. A little slack on
// each side makes the hit target more forgiving without reaching into the card in the middle.
const RING_INNER_FRACTION = 0.73
const RING_OUTER_FRACTION = 0.97

function normalizeDeg(deg: number): number {
  return ((deg % 360) + 360) % 360
}

// Recovers which preset sits at a given on-screen bearing (0deg = up, clockwise), given
// how far the ring has been rotated — same convention as CSS conic-gradient + rotate().
// Used for keyboard stepping, where landing on one exact named preset is what "next/previous"
// means; the pointer path below needs the finer, in-between answer instead.
function indexFromBearing(bearingDeg: number, rotationDeg: number): number {
  const gradientAngle = normalizeDeg(bearingDeg - rotationDeg)
  return Math.round(gradientAngle / SEGMENT_DEG) % presets.length
}

type TColors = { background: string; card: string; accent: string }

function hexToRgb(hex: string): [number, number, number] {
  const n = Number.parseInt(hex.slice(1), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

function mixHex(hexA: string, hexB: string, t: number): string {
  const a = hexToRgb(hexA)
  const b = hexToRgb(hexB)
  return (
    '#' +
    a
      .map((channel, i) => Math.round(channel + (b[i] - channel) * t))
      .map((channel) => channel.toString(16).padStart(2, '0'))
      .join('')
  )
}

// The ring's colors are NOT 7 hard-edged wedges — RING_GRADIENT is a smooth conic-gradient,
// so any point between two peaks shows a blended color, exactly like a real color wheel.
// This mirrors that same blend in JS (linear per-channel, matching the browser's default
// conic-gradient interpolation) so whatever the pointer lands on maps to that exact color,
// not to whichever of the 7 named presets happens to be nearest.
function colorsAtGradientAngle(gradientAngleDeg: number): TColors {
  const normalized = normalizeDeg(gradientAngleDeg)
  const rawIndex = normalized / SEGMENT_DEG
  const index0 = Math.floor(rawIndex) % presets.length
  const index1 = (index0 + 1) % presets.length
  const t = rawIndex - Math.floor(rawIndex)
  const presetA = presets[index0]
  const presetB = presets[index1]
  return {
    background: mixHex(presetA.background, presetB.background, t),
    card: mixHex(presetA.card, presetB.card, t),
    accent: mixHex(presetA.accent, presetB.accent, t),
  }
}

type TLivePreviewHandle = { applyColors: (colors: TColors) => void }

// Colors are applied imperatively (via `ref.applyColors`) rather than through a `preset` prop,
// so a pointer dragged around the ring can update this every animation frame — a continuous
// blend, exactly matching the ring — without going through React state/re-renders 60 times a
// second. There's no CSS transition on these anymore for the same reason: a transition fighting
// a value that already changes smoothly every frame just adds lag between the ring and the
// preview, instead of adding any actual smoothness.
const LivePreview = forwardRef<TLivePreviewHandle, { initial: TColors }>(function LivePreview({ initial }, ref) {
  const glowRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const sellBoxRef = useRef<HTMLDivElement>(null)
  const buyBoxRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const footerAccentRef = useRef<HTMLSpanElement>(null)

  useImperativeHandle(ref, () => ({
    applyColors(colors: TColors) {
      if (glowRef.current) glowRef.current.style.backgroundColor = colors.accent
      if (cardRef.current) {
        cardRef.current.style.backgroundColor = colors.background
        cardRef.current.style.borderColor = `${colors.accent}40`
      }
      if (sellBoxRef.current) sellBoxRef.current.style.backgroundColor = colors.card
      if (buyBoxRef.current) buyBoxRef.current.style.backgroundColor = colors.card
      if (buttonRef.current) buttonRef.current.style.backgroundColor = colors.accent
      if (footerAccentRef.current) footerAccentRef.current.style.color = colors.accent
    },
  }))

  return (
    <div className={'relative flex justify-center'}>
      <div
        ref={glowRef}
        className={'pointer-events-none absolute inset-[4%] -z-10 rounded-full opacity-[0.18] blur-[72px]'}
        style={{ backgroundColor: initial.accent }}
      />
      <div
        ref={cardRef}
        className={'w-full max-w-[380px] rounded-2xl border p-5 shadow-2xl'}
        style={{
          backgroundColor: initial.background,
          borderColor: `${initial.accent}40`,
        }}
      >
        <div className={'mb-4 flex items-center justify-between'}>
          <span className={'text-base font-semibold text-white'}>{'Swap'}</span>
          <span className={'flex size-8 items-center justify-center rounded-full bg-white/10 text-white/70'}>
            <IconSettings className={'size-4'} />
          </span>
        </div>

        <div ref={sellBoxRef} className={'mb-2 rounded-xl p-3.5'} style={{ backgroundColor: initial.card }}>
          <div className={'mb-1 text-[10px] text-gray-500'}>{'Sell'}</div>
          <div className={'flex items-center justify-between'}>
            <span className={'text-xl font-semibold text-white'}>{'1.0'}</span>
            <span
              className={
                'flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1.5 text-xs font-semibold text-white'
              }
            >
              <Image src={'/widget/eth_icon.png'} alt={''} width={16} height={16} className={'rounded-full'} />
              {'ETH'}
            </span>
          </div>
        </div>

        <div ref={buyBoxRef} className={'mb-4 rounded-xl p-3.5'} style={{ backgroundColor: initial.card }}>
          <div className={'mb-1 text-[10px] text-gray-500'}>{'Buy'}</div>
          <div className={'flex items-center justify-between'}>
            <span className={'text-xl font-semibold text-white'}>{'2,618'}</span>
            <span
              className={
                'flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1.5 text-xs font-semibold text-white'
              }
            >
              <Image src={'/widget/usdc_icon.png'} alt={''} width={16} height={16} className={'rounded-full'} />
              {'USDC'}
            </span>
          </div>
        </div>

        <button
          ref={buttonRef}
          type={'button'}
          tabIndex={-1}
          className={'w-full rounded-xl py-3 text-sm font-semibold text-white'}
          style={{ backgroundColor: initial.accent }}
        >
          {'Connect Wallet'}
        </button>
        <div className={'mt-3 flex items-center justify-center gap-1.5 text-[10px] text-gray-600'}>
          {'Powered by'}
          <span
            ref={footerAccentRef}
            className={'flex items-center gap-1 font-semibold'}
            style={{ color: initial.accent }}
          >
            <IconFox className={'size-3'} />
            {'ShapeShift'}
          </span>
        </div>
      </div>
    </div>
  )
})

function LiveThemeSwitcher(): ReactNode {
  // Only tracks the nearest NAMED preset, for screen readers (aria-valuenow/valuetext) and
  // keyboard stepping — the actual visible colors are driven continuously below, independent
  // of this, via direct DOM writes (see LivePreview's applyColors).
  const [discreteIndex, setDiscreteIndex] = useState(0)
  const shouldReduceMotion = useReducedMotion()

  const rotation = useMotionValue(0)
  const isHoveringRef = useRef(false)
  const isVisibleRef = useRef(false)
  const ringRef = useRef<HTMLDivElement>(null)
  const livePreviewRef = useRef<TLivePreviewHandle>(null)
  const ringGlowRef = useRef<HTMLDivElement>(null)

  // Without this, the idle loop below writes to 6+ DOM nodes on every animation frame forever,
  // even long after the user has scrolled past this section — a real (if small) waste of CPU
  // on a page that stays open. requestAnimationFrame itself doesn't know or care whether the
  // element is on-screen, so it has to be told explicitly.
  useEffect(() => {
    const el = ringRef.current
    if (!el) return undefined
    const observer = new IntersectionObserver(([entry]) => {
      isVisibleRef.current = entry?.isIntersecting ?? false
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  function applyColors(colors: TColors): void {
    livePreviewRef.current?.applyColors(colors)
    if (ringGlowRef.current) ringGlowRef.current.style.backgroundColor = colors.accent
  }

  // Idle: the ring keeps rotating and the color at the top (bearing 0) drives the preview, so
  // it keeps demonstrating that the widget is themeable even if nobody touches it. Rotation
  // decreases (rather than increases) so that, at the fixed bearing of 0deg used below, colors
  // cycle forward through the array (Blue -> Rose -> ... -> Stucco -> Blue) instead of
  // backwards — see colorsAtGradientAngle: gradientAngle = bearing - rotation.
  useAnimationFrame((_time, delta) => {
    if (isHoveringRef.current || shouldReduceMotion || !isVisibleRef.current) return
    rotation.set(rotation.get() - delta * 0.012) // 360deg every 30s

    const gradientAngle = normalizeDeg(0 - rotation.get())
    applyColors(colorsAtGradientAngle(gradientAngle))

    const index = Math.round(gradientAngle / SEGMENT_DEG) % presets.length
    setDiscreteIndex((current) => (current === index ? current : index))
  })

  // Hovering (or dragging a finger across) the ring: whichever exact color sits under the
  // pointer is applied to the preview — a continuous blend, the same one the ring itself
  // shows, not a snap to whichever of the 7 named presets is nearest — and the idle rotation
  // freezes while you do.
  function handlePointerMove(event: PointerEvent<HTMLDivElement>): void {
    const rect = event.currentTarget.getBoundingClientRect()
    const dx = event.clientX - (rect.left + rect.width / 2)
    const dy = event.clientY - (rect.top + rect.height / 2)
    const radiusFraction = Math.hypot(dx, dy) / (rect.width / 2)

    if (radiusFraction < RING_INNER_FRACTION || radiusFraction > RING_OUTER_FRACTION) {
      isHoveringRef.current = false
      return
    }

    isHoveringRef.current = true
    const bearing = normalizeDeg((Math.atan2(dx, -dy) * 180) / Math.PI)
    const gradientAngle = normalizeDeg(bearing - rotation.get())
    applyColors(colorsAtGradientAngle(gradientAngle))
  }

  function handlePointerLeave(): void {
    isHoveringRef.current = false
  }

  // Keyboard equivalent of hovering the ring: Left/Right (or Up/Down) step through the named
  // presets one at a time (a discrete choice makes sense for keyboard/AT users, unlike the
  // pointer's continuous blend).
  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>): void {
    let step = 0
    if (event.key === 'ArrowRight' || event.key === 'ArrowUp') step = 1
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') step = -1
    else return

    event.preventDefault()
    isHoveringRef.current = true
    const index = (discreteIndex + step + presets.length) % presets.length
    setDiscreteIndex(index)
    applyColors(presets[index])
  }

  function handleFocus(event: FocusEvent<HTMLDivElement>): void {
    if (event.target !== event.currentTarget) return
    isHoveringRef.current = true
    const index = indexFromBearing(0, rotation.get())
    setDiscreteIndex(index)
    applyColors(presets[index])
  }

  function handleBlur(): void {
    isHoveringRef.current = false
  }

  return (
    <div className={'flex flex-col items-center gap-7'}>
      <div
        ref={ringRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        tabIndex={0}
        role={'slider'}
        aria-label={'Widget theme preview'}
        aria-valuemin={0}
        aria-valuemax={presets.length - 1}
        aria-valuenow={discreteIndex}
        aria-valuetext={presets[discreteIndex].name}
        className={
          'relative flex aspect-square w-full max-w-[570px] touch-none items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0a0b11]'
        }
      >
        <motion.div
          aria-hidden={'true'}
          className={'pointer-events-none absolute inset-[7%] rounded-full opacity-[0.66] blur-[9px] saturate-[0.88]'}
          style={{
            background: RING_GRADIENT,
            rotate: rotation,
          }}
        />
        <div
          ref={ringGlowRef}
          aria-hidden={'true'}
          className={'pointer-events-none absolute inset-[7%] rounded-full opacity-[0.14] blur-[34px]'}
          style={{ backgroundColor: presets[0].accent }}
        />
        <div className={'relative z-10 w-[74%] max-w-[390px] sm:w-[68%]'}>
          <LivePreview ref={livePreviewRef} initial={presets[0]} />
        </div>
      </div>
    </div>
  )
}

export function DevelopersWidgetSection(): ReactNode {
  const { widget } = DEVELOPERS_DICT.page
  return (
    <section id={'widget'} className={'container mx-auto scroll-mt-28 pt-14 lg:scroll-mt-32 lg:pt-16'}>
      <div
        className={
          'grid items-center gap-8 border-y border-white/[0.08] py-8 sm:py-10 lg:grid-cols-[.78fr_1.22fr] lg:gap-12 lg:py-12'
        }
      >
        <div className={'lg:pl-4'}>
          <h2 className={'max-w-[600px] text-[38px] font-bold leading-[1.04] tracking-[-0.035em] sm:text-[50px]'}>
            {widget.title}
          </h2>
          <p className={'mt-5 max-w-[680px] text-base leading-relaxed text-secondary sm:text-lg'}>
            {widget.description}
          </p>
          <div className={'mt-5'}>
            <Button
              href={'https://widget.shapeshift.com/'}
              variant={'blue'}
              title={widget.ctaButton}
              hasArrow
              className={'w-fit'}
            />
          </div>
        </div>
        <LiveThemeSwitcher />
      </div>
    </section>
  )
}
