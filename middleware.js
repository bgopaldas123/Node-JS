let jwt = require('jsonwebtoken');


  let verifyToken = (req, res, next) => {
      let token = req.headers['authorization'];
      if(typeof token !== 'undefined') {
        let bearer = token.split(' ');
        token = bearer[1];
      }

    if (token) {
      jwt.verify(token, 'secretkey', (err, decoded) => {
        if (err) {
          return res.json({
            success: false,
            message: 'Token is not valid'
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.json({
        success: false,
        message: 'Auth token is not supplied'
      });
    }
  
  };


  module.exports = {
    verifyToken: verifyToken
  }
