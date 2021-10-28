const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const products = require('../data.js');


router.get('/getProducts', (req, res) => {
    console.log("Inside get product items method call");
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    console.log("Product Items : ", JSON.stringify(products));
    res.end(JSON.stringify(products));
});

router.post('/productSearch', (req, res) => {
    console.log("Inside search product items method call", req.body.searchInput);
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    var productItem = products.filter(product => (product.itemName).toLowerCase() == req.body.searchInput.toLowerCase());
    const price = req.body.price;
    console.log("price", typeof price);
    let f = 0;
    if (productItem.length > 0) {
        var productPriceItem;
        if (price == 0) { 
            f = 1;
            productPriceItem = productItem.filter(product => (Number(product.price) > 0 && Number(product.price) <= 25));
        } else if (price == 1) {
            f = 1;
            productPriceItem = productItem.filter(product => (Number(product.price) > 25 && Number(product.price) <= 100));
        } else if (price == 2) {
            f = 1;
            productPriceItem = productItem.filter(product => (Number(product.price) >= 100 && Number(product.price) <= 500));
        } else if (price == 3) {
            f = 1;
            productPriceItem = productItem.filter(product => (Number(product.price) > 500 && Number(product.price) <= 1000));
        } else {
            res.end(JSON.stringify(productItem));
        }

        if(f == 1 && productPriceItem.length == 0) {
            res.end('ITEM_NOT_FOUND');
        }

        console.log("Product Items : ", JSON.stringify(productPriceItem));
        res.end(JSON.stringify(productPriceItem));
    } else {
        console.log("No Item Found");
        res.end('ITEM_NOT_FOUND');
    }
});

router.get('/getProduct/:itemId', (req, res) => {
    console.log("Inside get details for item with item id:", req.params.itemId);
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    var productItem = products.filter(product => product.itemId == req.params.itemId);
    if (productItem.length > 0) {
        console.log("Item Details : ", JSON.stringify(products));
        res.end(JSON.stringify(productItem));
    } else {
        console.log("Item details not found");
        res.end('ITEM_DETAILS_NOT_FOUND');
    }
});

router.post('/addProduct', (req, res) => {
    console.log("Inside add product items");

    var length = products.length + 1;
    const item = {
        itemId: length,
        itemName: req.body.itemName,
        itemDescription: req.body.itemDescription,
        price: req.body.price,
        location: req.body.location,
        contact: req.body.contact,
        item_image: " ",
        images: [{}]
    }
    products.push(item);
    console.log("products list after adding item", JSON.stringify(products));
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.end(JSON.stringify(item));
});

const itemstorage = multer.diskStorage({
    destination: path.join(__dirname, '..') + '/public/uploads/products',
    filename: (req, file, cb) => {
        cb(null, "item-" + Date.now() + path.extname(file.originalname));
    }
});

const itemuploads = multer({
    storage: itemstorage,
    limits: { fileSize: 1000000 },
}).single("itemimage");

router.post("/uploads/item/:item_id", (req, res) => {
    itemuploads(req, res, function (err) {
        console.log("Uploading the item image", req.file.filename);
        if (!err) {
            if (req.params.item_id !== "undefined") {
                var productItem = products.filter(product => product.itemId == req.params.item_id);
                if (productItem[0].item_image == ' ' || productItem[0].item_image == null || productItem[0].item_image == " ") {
                    productItem[0].item_image = req.file.filename;
                }
                const imageItem = {
                    file_name: req.file.filename
                }
                productItem[0].images.push(imageItem);
            }
            res.writeHead(200, {
                'Context-Type': 'text/plain'
            });
            res.end(req.file.filename);
        }
        else {
            console.log(err);
        }
    })
});

module.exports = router;