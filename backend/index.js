const express = require('express')
const app = express();

const cors = require("cors")
const mongoose = require('mongoose');


const port = process.env.PORT || 5000;

require('dotenv').config()



// middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true
}))

// routes
const bookRoutes = require('./src/books/book.route');
const orderRoutes = require('./src/orders/order.route')
const userRoutes = require('./src/admin/adminn.route')
const adminRoutes = require('./src/stats/admin.stats')
const usersRoutes = require('./src/user/user.route')





async function main() {
  await mongoose.connect(process.env.DB_URL);
  app.use('/', (req, res) => {
    res.send('Book server is Running!')
  });
  app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
  });
}

main().then(() => console.log("MongoDB connectedd succefully")).catch(err => console.log(err));
app.use('/api/books', bookRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/auth', userRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/users', usersRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})





// Thz5ot6bAss0Fbdc    yosefdejene747