import config from "./config";
import Command from "./app/command";
import App from "./app/app";

let app;

if (process.argv.length > 2) {
  app = new Command(config);
} else {
  app = new App(config);
}

export default app;

// Launch app
app.Init();