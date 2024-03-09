import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  try {
    
    const token = req.headers.authorization.split(' ')[1];
    const isCustomAuth = token.length < 500;
    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, 'test', { algorithms: ['HS256'] });
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Authentication failed' });
  }
};

export default auth;
