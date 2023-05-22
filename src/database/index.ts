import mongoose from 'mongoose';

mongoose.connect(process.env.MONGO_URI as string);

const db = mongoose.connection.useDb(process.env.MONGO_DB as string);

db.on('error', () => {
  console.error.bind(console, 'MongoDB connection error')
  process.exit(1)
});
db.once('open', () => {});

export default db;
