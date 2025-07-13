# fresh_fingi

A PWA for displaying Load Cell data as part of the fingi project.

### Usage

Make sure to install Deno: https://deno.land/manual/getting_started/installation

Ensure that you pulled all of the submodules:

```bash
git submodule update --init --recursive --remote
```

Then start the project:

```bash
deno task start
```

This will watch the project directory and restart as necessary.

### Development

Clean the current environment:

```bash
rm -r node_modules/
deno clean
```
