import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/interview_prep';

export default async function connectDB() {
  try {
    // Log the URI (without credentials) for debugging
    // eslint-disable-next-line no-console
    console.log('Using MONGODB_URI=', MONGODB_URI.replace(/:\/\/.*@/, '://<redacted>@'));

    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      // Use the new URL parser and unified topology by default in modern mongoose
    });
    // eslint-disable-next-line no-console
    console.log('MongoDB connected successfully');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
}
