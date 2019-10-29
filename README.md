### `st-run` `npm-package` `argument1` `argument2` `...`

> Just like `npx` but way faster and always using `@latest`.

~2x faster than `npx` when your machine is online:

<img src="when-online.png" height="150"/>


~5x faster than `npx` when your machine is offline:

<img src="when-offline.png" height="150"/>

And it always checks for the `latest` version when online.

You can use `st-run` in npm scripts like this:

```
{
    "name": "your-node-module",
    "scripts": {
        "copy-smth": "st-run st-cp package.json package.json2"
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