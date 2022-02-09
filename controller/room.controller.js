const Room = require('../model/room')
const addRoomValidation = require('../validation/roomInputValidation')
const deleteFile = require('../utils/deleteRoomFile')

const getAll_rooms = async (req, res) => {
    const rooms = await Room.find()
    if (!rooms) {
        return res.status(400).send('😒 Sorry We can\'t find any rooms')
    }
    res.status(200).send(rooms)
}

const getOne_room = async (req, res) => {
    const id = req.params.id
    const room = await Room.findById(id)
    if (!room) return res.status(400).send(room)
    res.status(200).send(room)
}

const add_room = async (req, res) => {
    if (req.files.length > 4 || req.files.length > 8) {
        const unwantedImagesRoom = req.files;
        deleteFile.deleteFile(unwantedImagesRoom);
        return res.status(400).send("Can you add between 4 and 8 images")
    }
    const {
        error
    } = addRoomValidation.addRoomValidation(req.body)
    if (error) {
        const unwantedImagesRoom = req.files;
        deleteFile.deleteFile(unwantedImagesRoom)
        return res.status(400).send(error.details[0].message)
    }
    // const existingRoom = await Room.find({type: req.body.type})


    const uploadedImageFiles = req.files;
    let images = [];
    for (const uploadedImageFile of uploadedImageFiles) {
        images.push(uploadedImageFile.filename);
    }
    const {
        type,
        price,
        hotel,
        description,
        date
    } = req.body;
    const room = await Room.create({
        type,
        price,
        hotel,
        description,
        imagesRoom: images,
        date
    })
    const result = await room.save()
    if (!result) return res.status(400).send("😒 Sorry we can't add your room")
    res.status(200).send(result)
}

const update_room = async (req, res) => {

    const roomId = req.params.id;
    const room = await Room.findById(roomId);
    if (!room)
        return res.status(400).send("Sorry We Can Not Find Room With Given Id!");
    let roomImages = room.imagesRoom;
    deleteFile.deleteExistingFile(roomImages);
    const uploadedImageFiles = req.files;
    let images = [];
    for (const uploadedImageFile of uploadedImageFiles) {
        images.push(uploadedImageFile.filename);
    }
    const {
        type,
        price,
        description
    } = req.body;
    const updateRoom = await Room.updateOne({
        _id: roomId
    }, {
        type,
        price,
        description,
        imagesRoom: images
    });
    if (updateRoom) return res.status(200).send("Room Updated Successfully!");
    res.send("Ooops Something Goes Wrong!");

}

const removeOne_room = async (req, res) => {
    const id = req.params.id
    const room = await Room.deleteOne({
        id
    })
    res.status(200).send('😜 your room has been deleted')
}


module.exports = {
    getAll_rooms,
    getOne_room,
    add_room,
    update_room,
    removeOne_room
}