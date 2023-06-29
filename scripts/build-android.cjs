const { exec } = require("node:child_process");
const path = require("node:path");

const { config } = require("dotenv");
config();

const ANDROID_KEYSTORE_PATH = process.env.ANDROID_KEYSTORE_PATH;
const ANDROID_KEYSTORE_PASSWORD = process.env.ANDROID_KEYSTORE_PASSWORD;

const keystoreAlias = process.env.ANDROID_KEYSTORE_ALIAS || "upload";
const androidReleaseType = process.env.ANDROID_RELEASE_TYPE || "AAB";

console.log("Run pnpm build:mobile first");

const command = `cross-env-shell NODE_ENV=production "pnpm cap build android --keystorepath ${ANDROID_KEYSTORE_PATH} --keystorepass '${ANDROID_KEYSTORE_PASSWORD}' --keystorealias ${keystoreAlias} --keystorealiaspass '${ANDROID_KEYSTORE_PASSWORD}' --androidreleasetype ${androidReleaseType}"`;

// Execute the npm script
const npmProcess = exec(command);

// Listen for output from the child process
npmProcess.stdout.on("data", (data) => {
  console.log(`stdout: ${data}`);
});

// Listen for error output from the child process
npmProcess.stderr.on("data", (data) => {
  console.error(`stderr: ${data}`);
});

// Listen for the child process to exit
npmProcess.on("close", (code) => {
  console.log(`child process exited with code ${code}`);
});