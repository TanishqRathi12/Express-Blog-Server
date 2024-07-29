const {Router} = require("express");

const blogRouter = Router();

const {
    createBlog,
    allBlogs,
    BlogById,
    UpdateBlog,
    patchBlog,
    deleteBlog
} = require("../handlers/blog");

blogRouter.post("", createBlog);

blogRouter.get("", allBlogs);

blogRouter.get("/:blogId", BlogById);

blogRouter.put("/:blogId", UpdateBlog);    

blogRouter.patch("/:blogId", patchBlog);

blogRouter.delete("/:blogId", deleteBlog);

module.exports = {blogRouter};

