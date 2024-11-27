import path from "path";
const configViewEngine = (app) => {
  app.set("view", path.join(__dirname, "views"));
  app.set("view engine", "ejs");
};

export default configViewEngine;
