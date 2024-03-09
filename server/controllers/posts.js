import mongoose from "mongoose"
import PostMessage from "../models/postMessage.js"
import sharp from 'sharp';

export const getPosts = async(req,res)=>{
  const {page} = req.query
  try{
    const LIMIT = 8
    const startIndex = (Number(page) - 1) * LIMIT
    const total = await PostMessage.countDocuments({})
    const posts = await PostMessage.find().sort({_id:-1}).limit(LIMIT).skip(startIndex)
    
    res.status(200).json({data:posts, currentPage: Number(page),numberOfPages: Math.ceil(total/LIMIT)})
  }catch(error){
    res.status(404).json({message:error.message})
  }

}
export const getPost = async(req,res)=>{
  const {id} = req.params
  try{
    
    const post = await PostMessage.findById(id)
    
    res.status(200).json({data:post})
  }catch(error){
    res.status(404).json({message:error.message})
  }

}

export const createPost = async(req,res)=>{
  const post = req.body
  const newPost = new PostMessage({...post,creator:req.userId,createdAt:new Date().toISOString()})
  try{
    await newPost.save()
    res.status(201).json(newPost)
  }catch(error){
    res.status(409).json({message:error.message})
  }
 
}


export const updatePost = async(req,res)=>{
  const {id:_id} = req.params;
  const post = req.body
  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id')
  const updatedPost = await PostMessage.findByIdAndUpdate(_id,post,{ new : true })
res.json(updatedPost)
}
export const deletePost = async(req,res)=>{
  const {id} = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id')
  await PostMessage.findByIdAndRemove(id)
  res.json({message:'post deleted successfully'})
}
export const likePost = async(req,res)=>{
  if(!req.userId) return res.json({message:'unauthenticated'})
  const {id} = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id')
  const post = await PostMessage.findById(id)
  const index = post.likes.findIndex((id)=>id===String(req.userId))
  if(index===-1){
    post.likes.push(req.userId)
  }else{
    post.likes = post.likes.filter((id)=>id!==String(req.userId))
  }
  const updatedPost = await PostMessage.findByIdAndUpdate(id,post,{ new : true })
  res.json(updatedPost)

}

export const commentPost = async(req,res)=>{
  const {id} = req.params
  const {value} = req.body
  const post = await PostMessage.findById(id)
  post.comments.push(value)
  const updatedPost = await PostMessage.findByIdAndUpdate(id,post, {new:true})
  res.json(updatedPost)
}

export const getPostBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;

  try {
    let query = {};

    if (searchQuery && tags) {
      // If both title and tags are present, search for posts with either the title or tags
      query = {
        $or: [
          { title: new RegExp(searchQuery, 'i') },
          { tags: { $in: tags.split(', ') } },
        ],
      };
    } else if (searchQuery) {
      // If only title is present, search by title
      query = { title: new RegExp(searchQuery, 'i') };
    } else if (tags) {
      // If only tags are present, search by tags
      query = { tags: { $in: tags.split(', ') } };
    } else {
      // No valid search parameters provided
      return res.status(400).json({ message: 'Invalid search parameters' });
    }
  
    const posts = await PostMessage.find(query);

    if (!posts || posts.length === 0) {
      return res.status(404).json({ message: 'No posts found' });
    }

    res.json({ data: posts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

