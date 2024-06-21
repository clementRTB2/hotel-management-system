const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://user2:sio@cluster0.0ucumif.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { 
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log('Error connecting to MongoDB:', error);
  }
};
    
module.exports = connectDB;
  
  