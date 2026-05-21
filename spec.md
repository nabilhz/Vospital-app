# Vospital

## Current State
Service worker uses a static cache name `vospital-v1` with cache-first strategy. `skipWaiting()` and `clients.claim()` are already present, so the SW activates immediately. However, since the cache name never changes between deploys, stale assets are served from cache indefinitely -- users don't get updates until they manually clear cache or hard-refresh.

## Requested Changes (Diff)

### Add
- Build timestamp baked into the cache name so each deploy creates a new cache version.

### Modify
- Cache name changed from static `vospital-v1` to `vospital-20260324035313` (timestamp-based), ensuring old caches are purged on every new deploy and users automatically receive the latest version on next page load.

### Remove
- Nothing removed.

## Implementation Plan
1. Update `sw.js`: change `CACHE_NAME` to `vospital-20260324035313`.
2. `skipWaiting()` and `clients.claim()` are already in place -- no changes needed there.
3. On next deploy, the new cache name triggers old cache deletion and forces all clients to load fresh assets.
