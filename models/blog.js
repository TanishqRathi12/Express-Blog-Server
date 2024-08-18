const { mongoose, model } = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  author:{
    type:mongoose.Schema.Types.ObjectId,
    require:true,
    ref:"Author",
  }
});

const Blog = model("blogs", blogSchema);

module.exports = Blog;
