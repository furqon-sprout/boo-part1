const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  mbti: { type: String },
  enneagram: { type: String },
  variant: { type: String },
  tritype: { type: Number },
  socionics: { type: String },
  sloan: { type: String },
  psyche: { type: String },
  image: { type: String },
  created_at: { type: Date, default: Date.now },
});

const Profile =  mongoose.model("profiles", ProfileSchema);
module.exports = Profile;
