const mongoose = require("mongoose");

// Schema for file
const fileSchema = mongoose.Schema(
  {
    file_id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    cloudinary_id: {
      type: String,
      required: true,
    },
    secure_url: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
    format: {
      type: String,
      required: true,
    },
    parent_id: {
      type: String,
      required: true,
    },
    parent_list: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const File = mongoose.model("File", fileSchema);

module.exports = File;
