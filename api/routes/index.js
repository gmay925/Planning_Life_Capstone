const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require('validator');
const { protect } = require('../middleware/authMiddleware');
const User = require('../models/user');

const router = express.Router();

const generateToken = (user) => jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });


router.get('/', (req, res) => res.json({ hello: 'world' }));

router.post('/signup', async (req, res) => {
  const {
    name, email, password, birthday,
  } = req.body;

  const isValidName = Boolean(name);
  const isValidEmail = Boolean(email && validator.isEmail(email));
  const isValidPassword = Boolean(password && password.length >= 8);
  const isValidBirthday = Boolean(birthday);
  const allValid = isValidName && isValidEmail && isValidPassword && isValidBirthday;

  if (!allValid) {
    return res.status(400).json({
      name: isValidName,
      email: isValidEmail,
      password: isValidPassword,
      birthday: isValidBirthday,
    }); // something was wrong with the submitted data, tell client
  }

  const hashPassword = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({
      name,
      email,
      hashPassword,
      birthday: new Date(birthday).toLocaleDateString().split('T')[0],
    });

    return res
      .status(201)
      .cookie('token', generateToken(user), {
        httpOnly: true,
      })
      .json({ success: true });
  } catch (e) {
    return res
      .status(500)
      .json({ message: 'Something went wrong. Try again later!' }); // something went wrong, tell client
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const isValidEmail = Boolean(email && validator.isEmail(email));
  const isValidPassword = Boolean(password && password.length >= 8);

  if (!isValidEmail || !isValidPassword) {
    return res.status(400).json({
      email: isValidEmail,
      password: isValidPassword,
    }); // something was wrong with the submitted data, tell client
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({
      message: 'Email or password did not match',
    });
  }

  const match = await bcrypt.compare(password, user.hashPassword);

  if (!match) {
    return res.status(401).json({
      message: 'Email or password did not match',
    });
  }

  return res
    .status(200)
    .cookie('token', generateToken(user), {
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    })
    .json({ success: true });
});


module.exports = router;
