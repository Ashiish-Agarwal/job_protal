

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  
  email: {
    type: String,
    required: true,
    unique: true,

  },

  password: {
    type: String,
    required: true
  },

  phonenumber: {
    type: Number,
    // Add validation for phone number format if needed
  },

  role: {
    type: String,
    enum: ['student','recruiter'],
    required: true
  },

  profile: {
    bio: { type: String },
    skills: { type: String },
    resume: { type: String },
    resumeOriginalName: { type: String },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    profilePhoto: { type: String, required: false },
    
  },

  skills: [{ type: String }],
  
  experience: {
    type: Number,
    min: 0
  }
}, { timestamps: true });

export const User = mongoose.model('User', UserSchema);
