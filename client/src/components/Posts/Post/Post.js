import React,{useState,useEffect} from 'react'
import {Card, CardActions, CardContent, CardMedia, Button,Typography,ButtonBase} from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import moment from 'moment'
import useStyles from './styles'
import { useDispatch } from 'react-redux'
import { deletePost,likePost } from '../../../actions/post' 
import { useNavigate } from 'react-router-dom';
const Post = ({post,setCurrentId}) => {
  const user = JSON.parse(localStorage.getItem('profile'))
  const classes = useStyles()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [likes,setLikes] = useState(post?.likes )
  const userId = (user?.result?.googleId || user?.result?._id)
  const hasLiked = post.likes.find((like) => like === userId)

 
  
  const handleLike = async() => {
    const rr =  await dispatch(likePost(post._id));
    if (!hasLiked &&rr) {
      setLikes([...post.likes, userId]);
      window.location.reload();
    } else {
      setLikes(post.likes.filter((id) => id !== userId));
      window.location.reload();
      
    }
    
  }
 
 

  const Likes = () => {
    
    if (likes.length > 0) {
      return likes.find((like) => like === userId)
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAltOutlinedIcon fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpAltOutlinedIcon fontSize="small" />&nbsp;Like</>;
  };
  const openPost=()=>{
    navigate(`/posts/${post._id}`)
  }

  const handleMoreHorizClick = (e) => {
    e.stopPropagation(); // Stop the event propagation to prevent the openPost function from being triggered
    setCurrentId(post._id);
  };


  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase className={classes.cardAction} onClick={openPost}>
      <CardMedia className={classes.media} image={post.selectedFile} title={post.title}></CardMedia>
      <div className={classes.overlay}>
        <Typography variant='h6'>{post?.name}</Typography>
        <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
      </div>
      {(user?.result?.sub ===post?.creator|| user?.result?._id===post?.creator)&&(
      <div className={classes.overlay2}> 
        <Button style={{color:'white'}} size='small' onClick={(e)=>{handleMoreHorizClick(e)}}>
          <MoreHorizIcon fontSize='default'></MoreHorizIcon>
        </Button>
      </div>
      )}
      <div className={classes.details}>
        <Typography variant='body2' color='textSecondary'>{post.tags.map((tag)=>`#${tag}`)}</Typography>
      </div>
      <Typography className={classes.title} variant='h5' gutterBottom>{post.title}</Typography>
      <CardContent>
        <Typography variant='body2' color='textSecondary' component='p'>{post.message}</Typography>
      </CardContent>
      </ButtonBase>
      <CardActions>
        <Button size='small' color='primary' disabled={!user?.result}onClick={handleLike}>
          <Likes/>
          
        </Button>
        {(user?.result?.sub ===post?.creator|| user?.result?._id===post?.creator)&&(
        <Button size='small' color='secondary' onClick={()=>{dispatch(deletePost(post._id))}}>
          <DeleteIcon fontSize='small'/>
          Delete
        </Button>)}
      </CardActions>
      
    </Card>
  )
}

export default Post
