const fs = require("fs");

const deleteFile = (unwantedUploadedImages) => {
  for (const unwantedUploadedImage of unwantedUploadedImages) {
    fs.unlink(
      `../hotel-booking/images/${unwantedUploadedImage.filename}`,
      (err) => {
        if (err) throw err;
        console.log("Files Deleted!");
      }
    );
  }
};

const deleteExistingFile = (hotelImages) => {
  for (const hotelImage of hotelImages) {
    fs.unlink(`../hotel-booking/images/${hotelImage}`, (err) => {
      if (err) throw err;
      console.log("Files Deleted!");
    });
  }
};

module.exports = {
  deleteFile: deleteFile,
  deleteExistingFile: deleteExistingFile,
};
