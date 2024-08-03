const express = require("express");
const { blogRouter } = require("./routers/blog");
const { authorRouter } = require("./routers/author");
const { healthRouter } = require("./routers/Heath");
//const {authRouter} = require("./routers/auth")
const { default: mongoose } = require("mongoose");
const { MONGO_URI } = require("./env");
const methodOverride = require("method-override");
const {logger} = require("./middleware/logger")


const port = 8000;
const app = express();

app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use(logger);

//app.use("/",authRouter);
app.use("/blog", blogRouter);
app.use("/author", authorRouter);
app.use("/health", healthRouter);

app.listen(port, () => {
  console.log(`Server running on PORT:${port}`);
  mongoose.connect(MONGO_URI);
});
