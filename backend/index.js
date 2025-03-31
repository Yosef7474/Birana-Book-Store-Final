const express = require('express')
const app = express();
const http = require('http'); // For creating the HTTP server
const { Server } = require('socket.io'); // Importing Socket.IO
const cors = require("cors")
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");


const port = process.env.PORT || 5000;

require('dotenv').config()


const server = http.createServer(app);
// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'https://birana-book-store-final-buz5.vercel.app'], // Update with your client URL
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Handle Socket.IO connections
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Handle order notification events
  socket.on('new-order', (orderData) => {
    console.log('New order received:', orderData);
    // Broadcast the notification to all connected admin clients
    io.emit('admin-notification', orderData);
  });

  // Handle disconnections
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});


// middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', 'https://birana-book-store-final-buz5.vercel.app', 'https://birana-book-store-final-buz5-git-main-yosefs-projects-c385ad18.vercel.app'],
  credentials: true
}))
app.use(cookieParser());

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