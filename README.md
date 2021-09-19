# online-dress-store

An Online store website for dresses built with [sveltekit](https://github.com/sveltejs) and [Firebase](https://console.firebase.google.com/)

## Prerequisites

In order for `firebase-admin` to work correctly, you need to get the serviceAccountKey from Firebase account and put in the root folder in the fileName called `serviceAccountKey.json`

## Development

```bash
# install dependencies
npm install

# run dev server
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

Before creating a production version of your app, install an [adapter](https://kit.svelte.dev/docs#adapters) for your target environment. Then:

```bash
npm run build
```

> You can preview the built app with `npm run preview`, regardless of whether you installed an adapter. This should _not_ be used to serve your app in production.

## Deployment

Deploys to firebase hosting by using firebase functions for SSR.
