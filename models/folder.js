const mongoose = require("mongoose");

// Schema for folder
const folderSchema = mongoose.Schema(
  {
    folder_id: {
      type: String,
      required: true,
    },
    name: {
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

const Folder = mongoose.model("Folder", folderSchema);

module.exports = Folder;
