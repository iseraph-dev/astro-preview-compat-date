# `astro preview` exits when `compatibilityDate` is newer than Miniflare's pinned workerd

On `main`, compatibility dates work differently. A date newer than the bundled runtime falls back to the `workerd` installed with Wrangler, and installing a newer Wrangler is enough to use a newer date.

On `next`, `astro preview` goes through `@astrojs/cloudflare@15.0.0-beta.1` → `@cloudflare/vite-plugin@2.0.0-beta.sha-52b0dc0e9` → `miniflare@5.20260930.0-alpha` → `workerd@1.20260930.2`. The date in `cloudflare.config.ts` is not rewritten. Preview exits.

If that pin is intentional, this comment in the v15 deploy docs stops being true as soon as the adapter goes a while without a release:

```ts
compatibilityDate: 'YYYY-MM-DD', // Update to the day you deploy
```

<https://github.com/withastro/docs/pull/14651/changes>

The day you deploy can be newer than the binary `astro preview` starts.

## Versions

- `astro@7.4.0-beta.1`
- `@astrojs/cloudflare@15.0.0-beta.1`
- `cf@1.0.0-beta.14`

## Steps

```sh
npm ci
npm run build
npm run preview
```

`cloudflare.config.ts` sets `compatibilityDate` to `2026-10-12`.

## Expected

`astro preview` stays up, on the newest date supported by the runtime installed in the project.

## Actual

Exit code 1. `astro preview` prints only:

```text
MiniflareCoreError [ERR_RUNTIME_FAILURE]: The Workers runtime failed to start. There is likely additional logging output above.
```
