import mongoose from 'mongoose';
import { getEnvVar } from '../utils/getEnvVar';

const MONGODB_URI = getEnvVar('MONGODB_URI', 'mongodb://localhost:27017/vpic_database');

export const connectToDatabase = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};
