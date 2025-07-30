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
deno cache --reload .
```

### Deployment

Here is how you can create a Docker container to deploy this application:

```bash
# Build a Docker container image
docker build --build-arg GIT_REVISION=$(git rev-parse HEAD) --build-arg PLATFORM=linux/amd64 -t fresh_fingi .
# Run a Docker container
docker run -t -i -p 1234:80 fresh_fingi
# Open http://localhost:1234 and you see the application
```

## Sources

- [Deno Fresh Web App Demo]

[Deno Fresh Web App Demo]: https://github.com/erictherobot/deno-app-1
