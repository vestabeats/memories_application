import express from 'express'
import { getPostBySearch, getPosts,getPost,createPost,updatePost,deletePost,likePost,commentPost } from '../controllers/posts.js';
import auth from '../middleware/auth.js'
const router = express.Router()


router.get('/search',getPostBySearch)
router.get('/',getPosts)
router.get('/:id',getPost)
router.post('/',auth,createPost)
router.patch('/:id',auth,updatePost)
router.delete('/:id',auth,deletePost)
router.patch('/:id/likePost',auth,likePost)
router.patch('/:id/commentPost',auth,commentPost)
export default router;