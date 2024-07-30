//let blog = [];

const {MongoClient, ObjectId} = require('mongodb');
const {MONGO_URI} = require("../emv");
const {BLOG_DB,BLOG_COL} = require("../constant");


const createBlog = async (req, res) => {
    const { body } = req;
    const { author, content } = body;
    const client = new MongoClient(MONGO_URI);
    try{
      const  blogDb = client.db(BLOG_DB)
      const blogs = blogDb.collection(BLOG_COL)
      const result = await blogs.insertOne({author,content})
      console.log(`inserted ${{author,content}} into blogs , with _id: ${result.insertedId}`);
    }
    catch(err){
        res.status(500).send("Internal Server Error");
    }
    finally{
        await client.close();
    }
    res.status(200).send("OK");
};

const allBlogs = async (req, res) => {
    const client = new MongoClient(MONGO_URI);
    try{
      const blogDb = client.db(BLOG_DB);
      const blogs = blogDb.collection(BLOG_COL);
      const cursor = await blogs.find({})
      const result= await cursor.toArray()
      res.status(200).json(result).send();
    }
  catch(err){
      res.status(500).send("Internal Server Error");
  }
  finally{
      await client.close();
  }
};

const BlogById = async (req, res) => {;
  let {blogId} = req.params;
  const client = new MongoClient(MONGO_URI);
  try{
    blogId = new ObjectId(blogId);
    console.log(blogId);
    const blogDb = client.db(BLOG_DB);
    const blogs = blogDb.collection(BLOG_COL);
    const result = await blogs.findOne({ _id:blogId})
    res.status(200).json(result).send();
  }
catch(err){
  res.status(500).send("Internal Server Error");
}
finally{
    await client.close();
}

};

const UpdateBlog = async (req,res)=>{
  const {author ,  content } = req.body;
  let {blogId} = req.params;
  const client = new MongoClient(MONGO_URI);
  try{
    blogId = new ObjectId(blogId);
    const blogDb = client.db(BLOG_DB);
    const blogs = blogDb.collection(BLOG_COL);
    const result = await blogs.findOneAndUpdate({_id: blogId},{$set:{author,content}},{returnDocument:"after"})
    res.status(200).json({result, message:"Success"}).send();
  }catch(err){
    res.status(500).send("Internal Server Error");
}
finally{
    await client.close();
}
};

const patchBlog =  async (req,res)=>{
  const {author ,  content } = req.body;
  let {blogId} = req.params;
  const client = new MongoClient(MONGO_URI);
  const updateDoc={}
  if (author) updateDoc.author = author;
  if (content) updateDoc.content = content;
  try{
    blogId = new ObjectId(blogId);
    const blogDb = client.db(BLOG_DB);
    const blogs = blogDb.collection(BLOG_COL);
    const result = await blogs.findOneAndUpdate({_id: blogId},{$set:updateDoc},{returnDocument:"after"})
    res.status(200).json({result, message:"Success"}).send();
  }catch(err){
    res.status(500).send("Internal Server Error");
}
finally{
    await client.close();
}
};

 const deleteBlog =  async (req,res)=>{
  let {blogId} = req.params;
  const client = new MongoClient(MONGO_URI)
  try{
    blogId = new ObjectId(blogId);
    const blogDb = client.db(BLOG_DB);
    const blogs = blogDb.collection(BLOG_COL);
   const result = await blogs.deleteOne({_id:blogId});
    res.status(200).json({result, message:"Success"}).send();
  }catch(err){
    res.status(500).send("Internal Server Error");
}
finally{
    await client.close();
}
};

module.exports = {
    createBlog,
    allBlogs,
    BlogById,
    UpdateBlog,
    patchBlog,
    deleteBlog
}
  
