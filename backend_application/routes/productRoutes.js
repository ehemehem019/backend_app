const express = require('express');
const router = express.Router();
const auth = require('../auth');
const ProductController = require('../controllers/ProductController');

// ADMIN ONLY CREATES A PRODUCT
router.post("/", auth.verify, (req, res) =>{
	const userData = auth.decode(req.headers.authorization)
	
	if (userData.isAdmin === true) {
		ProductController.addProduct(req.body).then(resultFromController => res.send(resultFromController))
	} else {
		res.send({auth: "failed"})
	}
})

// EVERYONE GETS ALL ACTIVE PRODUCTS
router.get("/", (req, res) => {
	ProductController.getActiveProducts().then(resultFromController => res.send(resultFromController))
})


// EVERYONE GETS A SPECIFIC PRODUCT
router.get("/:productId", (req, res) => {
	ProductController.getProduct(req.params).then(resultFromController => res.send(resultFromController))
})

// ADMIN UPDATES SPECIFIC PRODUCT
router.put("/:productId", auth.verify, (req, res) => {
	const userData = auth.decode(req.headers.authorization)
	ProductController.updateProduct(userData, req.params, req.body).then(resultFromController => res.send(resultFromController))
})

// ADMIN ARCHIVES SPECIFIC PRODUCT
router.put("/:productId/archive", auth.verify, (req, res) =>{
	const userData = auth.decode(req.headers.authorization)
	ProductController.archiveProduct(userData, req.params).then(resultFromController => res.send(resultFromController))
})

// ADMIN GETS ALL CUSTOMER ORDERS
router.get("/:productId", (req, res) => {
	ProductController.getProduct(req.params).then(resultFromController => res.send(resultFromController))
})



module.exports = router;

