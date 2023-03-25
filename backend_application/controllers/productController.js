const Product = require('../models/Product');
const User = require('../models/User');

// ADMIN ONLY CREATES A PRODUCT
module.exports.addProduct = (reqBody) => {
	let newProduct = new Product({
		name: reqBody.name,
		description: reqBody.description,
		price: reqBody.price,
		stocks: reqBody.stocks 
	});
	return newProduct.save().then((product, error) => {
		if (error) {
			return false
		} else {
			return true
		}
	})
};

// EVERYONE GETS ALL ACTIVE PRODUCTS
module.exports.getActiveProducts = () => {
	return Product.find({isActive: true}, {customers:0}).then(result => {
		return result
	})
}

// EVERYONE GETS A SPECIFIC PRODUCT
module.exports.getProduct = (reqParams) => {
	return Product.findById(reqParams.productId).then(result => {
		return result
	})
}

// ADMIN UPDATES SPECIFIC PRODUCT 
module.exports.updateProduct = async (data, reqParams, reqBody) => {
	console.log(data)
	if (data.isAdmin === true) {
		let updatedProduct = {
			name: reqBody.name,
			description: reqBody.description,
			price: reqBody.price, 
			stocks: reqBody.stocks
		};
		return Product.findByIdAndUpdate(reqParams.productId, updatedProduct).then((product, error) => {
			if (error) {
				return false
			} else {
				return true
			}
		})
	} else {
		console.log('User is not an admin')
		return false
	}
}


// ADMIN ARCHIVES SPECIFIC PRODUCT
module.exports.archiveProduct = async (data, reqParams) => {
	if (data.isAdmin === true) {
		let archivedProduct = {
			isActive: false
		}
		return Product.findByIdAndUpdate(reqParams.productId, archivedProduct).then((product, error) => {
			if (error) {
				return false
			} else {
				return true
			}
		})
	} else {
		console.log('User is not an admin')
		return false
	}
}

