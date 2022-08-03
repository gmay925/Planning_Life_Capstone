const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require('validator');
const { protect } = require('../middleware/authMiddleware');
const User = require('../models/user');

const router = express.Router();

const createToken = (user) => jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });


router.get('/', (req, res) => res.json({ hello: 'world' }));

router.post('/signup', async (req, res) => {
  const {
    name, email, password, birthday,
  } = req.body;

  const isValidName = Boolean(name);
  const isValidEmail = Boolean(email && validator.isEmail(email));
  const isValidPassword = Boolean(password && password.length >= 6);
  const isValidPhone = Boolean(phoneNumber && validator.isMobilePhone(phoneNumber),
  );
  const allValid = isValidName && isValidEmail && isValidPassword && isValidPhone;

  if (!allValid) {
    return res.status(400).json({
      name: isValidName,
      email: isValidEmail,
      password: isValidPassword,
      phoneNumber: isValidPhone,
    }); // something was wrong with the submitted data, tell client
  }

  const hashPassword = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({
      name,
      email,
      hashPassword,
      birthday: new Date(birthday).toLocaleDateString().split('T')[0],
      phoneNumber,
    });

    return res
      .status(201)
      .cookie('token', createToken(user), {
        httpOnly: true,
      })
      .json({ success: true });
  } catch (e) {
    return res
      .status(500)
      .json({ message: 'Something went wrong. Try again later!' }); // something went wrong, tell client
  }
});
router.put('/changePassword', protect, async (req, res) => {
  const { previousPassword, newPassword } = req.body;
  const user = await User.findById(req.user.id);
  const match = await bcrypt.compare(previousPassword, user.hashPassword);

  if (!match) {
    return res.status(400).json({
      message: 'Incorrect Password',
    });
  }
  const isValidPassword = Boolean(newPassword && newPassword.length >= 8);
  if (!isValidPassword) {
    return res.status(400).json({
      password: isValidPassword,
    }); // something was wrong with the submitted data, tell client
  }

  const newHashPassword = await bcrypt.hash(newPassword, 10);

  try {
    await user.updateOne({
      hashPassword: newHashPassword,
    });

    return res
      .status(200)
      .cookie('token', createToken(user), {
        httpOnly: true,
      })
      .json({ message: 'Password updated successfully' });
  } catch (e) {
    return res
      .status(500)
      .json({ message: 'Something went wrong. Please try again later.' }); // something went wrong, tell client
  }
});

router.get('/preferences', protect, async (req, res) => {
  // console.log('req.user', req.user);
  res.json(req.user);
  // res.send(console.log('success'));
});

router.put('/preferences', protect, async (req, res) => {
  const {
    name, email, phoneNumber, address,
  } = req.body;

  try {
    await req.user.update({
      name,
      email,
      phoneNumber,
      address,
    });
    return res.json({ success: true }); // successfully created user, tell client
  } catch (e) {
    return res.json({
      message: 'Something went wrong. Please try again later.',
    }); // something went wrong, tell client
  }
});
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const isValidEmail = Boolean(email && validator.isEmail(email));
  const isValidPassword = Boolean(password && password.length >= 6);

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
    .cookie('token', createToken(user), {
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    })
    .json({ success: true });
});

router.post('/logout', async (req, res) => {
  res.status(202).clearCookie('token').json({
    message: 'Logged Out',
  });
});



module.exports = router;
