const Blog = require("../models/blog");

const blogIndex = async (req, res) => {
  Blog.find({})
    .then((blogs) => {
      res.render("blog/index", { blogs });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send();
    });
};

const blogCreateGet = (req, res) => {
  res.render("blog/new");
};

const blogCreatePost = async (req, res) => {
  const { title, body } = req.body;
  if (title && body) {
    const blog = new Blog({ body, title });
    try {
      await blog.save();
      res.redirect("/blog");
    } catch (err) {
      console.error(err);
    }
  }
};

const blogDetails = (req, res) => {
  const id = req.params.id;
  //const {id} = req.params;
  Blog.findById(id)
    .then((blog) => res.render("blog/detail", { blog }))
    .catch((err) => console.log(err));
};

const blogEditGet = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((blog) => res.render("blog/Update", { blog }))
    .catch((err) => console.log(err));
};
const blogEditPut = (req, res) => {
  const id = req.params.id;
  const { body, title } = req.body;

  if (body && title) {
    Blog.findByIdAndUpdate(id, { body, title })
      .then((_) => res.redirect(`/blog/${id}`))
      .catch((err) => console.error(err));
  }
};

const blogDelete = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((_) => res.redirect(`/blog`))
    .catch((err) => console.error(err));
};
module.exports = {
  blogIndex,
  blogCreateGet,
  blogCreatePost,
  blogDetails,
  blogEditGet,
  blogEditPut,
  blogDelete,
};
