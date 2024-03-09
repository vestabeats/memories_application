import React,{useState} from 'react'
import { Paper,Grid,Typography,Container,Button,Avatar } from '@material-ui/core'
//import { GoogleLogin } from 'react-google-login';
import { GoogleLogin  } from '@react-oauth/google';
import LockOutLinedIcon from '@material-ui/icons/LockOutlined'
import useStyles from './styles'
import Input from './Input'
//import Icon from './Icon'
import { useNavigate } from 'react-router-dom';
import { jwtDecode as jwt_decode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import {signin,signup} from '../../actions/auth'
const Auth = () => {
  const initialState = {firstname:'',lastname:'',email:'',password:'',confirmPassword:''}
  const navigate = useNavigate();
  const [showPassWord, setShowPassword] = useState(false)
  const classes = useStyles()
  const dispatch = useDispatch()
  const [IsSignUp, setIsSignUp] = useState(false)
  const [formData, setFormData] = useState(initialState )


  const handleSubmit=(e)=>{
    e.preventDefault()
  
    if(IsSignUp){
      dispatch(signup(formData,navigate))
    }else{
      dispatch(signin(formData,navigate))
    }
    console.log(formData)
  }
  const handleShowPassword=()=>setShowPassword((prevShowPassword)=>!prevShowPassword)

  const handleChange=(e)=>{
      setFormData({...formData,[e.target.name]:e.target.value})
  }
  const switchMode=()=>{
    setIsSignUp((prevSignUp)=>!prevSignUp)
    setShowPassword(false)
  }
  const googleSuccess=async(res)=>{
    const token = res?.credential;
    const result =jwt_decode(res.credential) 
   
    console.log(res)
    try{
      dispatch({type:'AUTH', data:{result,token}})
      navigate('/');
    }catch(error){
      console.log(error)
    }
  }
  const googleFailure=(error)=>{
    console.log(error);
    console.log('Google sign in was unsuccessful')
  }
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutLinedIcon/>
        </Avatar>
        <Typography variant='h5'>{IsSignUp ? 'Sign Up' : 'Sign In'}</Typography>
        <form className='classes.form' onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {
                IsSignUp && (
                  <>
                  
                  <Input name='firstname' label='First Name' handleChange={handleChange} autoFocus half/>
                  <Input name='lastname' label='Last Name' handleChange={handleChange} half/>
                  </>
                )
              }
              <Input name='email' label='Email Adress' handleChange={handleChange} type="email"/>
              <Input name='password' label='Password' handleChange={handleChange} type={showPassWord ? "text" : "password"} handleShowPassword={handleShowPassword}/>
              {IsSignUp && (
                <Input name='confirmPassword' label="Repeat Password" handleChange={handleChange} type='password'/>
              )}
            </Grid>
              
            <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
              {IsSignUp ? 'Sign Up' : 'Sign In'}
            </Button>
            <GoogleLogin
          
            onSuccess={googleSuccess}
            onError={googleFailure}
           
          />
            <Grid container justifyContent='center'>
                <Grid item>
                  <Button onClick={switchMode}>
                    {IsSignUp ? 'Already have an account? sign in' : 'Dont have an account sign up'}
                  </Button>
                </Grid>
            </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth
