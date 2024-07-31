const express = require("express");
const { blogRouter } = require("./routers/blog");
const { authorRouter } = require("./routers/author")
const { healthRouter } = require("./routers/Heath");
const { default: mongoose } = require("mongoose");
const { MONGO_URI } = require("./env");


const port = 8000;
const app = express();

app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static("public"));

app.use("/blog",blogRouter)
app.use("/author",authorRouter)
app.use("/health",healthRouter)



app.listen(port, () => {
  console.log(`Server running on PORT:${port}`);
  mongoose.connect(MONGO_URI)
});

