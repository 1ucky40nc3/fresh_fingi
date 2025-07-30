FROM denoland/deno:latest

ARG GIT_REVISION
ARG PORT=80
ENV DENO_DEPLOYMENT_ID=${GIT_REVISION}
ENV PORT=${PORT}


WORKDIR /app

COPY . .

# Install the module and dependencies 
RUN deno cache main.ts
# Build (ahead-of-time) the application
RUN deno task build

EXPOSE ${PORT}

CMD ["run", "-A", "main.ts"]