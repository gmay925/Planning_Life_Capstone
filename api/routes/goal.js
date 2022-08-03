const express = require('express');
const Goals = require('../models/goal');
const { protect } = require('../middleware/authMiddleware');
const Goal = require('../models/goal');

const router = express.Router();

router.use(protect);

router.get('/', (req, res) => {
  res.json({ goal: req.user.goal || [] });
});

router.put('/', async (req, res) => {
  const { goals } = req.body;

  try {
    await req.user.update({ goals: [...new Set(goals)] });
    return res.status(200).json({ success: true });
  } catch (e) {
    return res.status(500).json({
      message: 'something went wrong',
    });
  }
});

router.post('/', async (req, res) => {
  const {
    timeFrame,
  } = req.body;
  
  const existing = await Goal.findOne({ user: req.user.id, timeFrame });
  
  if (existing) {
    try {
      await existing.update({
        timeFrame,
      });
      return res.status(200).json({ message: 'Goal updated'});
    } catch (e) {
      return res
      .status(400)
      .json({ message: e.message });
    }
  } else {

    const newGoalData = new Goal({
      user: req.user.id,
      timeFrame,
    });
  
  try {
    await newGoalData.save();
    return res.status(200).json({ message: 'Goal saved' });
  } catch (e) {
    return res  
    .status(400)
    .json({ message: e.message });
  }
}
 });

 module.exports = router;