const express = require("express");
const port = 8000;
const app = express();

const blog = [];

app.use(express.json());

app.get("/health", (req, res) => {
  res.send("OK");
});

app.post("/blog", (req, res) => {
  // console.log(req.body);
  const { body } = req;
  const { author, content } = body;

  if (author && content) {
    blog.push({ author, content });
    res.send("OK");
    return;
  }
  res.status(400).send("!OK");
});
app.get("/blog", (req, res) => {
  res.status(200).json(blog).send();
});

app.get("/blog/:blogId", (req, res) => {
  let { blogId } = req.params;
  console.log(blogId);
  blogId -= 1;
  if (blogId > 0 && blogId <= blog.length) {
    const blogToReturn = blog[blogId];
    return res.status(200).json(blogToReturn).send();
  }
  //res.json(blog).send();
  res.status(404).send();
});

app.listen(port, () => {
  console.log(`Server running on PORT:${port}`);
});

