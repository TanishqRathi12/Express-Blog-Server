let blog = [];

const createBlog = (req, res) => {
    // console.log(req.body);
    const { body } = req;
    const { author, content } = body;
  
    if (author && content) {
      blog.push({ author, content });
      res.status(201).send("OK");
      return;
    }
    res.status(400).send("!OK");
};

const allBlogs = (req, res) => {
    res.status(200).json(blog).send();
};

const BlogById =  (req, res) => {
    let { blogId } = req.params;
    console.log(blogId);
    if (blogId > 0 && blogId <= blog.length) {
      blogId -= 1;
      const blogToReturn = blog[blogId];
      return res.status(200).json(blogToReturn).send();
    }
    //res.json(blog).send();
    res.status(404).send();
};

const UpdateBlog = (req,res)=>{
    const {author , content}=req.body;
    let {blogId}=req.params;
    console.log(blogId);
    if(blogId>0 && blogId<=blog.length && author && content){ 
      blogId-=1;
      blog[blogId] = {author, content};
      console.log(blog[blogId]);
      return res.status(200).send();
    }
      return res.status(400).send();
};

const patchBlog = (req,res)=>{
    const {author , content}=req.body;
    let {blogId}=req.params;
    if(blogId>0 && blogId<=blog.length && author && content){
      blogId-=1;
      if(author) blog[blogId].author = author;
      if(content) blog[blogId].content = content;
      return res.status(200).send();
    }
      return res.status(400).send();
};

 const deleteBlog = (req,res)=>{
    let {blogId}=req.params;
    if(blogId>0 && blogId<=blog.length){
      blogId-=1
      blog.splice(blogId,1);
      return res.status(200).send();
    }
    return res.status(404).send();
};

module.exports = {
    createBlog,
    allBlogs,
    BlogById,
    UpdateBlog,
    patchBlog,
    deleteBlog
}
  
