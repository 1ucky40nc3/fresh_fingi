FROM denoland/deno:latest

ARG GIT_REVISION
ENV DENO_DEPLOYMENT_ID=${GIT_REVISION}

WORKDIR /app

COPY . .

# Install the module and dependencies 
RUN deno cache main.ts
# Build (ahead-of-time) the application
RUN deno task build

EXPOSE 8000

CMD ["run", "-A", "main.ts"]