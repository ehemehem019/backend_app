const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const port = 4000
const app = express()

const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/users", userRoutes);
app.use("/products", productRoutes);


mongoose.connect("mongodb+srv://admin123:admin123@zuitt-bootcamp.cnhvgta.mongodb.net/S42-S46?retryWrites=true&w=majority", {
	useNewUrlParser: true,
	useUnifiedTopology: true
});


let db = mongoose.connection;

db.on('error', () => console.error.bind(console, 'error'));
db.once('open', () => console.log('Now connected to MongoDB Atlas'));


app.listen(process.env.PORT || port, () => {
	console.log(`API is now online on port ${process.env.port || port}`)
})