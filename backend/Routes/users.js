const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

const { User, userValidation } = require('../Models/userModel')

const app = express()


// Signup endpoint
router.post('/signup', async (req, res) => {
  try {
    // Validate user input using Joi
    const { error } = userValidation.validate(req.body);

    if (error) {
      // Return validation error response
      return res.status(400).json({ error: error.details[0].message });
    }

    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Store user information in the session
    // req.session.user = {
    //   id: newUser._id,
    //   username: newUser.username,
    //   email: newUser.email,
    // };

    // res.status(201).json({ message: 'User registered successfully!', user: req.session.user });
    res.status(201).json({ message: 'User registered successfully!'});
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Signin endpoint
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Store user information in the session upon successful login
    // req.session.user = {
    //   id: user._id,
    //   username: user.username,
    //   email: user.email,
    // };

    req.session.id = user._id.toString();
    req.session.isLoggedIn = true;
    req.session.email = email;

    console.log("watch out", req.session);

    console.log("watch out watch out", req.session.email)

    // res.status(200).json({ message: 'Login successful!',user: req.session.user, token: "abcd" });
    res.status(200).json({ message: 'Login successful!',email: req.session.email, token: "abcd" });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Logout endpoint
router.post('/logout', (req, res) => {
  try {

    // Destroy the session to log the user out
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      // Respond with a success message
      res.status(200).json({ message: 'Logout successful!' });
    });
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Check login status
router.get('/check-login', async (req, res) => {
  try {
    console.log(" hiiiiiiiii")
    // console.log("ffffff", req.session.user)
    console.log("ffffff", req.session.email)
    console.log("faaafff", req.session.id)

    if (req.session.isLoggedIn) {
      console.log("heheheheh")
      const user = await User.findById(req.session.id);
      console.log("userrrr",user)
      if (user) {
        // User is logged in
        console("yes yes im logged in");
        return res.status(200).json({ isLoggedIn: true, user: user });
      }
    }

    console.log('im not logged in');
    // User is not logged in
    return res.status(200).json({ isLoggedIn: false });
  } catch (error) {
    console.error('Error checking login status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


//get all users

module.exports = router