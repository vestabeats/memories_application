import React from 'react'
import { BrowserRouter,Routes,Route,Switch,Navigate } from 'react-router-dom'
import { Container} from '@material-ui/core'
import { GoogleOAuthProvider } from '@react-oauth/google';
import useStyles from './styles'
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth'
import PostDetails from './components/PostDetails/PostDetails';
import { ToastProvider } from 'react-toast-notifications';
const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'))
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  return (
    
    < BrowserRouter>
    <Container maxWidth='xl'>
    <GoogleOAuthProvider clientId= {clientId}>
    <ToastProvider>
      <Navbar/>
      <Routes>
      <Route path='/' exact Component={()=> <Navigate to="/posts"/>}/>
      <Route path='/posts' exact Component={Home}/>
      <Route path='/posts/search' exact Component={Home}/>
      <Route path='/posts/:id'  Component={PostDetails}/>
      <Route path='/auth' Component={()=>(!user? <Auth/> : <Navigate to="/posts"/>)}/>
      </Routes>
     </ToastProvider>
      </GoogleOAuthProvider>
    </Container>
    </BrowserRouter>
    
  )
}

export default App
