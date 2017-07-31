# CLI Core

A common starting point for a suite of CLI tools oriented around generating React development environments



## Setup

**NB: this is subject to change as the repository matures**

1. clone this repository: `git clone https://github.com/pentaphobe/cli-core.git [TARGET_DIR]`
    - _where `TARGET_DIR` is the optional destination for your project (defaults to `cli-core`)
2. go into your project folder: `cd TARGET_DIR`
3. setup your instance
    1. `npm run init`
    2. answer the configuration questions
4. test your install
    1. Run locally: `npm start`
    2. Install globally (see [Development Environment](#development-environment))



### Development Environment

Getting setup to build your CLI tool is pretty standard:

1. (go to your project folder)
2. `npm install -g` or `yarn global`
3. `npm link` or `yarn link`
4. run your command, this is whatever was specified during init (see [Setup](#setup)) or by default `cli-core`

Your development folder should now be linked to the global tool, so any changes will immediately be reflected




## Configuration

You can point to your own main script in `package.json`, this defaults to the Javascript file `src/main`

```json
"cli": {
  "main": "src/main"
}
```



## TODOs

- [ ] test the `yarn global` && `yarn link` usage
- [ ] test coverage