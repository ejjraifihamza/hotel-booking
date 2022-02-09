const fs = require("fs");

const deleteFile = (unwantedUploadedImages) => {
    for (const unwantedUploadedImage of unwantedUploadedImages) {
        fs.unlink(
            `../hotel-booking/rooms/${unwantedUploadedImage.filename}`,
            (err) => {
                if (err) throw err;
                console.log("Files Deleted!");
            }
        );
    }
};

const deleteExistingFile = (RoomImages) => {
    for (const roomImage of RoomImages) {
        fs.unlink(`../hotel-booking/rooms/${roomImage}`, (err) => {
            if (err) throw err;
            console.log("Files Deleted!");
        });
    }
};

module.exports = {
    deleteFile: deleteFile,
    deleteExistingFile: deleteExistingFile,
};