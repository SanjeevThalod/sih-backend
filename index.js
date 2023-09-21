import ConnectDB from "./config/db.js";
import app from './app'
import dotenv from 'dotenv';

// Handling Uncaught Execption
process.on('uncaughtException',(err)=>{
  console.log(`Error: ${err.message}`);
  console.log(`Shutting server due to uncaught execption`);
  process.exit(1);
})

// Config
dotenv.config();

// Connect to MongoDB
ConnectDB();

// PORT
const PORT = process.env.PORT || 5000;

// Firing server
const server = app.listen(PORT,()=>{
  console.log(`Server is Running ${process.env.DEV_MODE} mode on port ${PORT}`);
});

// Unhandled Promise Rejection
process.on('unhandledRejection',err=>{
  console.log(`Error: ${err.message}`);
  console.log(`Shuting down the server due to unhandled Rejection`);
  server.close(()=>{
    process.exit(1);
  })
});
