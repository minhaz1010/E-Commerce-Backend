

import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";
// import config from "./app/config";

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.DATABASE_URL as string);
    server = app.listen(3000, () => {
      console.log('app is listening on port 3000');
    });
  } catch (err) {
    console.log(err);
  }
}

main();

process.on("unhandledRejection", () => {
  console.log('😈 unahandledRejection is detected , shutting down ...');
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", () => {
  console.log('😈 uncaughtException is detected , shutting down ...');
  process.exit(1);
});



