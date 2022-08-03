const { default: mongoose } = require('mongoose');

const GoalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },
  goal: {
    type: String,
    require: true,
  },
  timeFrame: {
    type: Number,
    require: true,
  },
}, {
  timestamps: true,
});

const Goal = mongoose.model('Goal', GoalSchema);

module.exports = Goal;