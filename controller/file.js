const File = require("../models/file");
// const { upload_on_imagekit } = require("../utils/imagekit");
const cloudinary = require("cloudinary");
const { v4: uuidv4 } = require("uuid");
const folder = require("./folder");
require("../utils/cloudinary");
const homeParentId = "HOME123";

module.exports = {
  // Upload Files
  createFile: async (req, res) => {
    try {
      let result;
      // Upload image to cloudinary
      if (req.file) {
        result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "imageKit/",
        });
      }
      const { parent_id, parent_list } = req.body; // get data from req.body
      const { width, height, format, bytes, public_id, secure_url } = result; // get file data from cloudinary
      const parentList = parent_list ? parent_list.split("/"): [homeParentId]; // parent list
      const file = new File({ // file data
        file_id: uuidv4(),
        name: req.file.originalname,
        parent_id: parent_id ? parent_id : homeParentId,
        secure_url,
        size: bytes,
        height,
        width,
        format,
        cloudinary_id: public_id,
        parent_list: parentList
      });
      //create file
      const createdFile = await File.create(file);
      res.send(createdFile);
    } catch (error) {
      console.log(error);
    }
  },

  // Get All Files
  getFiles: async (req, res) => {
    try {
      //get files
      const getFiles = await File.find({
        parent_id: req.query.parent_id ? req.query.parent_id : homeParentId,
      });
      res.send(getFiles);
    } catch (error) {
      console.log(error);
    }
  },

  // Delete File
  deleteFile: async (req, res) => {
    try {
      // Find file by id
      let file = await File.findById(req.params.id);
      // Delete file from cloudinary
      await cloudinary.uploader.destroy(file.cloudinary_id);
      // Delete file from db
      await file.remove();
      res.send(file);
    } catch (error) {
      console.log(error);
    }
  },

  // Rename File
  renameFile: async (req, res) => {
    try {
      let file = await File.findById(req.params.id); // get file data
      const query = {_id: req.params.id}; // query
      const name = req.body.name.concat('.').concat(file.format); // name with format 
      const newData = {$set: {name}}; // new data for update
      const updatedFile = await File.updateOne(query, newData); // update query
      res.send(updatedFile);
    } catch (error) {
      console.log(error);
    }
  }
};
