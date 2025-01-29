'use client';

import {Component} from 'react';

import type {ReactNode} from 'react';

type TProps = {
	children: ReactNode;
	fallback?: ReactNode;
};

type TState = {
	hasError: boolean;
};

/********************************************************************************************
 * Error boundary component
 * Catches JavaScript errors in child components
 * @param {ReactNode} children - Child components to wrap
 * @param {ReactNode} fallback - Optional fallback UI to show on error
 ********************************************************************************************/
export class ErrorBoundary extends Component<TProps, TState> {
	public state: TState = {
		hasError: false
	};

	public static getDerivedStateFromError(): TState {
		return {hasError: true};
	}

	public render(): ReactNode {
		if (this.state.hasError) {
			return this.props.fallback ?? <div>{'Something went wrong'}</div>;
		}

		return this.props.children;
	}
}
