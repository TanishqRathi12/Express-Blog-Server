const express = require("express");
const { blogRouter } = require("./routers/blog");
const { healthRouter } = require("./routers/Heath");
const {authRouter} = require("./routers/auth")
const { mongoose } = require("mongoose")
const methodOverride = require("method-override");
//const {logger} = require("./middleware/logger")
const dotenv = require("dotenv");
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport')
const {ensureAuth} = require("./middleware/authmiddle")

dotenv.config();

const port = 8000;
const app = express();

require('./config/passport')(passport);
app.use(session({
  secret:process.env.SESSION_SECRET,
  resave:true,
  saveUninitialized:true,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req,res,next)=>{
  res.locals.success_message = req.flash('success_msg');
  res.locals.error_message = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.author = req.author || null;
  next();
})


app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));







//app.use(logger);

app.use("/",authRouter);
app.use("/blog", ensureAuth ,blogRouter);
app.use("/health", healthRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Something went wrong");
});

app.listen(port, () => {
  console.log(`Server running on PORT:${port}`);
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("connected to db");
  } catch (error) {
    console.log(error);
  }
});
