const { Router } = require("express");

const blogController = require("../controllers/blog.controller");

const blogRouter = Router();

blogRouter.get("/", blogController.blogIndex);
blogRouter.get("/new", blogController.blogCreateGet);
blogRouter.post("/", blogController.blogCreatePost);
blogRouter.get("/:id", blogController.blogDetails);
blogRouter.get("/:id/Update", blogController.blogEditGet);
blogRouter.put("/:id", blogController.blogEditPut);
blogRouter.delete("/:id", blogController.blogDelete);

module.exports = {
  blogRouter,
};

// const {
//     createBlog,
//     allBlogs,
//     BlogById,
//     UpdateBlog,
//     patchBlog,
//     deleteBlog
// } = require("../handlers/blog");

// blogRouter.post("", createBlog);

// blogRouter.get("", allBlogs);

// blogRouter.get("/:blogId", BlogById);

// blogRouter.put("/:blogId", UpdateBlog);

// blogRouter.patch("/:blogId", patchBlog);

// blogRouter.delete("/:blogId", deleteBlog);
