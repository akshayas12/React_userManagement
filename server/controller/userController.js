const User = require('../models/User');
const generateToken =require('../utils/generateToken')
exports.postSignup = async (req, res) => {
    console.log('Received request:', req.body);
    const { userName, password, phoneNumber, email } = req.body;
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }
  
      const newUser = new User({ userName, password, phoneNumber, email });
      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error during user registration:', error);
      res.status(500).json({ message: error.message });
    }
  };

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;
  console.log('Login request received:', req.body);
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      userName: user.userName,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
  
};

exports.uploadProfileImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    const user = await User.findByIdAndUpdate(
      req.user.id, 
      { profileImage: `/uploads/${req.file.filename}` },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ profileImage: user.profileImage, message: 'Profile image uploaded successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


  