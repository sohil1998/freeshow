import mongoose from "mongoose";

const showSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  cover_photo: {
    type: String,
    required: true,
  },
  episodes: {
    type: Array,
    required: true,
  },
});

export const Shows = mongoose.model("Shows", showSchema);
