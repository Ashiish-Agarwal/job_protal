import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    descriptions: {
      type: String,
    },
    requirements: {
      type: [String],
    },
    salary: {
      type: Number,
      
    },
    experienceLevel: {
      type: Number,
      
    },
    location: {
      type: String,
    },
    JobType: {
      type: [String],
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "company",
      required: true,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    application: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
      },
    ],
  },
  { timestamps: true }
);

export const JobModel = mongoose.model("JobModel", JobSchema);
