### `st-run yarn add a + yarn add b + yarn add c`

> 💨Just like `npx` but chainable, way faster and always using `@latest` of any command. 💨

> 🎉 Get rid of all npm script to chain commands. 🎉

> 🚀Get rid of direct & out-dated CLI dependencies. 🚀

> 🧑‍🤝‍🧑 Cross-platform and end-2-end tested. ✨

~2x faster than `npx` when your machine is online:

<img src="when-online.png" height="200"/>


~5x faster than `npx` when your machine is offline:

<img src="when-offline.png" height="200"/>

And it always checks for the `@latest` version when your machine is online.

You can use `st-run` in npm scripts like this:

```
{
    "name": "your-node-module",
    "scripts": {
        "copy-smth": "st-run st-cp package.json package.json2 + st-cp package2.json package3.json"
    },
    "dependencies": {
        "st-run": "latest"
    }
}
```

This way you may *get rid of some direct dependencies* and make sure the CLI tools being _used by end-users are always up to date_.

Or install it globally like `npx`:

    npm i -g st-run

And use it globally just like `npx`:

    st-run st-cp package.json package.json2