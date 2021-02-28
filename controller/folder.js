const Folder = require("../models/folder");
const File = require("../models/file");
const { v4: uuidv4 } = require("uuid");
const homeParentId = "HOME123";
const common = require("./common");
const cloudinary = require("cloudinary");

module.exports = {
  // Create Folder
  createFolder: async (req, res) => {
    try {
      const { parent_id, name, parent_list } = req.body; // get parentID and parentList from req.body
      const parentId = parent_id ? parent_id : homeParentId; // Check if there is no parent (Home) then set default home parentID
      console.log(parent_list);
      const parentList = parent_list ? parent_list.split("/") : [homeParentId]; // Check for parent List and convert this in array
      const folder = new Folder({
        // Create folder data
        folder_id: uuidv4(),
        name,
        parent_id: parentId,
        parent_list: parentList,
      });
      const createFolder = await Folder.create(folder); // Create folder query
      res.send(createFolder);
    } catch (error) {
      console.log(error);
    }
  },

  // Get All Folders
  getFolders: async (req, res) => {
    try {
      const { parent_id } = req.query; // get parentId from req.query
      const parentId = parent_id ? parent_id : homeParentId;
      const getFolders = await Folder.find({
        // Get folders on the basis of parentId
        parent_id: parentId,
      });
      const size = await common.getTotalSize(parentId); // Get size of folder
      res.send({ ...getFolders, size }); // send response with folder data and size
    } catch (error) {
      console.log(error);
    }
  },

  // Rename Folder
  renameFolder: async (req, res) => {
    try {
      const query = { _id: req.params.id }; // Create Query
      const newData = { $set: { name: req.body.name } }; // Create new Data
      const updatedFolder = await Folder.updateOne(query, newData); // Update Query
      res.send(updatedFolder);
    } catch (error) {
      console.log(error);
    }
  },

  // Delete Folder
  deleteFolder: async (req, res) => {
    try {
      let folder = await Folder.findById(req.params.id);
      const { parent_id, parent_list } = folder; // get parent Id and parent List from folder
      const parentList = parent_list; // convert parent list to string

      await Folder.deleteMany({
        parent_list: { $all: parentList }, // Delete folders that includes the parentList
      });
      await Folder.deleteMany({ parent_id: parent_id }); // Delete folders with parentId
      const parentListString = parentList.toString();
      console.log(parentListString);
      const fileList = await File.find({
        parent_list: { $all: parentList }, // get Files that matches parentList
      });
      for (let i = 0; i < fileList.length; i++) {
        // loop through filelist
        const currentFile = fileList[i];
        try {
          if (currentFile.file_id) {
            await cloudinary.uploader.destroy(currentFile.cloudinary_id); // remove file from cloudinary
            await File.deleteOne({
              file_id: currentFile.file_id, // Delete Files that includes the parentList
            });
          }
        } catch (e) {
          console.log(e);
        }
      }
      res.send({
        message: "Folder and associated files deleted successfully",
      });
    } catch (error) {
      console.log(error);
    }
  },
};
