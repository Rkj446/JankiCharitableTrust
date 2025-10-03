import mongoose from 'mongoose';

export async function connectMongo(uri?: string) {
  const mongoUri = uri || process.env.MONGODB_URI;
  if (!mongoUri) {
    console.warn('MONGODB_URI not set; database features disabled');
    return;
  }
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(mongoUri);
  console.log('✅ Connected to MongoDB');
}



