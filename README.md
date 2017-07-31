# CLI Core

A common starting point for a suite of CLI tools oriented around generating React development environments

## Setup

**NB: this is subject to change as the repository matures**

1. clone this repository: `git clone https://github.com/pentaphobe/cli-core.git [TARGET_DIR]`
    - _where `TARGET_DIR` is the optional destination for your project (defaults to `cli-core`)
2. go into your project folder: `cd TARGET_DIR`
3. test your installation:
    1. 

## Configuration

You can point to your own main script in `package.json`, this defaults to the Javascript file `src/main`

```json
"cli": {
  "main": "src/main"
}
```

## TODOs

