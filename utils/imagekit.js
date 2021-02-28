// const Imagekit = require("imagekit");
// var fs = require("fs");
// require("dotenv").config();

// // Imagekit Config
// var imagekit = new Imagekit({
//   publicKey: "public_zaH1MX80/zJ3Bt3dlEP9qcPJPvM=",
//   privateKey: "private_LRnFzFfJ4jc/6ZETXtczJx2TxoU=",
//   urlEndpoint: "https://ik.imagekit.io/elux2cgye6t",
// });

// // Imagekit upload & delete
// exports.upload_on_imagekit = async (file) => {
//   if (file) {
//     await imagekit.upload(
//       {
//         file: file.path, //required
//         fileName: file.filename, //required
//       },
//       function (error, result) {
//         if (error) console.log(error);
//         else console.log(result);
//       }
//     );
//   }
// };

// // exports.delete_image_from_imagekit = (path) => image_kit.deleteFile(path);
