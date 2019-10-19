import Mongoose from 'mongoose';

Mongoose.connect(process.env.DB);
(Mongoose as any).Promise = global.Promise;
Mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
