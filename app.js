const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
let middleware = require('./middleware');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.post('/posts', middleware.verifyToken, (req, res) => {  
  console.log(req.decoded.username);
  res.json({
    message: 'Congrats You are now authorized'
  })
});

const user = [
  {
    username: 'gopal',
    password: '1234'
  },{
    username: 'das',
    password: '123'
  }
]

app.post('/login', (req, res) => {
  

  const user1 = req.body.username;
  const pass1 = req.body.password;

  let count = 0;

  for(let i=0; i < user.length; i++) {

    if(user1 === user[i].username && pass1 === user[i].password) {
      count = 1;
      break;
    }
  }

  if(count == 1) {
    jwt.sign({user: req.body}, 'secretkey', { expiresIn: '1h' }, (err, token) => {
      res.json({
        success: true,
        message: 'Authentication successful!',
        token: token
      });
    });
  } else {
      res.json({
        success: false,
        message: 'Incorrect username or password'
      });
    }
});


const port = 3000;

app.listen(port, () => console.log('Server started on port 3000')); 