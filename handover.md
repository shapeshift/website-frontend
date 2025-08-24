# ShapeShift Website Release Process - Handover Document

## Overview
This document outlines the work completed to implement a staged release process for the ShapeShift website, similar to the main ShapeShift repository's deployment strategy.

## What Was Implemented

### 1. Release Script (`scripts/release.ts`)
Created a simplified version of the main repo's release script that:
- Supports two release types: Regular and Hotfix
- Manages branch flow: `develop` → `release` → `main`
- Automatically creates GitHub PRs for releases
- Keeps branches synchronized after merges
- Uses Bun (matching the website's tooling)

### 2. Package.json Updates
- Added `"release": "bun scripts/release.ts"` script
- Added required dependencies:
  - `chalk`: Terminal styling
  - `inquirer`: Interactive prompts
  - `pify`: Promise utilities
  - `simple-git`: Git operations
  - `@types/inquirer` and `@types/pify`: TypeScript types

### 3. Key Differences from Main Repo
- **No version tagging** - The website doesn't need semantic versioning
- **No private branch** - Simplified deployment strategy
- **Uses Bun** instead of Yarn/Node
- **Simpler workflow** - No complex build modes or multiple environments

## Deployment Strategy

### Branch Structure
- **`main`** - Production branch (auto-deploys to production URL)
- **`release`** - Staging branch (auto-deploys to staging URL)
- **`develop`** - Development branch (auto-deploys to development URL)

### Vercel Configuration Needed
1. **Enable deployments for all branches** (Settings → Git → Ignored Build Step)
2. **Set up custom domains** (Settings → Domains):
   - `develop.shapeshift.com` → Git Branch: `develop`
   - `release.shapeshift.com` → Git Branch: `release`
3. **Add DNS records** (in your DNS provider):
   - `develop.shapeshift.com` → `cname.vercel-dns.com`
   - `release.shapeshift.com` → `cname.vercel-dns.com`

## Next Steps

### 1. Install Dependencies
```bash
cd /home/sean/Repos/shapeshift-website
bun install
```

### 2. Create Required Branches
```bash
git checkout -b develop
git push -u origin develop

git checkout -b release
git push -u origin release
```

### 3. Configure GitHub Repository
- Set `develop` as the default branch (Settings → Branches → Default branch)
- This ensures PRs automatically target `develop` instead of `main`

### 4. Run Lint and Fix Issues
The release script was auto-formatted by the linter but may need additional fixes:
```bash
bun run lint
```

### 5. Test the Release Process
```bash
# From develop branch with some commits
bun release
```

## Release Workflow

### Regular Release (develop → release → main)
1. Make changes on feature branches, merge to `develop`
2. Run `bun release` and select "Regular"
3. Script creates PR from `release` to `main`
4. Review and test on staging URL
5. Merge PR to deploy to production
6. Run `bun release` again to complete the cycle

### Hotfix Release (feature → release → main)
1. Create hotfix branch from `main`
2. Run `bun release` and select "Hotfix"
3. Script creates PR from `release` to `main`
4. Review and test on staging URL
5. Merge PR to deploy to production

## Troubleshooting

### GitHub CLI Issues
- Install: https://github.com/cli/cli#installation
- Authenticate: `gh auth login`

### Permission Issues
- Ensure you have push access to all branches
- Check branch protection rules aren't blocking force pushes to `release`

### Vercel Deployment Issues
- Check build logs in Vercel dashboard
- Ensure environment variables are set correctly for each branch
- Verify DNS propagation for custom domains

## Benefits of This Approach
1. **Staged rollouts** - Test changes on staging before production
2. **Simple workflow** - No complex scripts or version management
3. **Automatic deployments** - Vercel handles all builds and deployments
4. **Clear separation** - Each environment has its own URL
5. **Rollback capability** - Can quickly revert by resetting branches

## Comparison with Main Repo
| Feature | Main Repo | Website |
|---------|-----------|---------|
| Deployment Platform | Cloudflare Pages | Vercel |
| Version Tags | Yes (semver) | No |
| Release Script | Complex (200+ lines) | Simple (~200 lines) |
| Branches | develop/release/main/private | develop/release/main |
| Build Modes | Multiple (prod/dev/private) | Single |
| Manual Deploy Steps | Required | Automatic |

This simplified approach is more appropriate for a marketing website while still providing the safety of staged deployments.