const mongoose = require('mongoose')

const productSchema = new mongoose.Schema ({

		name: {
			type: String,
			required: [true, "Product name is required"]
		},
		description: {
			type: String,
			required: [true, "Description is required"]
		},
		price: {
			type: Number,
			required: [true, "Price is required"]
		},
		stocks: {
			type: Number,
			required: [true, "Number of stocks is required"]
		},
		isActive: {
			type: Boolean,
			default: true
		}, 
		createdOn: {
			type: Date,
			default: new Date()
		},
		customers: [
			{
			userId: {
				type: String, 
				required: [true, "UserId is required"]
			},
			purchasedOn: {
				type: Date,
				default: new Date()
			}
		}
		]
})

module.exports = mongoose.model("Product", productSchema)