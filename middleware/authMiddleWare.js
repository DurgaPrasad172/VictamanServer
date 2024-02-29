const jwtUtils = require('../utils/jwtUtils');
const User = require('../models/User');

const authenticateUser = async (req, res, next) => {
  try {
    let jwtToken;
    const token = req.headers["authorization"];
    console.log(token)
   
    if(token!==undefined){
      jwtToken=token.split(" ")[1];
    }

    

    let decodedToken;
    try {
      decodedToken = jwtUtils.verifyToken(jwtToken,"ABCDEFGHIJ");
    } catch (error) {
      console.error('Token Verification Error:', error);
      return res.status(401).json( { error: 'Unauthorized: Invalid token' });
    }

    const user = await User.findOne({ username: decodedToken.username });

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized: User not found' });
    }

    req.user = { ...decodedToken, _id: user._id }; // Include user details in req.user
    next();
  } catch (error) {
    console.error('Authentication Error:', error);
    return res.status(401).json({ error: 'Unauthorized: Invalid token Error' });
  }
};

module.exports = authenticateUser;
