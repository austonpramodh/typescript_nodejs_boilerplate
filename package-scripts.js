// Multiplatform support(Mac,Windows,Linux)
const {
    rimraf, // rm command
    series,
    // eslint-disable-next-line @typescript-eslint/no-var-requires
} = require("nps-utils");

const dockerPorts = {
    external: 3000, //Outside container
    internal: 3000, //Inside container
};

module.exports = {
    scripts: {
        default: { script: "nps start", description: "Starts the already built app" },
        start: {
            script: "node dist/index.bundle.js",
            description: "Starts the already built app",
        },
        debug: {
            script: "webpack --config webpack.dev.ts --debug",
            description: "Starts the app in debug mode",
        },
        dev: {
            script: "webpack --config webpack.dev.ts",
            description: "Starts the app in dev mode",
        },
        build: {
            default: "nps build.prod",
            prod: { script: "webpack --config webpack.prod.ts", description: "Builds the app" },
        },
        clean: {
            script: rimraf("./dist"),
            description: "Deletes the `dist` folder",
        },
        test: {
            script: "jest",
            description: "Runs all the tests",
        },
        lint: {
            script: "tsc --noEmit && eslint src --ext ts --ext js --quiet --fix",
            description: "Looks for linting error in the app and fixes the errors",
        },
        docker: {
            default: "nps docker.prod",
            dev: {
                description: "Run this application inside docker in watch mode",
                script: `docker run -p ${dockerPorts.external}:${dockerPorts.internal} --rm -v ${__dirname}:/app -w /app -it node:current-alpine npm start dev`,
            },
            build: {
                script: "docker build -t chichat/auth-service:latest .",
                description: "Build docker container in production mode",
            },
            prod: {
                script: series(
                    "npm start docker.build",
                    `docker run -p ${dockerPorts.external}:${dockerPorts.internal} -n @chichat/auth-service --rm  -it chichat/auth-service:latest`,
                ),
                description: "Run inside docker in production mode",
            },
        },
    },
};
