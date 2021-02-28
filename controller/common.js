const Folder = require("../models/folder");
const File = require("../models/file");
const file = require("./file");
const folder = require("./folder");

module.exports = {
  // Search files and folders
  searchQuery: async (req, res) => {
    const { q } = req.query;
    var fileData = await File.find(
      {
        name: {
          $regex: new RegExp(q), // get files with query
        },
      },
      (err, result) => result
    ).limit(10);
    var folderData = await Folder.find(
      {
        name: {
          $regex: new RegExp(q), // get folders with query
        },
      },
      (err, result) => result
    ).limit(10);
    const mergeData = { ...fileData, ...folderData }; // merge both files and folders
    res.send(mergeData);
  },

  // Need to further update this function at this time it only adds files data, need to enhance this for folders as well
  getTotalSize: async (id) => {
    var fileSize = await File.find(
      {
        parent_id: id,
      },
      {
        size: 1,
        _id: 0,
      },
      (err, result) => result
    );
    // var folderSize = await Folder.find(
    //   {
    //     parent_id: id,
    //   },
    //   {
    //     size: 1,
    //     _id: 0,
    //   },
    //   (err, result) => result
    // );
    // const mergeData = [...fileSize, ...folderSize];
    const fileData = [...fileSize]; // convert this in array
    // const size = mergeData.length ? mergeData.map((s) => s.size).reduce((a, b) => a + b) : 0;
    const size = fileData.length
      ? fileData.map((s) => s.size).reduce((a, b) => a + b)
      : 0;
    return size;
  },
};
