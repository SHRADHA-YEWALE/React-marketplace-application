const express = require("express");
const router = express.Router();
const path = require('path');
const fs = require('fs');

router.get('/product/:item_image', (req, res) => {
    console.log("getting image from folder", req.params.item_image);
    var image = path.join(__dirname, '..') + '/public/uploads/products/' + req.params.item_image;
    if (fs.existsSync(image)) {
        res.sendFile(image);
    }
    else {
        console.log("Image not exists!");
        res.sendFile(path.join(__dirname, '..') + '/public/uploads/products/itemplaceholder.jpg')
    }
});

module.exports = router;