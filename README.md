# RayTai Merkle Tree Proof generator for Google Functions

This repo's layout is designed to be easily integrated with [Google Functions](https://cloud.google.com/functions/).
This repo is [gitpod](https://gitpod.io) compatible.

## Using
Deployment to Google Functions v1 seems to be quite straightforward,
  1. just paste `package.json`, `index.js` and `allowlist.js` from this repo,
  2. modify contents of `allowlist.js` to your own list,
  3. update **Entry point** value from `helloWorld` to `merkleTreeProofGenerator`,
  4. Press **Deploy**!

Then your frontend should fetch from your endpoint like this:

```
const proof = await fetch()
// ...
// use |proof| in your minting function.
```

## Testing
To make testing easier, but preserve the main purpose of this repo, you need to install express manually:

```
$ npm install -g express
```

Then you can update `allowlist.js` and run HTTP-server.

```
$ node testserver.js
```

If you are satisfied with results, YAY, thanks for chosing us.

-- 
Let's code team