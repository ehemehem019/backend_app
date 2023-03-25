const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const auth = require('../auth');

// REGISTER
router.post("/register", (req, res) => {
	UserController.registerUser(req.body).then(resultFromController => res.send(resultFromController))
})

// LOGIN
router.post("/login", (req, res) => {
	UserController.loginUser(req.body).then(resultFromController => res.send(resultFromController))
})

// GET USER
router.get("/:userId", (req, res) => {
	console.log(req.params)
	UserController.getUser(req.params).then(resultFromController => res.send(resultFromController))
});

// SET USER TO ADMIN
router.put("/:userId/setAsAdmin", auth.verify, (req, res) => {
	const userData = auth.decode(req.headers.authorization)
	UserController.changeAdminStatus(userData, req.params).then(resultFromController => res.send(resultFromController))

})

// NON-ADMIN ORDERS A PRODUCT
router.post("/checkout", auth.verify, (req, res) => {
	const userData = auth.decode(req.headers.authorization)
	let data = {
		isAdmin: userData.isAdmin,
		userId: userData.id,
		productId: req.body.productId
	}
	UserController.checkout(data).then(resultFromController => res.send(resultFromController))

});

// ADMIN GETS ALL CUSTONER ORDERS
// Hindi ko muna nilagyan ng /orders, bale slash muna kasi nagiiba yung behavior ng software
router.get("/", auth.verify, (req, res) => {
	const userData = auth.decode(req.headers.authorization)
	UserController.getAllActive(userData).then(resultFromController => res.send(resultFromController))
}); 


// USER VIEWS THEIR ORDERS
// Sa req.params ko muna nilagay, kasi tulad ng nasa taas, nag iiba din yung behavior kapag sa data mismo kinukuha
router.get("/myOrders/myOrders", auth.verify, (req, res) => {
	console.log("This worked")
	const userData = auth.decode(req.headers.authorization)
	console.log(userData)
	console.log(userData.id)
	UserController.getUserOne(userData).then(resultFromController => res.send(resultFromController))
});

module.exports = router;