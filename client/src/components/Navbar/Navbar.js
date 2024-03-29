import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Button, Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import memoriesLogo from '../../images/memories-Logo.png';
import memoriesText from '../../images/marvpixels.png';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'
const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const classes = useStyles();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    
    navigate('/');
    setUser(null);
  };

  

  useEffect(() => {
    const token = user?.token
    if(token){
      const decodedToken = jwtDecode(token)
      if(decodedToken.exp*1000< new Date().getTime()) logout()
    }
    // This effect runs when the location changes
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position='static' color='inherit'>
      <Link to='/' className={classes.brandContainer}>
        <img src={memoriesText} alt='icon' height='45px'/>
        <img
          className={classes.image}
          src={memoriesLogo}
          alt='memories'
          height= '40px' 
        />
      </Link>
      <Toolbar className={classes.toolbar}>
        {user ? (
  <div className={classes.profile}>
    <Avatar className={classes.purple} alt={user.result?.name} src={user.result?.imageUrl}>
      {user.result?.name ? user.result.name.charAt(0).toUpperCase() : 'N'}
    </Avatar>
    <Typography className={classes.userName} variant='h6'>
      {user.result?.name} {/* Make sure user.result is defined before accessing its properties */}
    </Typography>
    <Button variant='contained' className={classes.logout} color='secondary' onClick={logout}>
      Logout
    </Button>
  </div>
) : (
  <Button component={Link} to='/auth' variant='contained' color='primary'>
    Sign In
  </Button>
)}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
