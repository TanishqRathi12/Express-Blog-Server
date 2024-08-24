const Blog = require("../models/blog");

const blogIndex = async (req, res) => {
  const sort = req.query.sort || 'Oldest';
  let criteria = {createdAt:1};


  if(sort === 'Newest'){
    criteria = {createdAt:-1};
  }
  Blog.find({})
    .populate("author", "name")
    .sort(criteria)
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
    const blog = new Blog({ body, title , author:req.user._conditions._id });
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
  
  Blog.findById(id)
    .then((blog) => res.render("blog/Detail", { blog }))
    .catch((err) => console.log(err));
};

const blogEditGet = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((blog) => {
      console.log(blog.author,req.user._conditions._id)
    if(blog.author == req.user._conditions._id) res.render("blog/Update",{blog}) 
    else{
      req.flash("error_msg","Not Authorized");
      res.redirect("/blog")
    }
    })
    .catch((err) => console.log(err));
};
const blogEditPut = async (req, res) => {
  const id = req.params.id;
  const { body, title } = req.body;

  if (body && title) {
    Blog.findById(id)
      .then((blog)=>{
        if(blog.author == req.user._conditions._id){
          blog.title = title;
          blog.body = body;
          blog.save()
          .then(()=>res.redirect(`/blog/${id}`))
          .catch((err)=>{res.status(500).send();console.error(err)});
        }else{
          req.flash("error_msg","Not Authorized");
          res.redirect("/blog")
        }
      })
      .catch((err) => console.error(err));
  }
};

const blogDelete = async (req, res) => {
  const id = req.params.id;
  const blog =  await Blog.findById(id)
      if(blog.author == req.user._conditions._id){
       await blog.deleteOne();
        res.redirect("/blog");
      }else{
        req.flash("error_msg","Not Authorized");
        res.redirect("/blog")
      }
    
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
