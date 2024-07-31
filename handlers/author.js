const {MongoClient, ObjectId, ReturnDocument} = require("mongodb")
const {MONGO_URI} = require("../env")
const {BLOG_DB,AUTHOR_COL} = require("../constant")

const createAuthor = async (req,res)=>{
    const {body} = req;
    const {name} = body;
    const client = new MongoClient(MONGO_URI);
    try{
        const blogDb = client.db(BLOG_DB);
        const authors = blogDb.collection(AUTHOR_COL);
        const result = await authors.insertOne({name});
        console.log(`inserted ${{name}} in authors with id: ${result.insertedId} `)
    }catch(err){
        res.status(500).send("Server Error")
    }
    finally{
        await client.close()
    }
    res.status(200).send("OK")
}

const readAllAuthor = async (req,res)=>{
    const client = new MongoClient(MONGO_URI);
    try{
        const blogDb = client.db(BLOG_DB);
        const authors = blogDb.collection(AUTHOR_COL);
        const curser = await authors.find({});
        const result = await curser.toArray();
        res.status(200).json(result).send()
    }
    catch(err){
        res.status(500).send("Server Error");
    }
    finally{
        await client.close()
    }
}

const authorById = async (req,res)=>{
    let {authorId} = req.params;
    const client = new MongoClient(MONGO_URI);
    try{
        authorId = new ObjectId(authorId)
        const blogDb = client.db(BLOG_DB);
        const authors = blogDb.collection(AUTHOR_COL);
        const result = await authors.findOne({_id:authorId})
        res.status(200).json(result).send()
    }
    catch(err){
        res.status(500).send("Server Error");
    }
    finally{
        await client.close();
    }
}

const updateAuthor = async (req,res)=>{
    let {authorId} = req.params;
    const {body} = req;
    const {name} = body;
    const client = new MongoClient(MONGO_URI);
    try{
        authorId = new ObjectId(authorId)
        const blogDb = client.db(BLOG_DB);
        const authors = blogDb.collection(AUTHOR_COL);
        const result = await authors.findOneAndUpdate({_id:authorId},{$set:{name}},{ReturnDocument:"after"})
        res.status(200).json({result,message:"Successfully Updated"}).send();
    }
    catch{
        res.status(500).send("Server Error")
    }
    finally{
        await client.close()
    }
}

const patchAuthor = async (req,res)=>{
    let {authorId} = req.params;
    const {body} = req;
    const {name} = body;
    const client = new MongoClient(MONGO_URI);
    let updateName = {};
    if (name) updateName.name = name;
    try{
        authorId = new ObjectId(authorId)
        const blogDb = client.db(BLOG_DB);
        const authors = blogDb.collection(AUTHOR_COL);
        const result = await authors.findOneAndUpdate({_id:authorId},{$set:updateName},{ReturnDocument:"after"})
        res.status(200).json({result,message:"Successfully Patched"}).send();
    }
    catch{
        res.status(500).send("Server Error")
    }
    finally{
        await client.close()
    }
}


module.exports = {
    createAuthor,
    readAllAuthor,
    authorById,
    updateAuthor,
    patchAuthor,
}