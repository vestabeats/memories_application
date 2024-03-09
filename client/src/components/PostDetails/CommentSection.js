import React,{useState,useRef} from 'react'
import { Typography,TextField,Button} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './styles'
import {commentPost} from '../../actions/post';

export const CommentSection = ({post}) => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const[comments, setComments] = useState(post?.comments)
    const[comment, setComment] = useState('')
    const commentsRef =  useRef()
    const user = JSON.parse(localStorage.getItem('profile'))
    const handleClick= async()=>{
        const finalComment = `${user.result.name}: ${comment}`
        const newComments = await dispatch(commentPost(finalComment ,post._id))
        setComments(newComments)
        setComment('')
        commentsRef.current.scrollIntoView({behavior:'smooth'})
    }
   
  return (
    <div>
        <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
        <Typography gutterBottom variant="h6">Comments</Typography>
        {comments.map((c,i)=>(
            <Typography key={1} gutterBottom variant='subtitle1'>
                <strong>{c.split(': ')[0]}</strong>
                {c.split(':')[1]}
                </Typography>
        ))}
        <div ref={commentsRef}/>
        </div>
        {user?.result?.name &&(
        <div style={{width:'70%'}}>
        <Typography gutterBottom variant="h6">Write a Comment</Typography>
        <TextField
        fullWidth
        rows={4}
        variant='outlined'
        label='Comment'
        multiline
        value={comment}
        onChange={(e)=>setComment(e.target.value)}
        />
        <Button style={{marginTop:'10px'}} variant='contained' fullWidth disabled={!comment} color="primary" onClick={handleClick}>Save</Button>
        </div>
       )}
        </div>
    </div>
  )
}
