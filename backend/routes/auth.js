const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const generateToken=async (userID)=>{
try {
   const user=await User.findById(userID);
   const authToken=user.generateAuthToken();
   const refreshToken=user.generateRefreshToken();
   user.refreshToken=refreshToken;
   await user.save();
   return { accessToken: authToken, refreshToken };
} catch (error) {
   console.error('Error generating tokens:', error);
   throw new Error('Token generation failed');
}

};


router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashed });
  await user.save();
   const { accessToken, refreshToken } = await generateToken(user._id); 
     const createdUser = await User.findById(user._id).select(
    "-password  -refreshToken"
  );
  res.json({ message: 'User registered', user: createdUser, accessToken, refreshToken });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  const { accessToken, refreshToken } = await generateToken(user._id);
  const loggedUser=await User.findById(user._id).select('-password -refreshToken');
  const options = {
    httpOnly:true,
    secure:true,
  };
  res.json({ accessToken, refreshToken, user: loggedUser });
});


router.post('/logout',auth,async(req,res)=>{
  await User.findByIdAndUpdate(req.user._id,{
    $set:{
      refreshToken:null
    },

  },
{  new:true
});
const options = {
    httpOnly: true,
    secure: true,
  };
res.json({ message: 'Logged out successfully' });
})

router.post('/refresh-token', async (req, res) => {

  const { refreshToken } = req.body;
if (!refreshToken) {
  return res.status(400).json({ message: 'Refresh token is required' });
}
  try {
    const user = await User.findOne({ refreshToken });
    if (!user) return res.status(401).json({ message: 'Invalid refresh token' });

    const { accessToken, newRefreshToken } = await generateToken(user._id);
    user.refreshToken = newRefreshToken;
    await user.save();

    res.json({ accessToken, refreshToken: newRefreshToken });
  } catch (error) {
    console.error('Error refreshing token:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
