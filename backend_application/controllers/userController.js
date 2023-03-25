const User = require('../models/User')
const Product = require('../models/Product')
const bcrypt = require('bcrypt')
const auth = require('../auth')

// USER REGISTRATION
module.exports.registerUser = (reqBody) => {
	let newUser = new User({
		firstName: reqBody.firstName,
		lastName: reqBody.lastName,
		email: reqBody.email,
		mobileNo: reqBody.mobileNo,
		password: bcrypt.hashSync(reqBody.password, 10)
	})
	return newUser.save().then((user, error) => {
		if(error){
			return false
		} else {
			return true
		}
	})
}

// LOG IN USER
module.exports.loginUser = (reqBody) => {
	return User.findOne({email: reqBody.email}).then(result => {
		if (result == null) {
			return false
		} else {
			const isPasswordCorrect = bcrypt.compareSync(reqBody.password, result.password)

			if(isPasswordCorrect) {
				return {access: auth.createAccessToken(result)}
			} else {
				return false
			}
		}
	})
}

// FIND USER
module.exports.getUser = (reqParams) => {
	return User.findById(reqParams.userId).then(result => {
		return result
	})
}

// SET USER AS ADMIN 
module.exports.changeAdminStatus = async (data, reqParams) => {
	if (data.isAdmin === true) {
		console.log('User is an admin')
		let updatedStatus = {
			isAdmin: true
		};
		return User.findByIdAndUpdate(reqParams.userId, updatedStatus).then((user, error) => {
			if (error) {
				return false
			} else {
				return 'Status has been changed to Admin'
			}
		})
	} else {
		console.log('User is not an admin')
		return false
	}
}


// NON-ADMIN ORDERS A PRODUCT
module.exports.checkout = async (data) => {
	console.log(data)
	if (data.isAdmin === true) {
		console.log('Admin not allowed to enroll')
		return "Admin not allowed to Checkout"
	} else {
		// console.log("Hi")
		let isUserUpdated = await User.findById(data.userId).then(user => {
			// console.log('isUserUpdated')
			user.orders.push({productId: data.productId});
			return user.save().then((user, error) => {
				if (error) {
					return false
				} else {
					return true
				}
			})
		})

		let isProductUpdated = await Product.findById(data.productId).then(product => {
			// console.log('isProductUpdated')
			product.customers.push({userId: data.userId});
			return product.save().then((product, error) => {
				if(error) {
					return false
				} else {
					return true
				}
			})
		})

		if (isUserUpdated && isProductUpdated) {
			return true 	
		} else {
			return false
		}
	}
}

// ADMIN GETS ALL CUSTONER ORDERS
module.exports.getAllActive = async (data) => {
	if (data.isAdmin === true) {
		return User.find({}, {orders: 1}).then(result => {
		return result
	})
	} else {
		return false
	}	
}

// USER VIEWS THEIR ORDERS
module.exports.getUserOne = async (data) => {
	if (data.isAdmin === true) {
		return false
	} else {
		console.log("Hi")
		console.log(data)
		console.log(data.id)
		console.log("Hi")
		return User.findById(data.id, {orders:1, _id:0}).then(result => {
			return result
		})
	}
}