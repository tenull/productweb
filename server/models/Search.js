import mongoose from 'mongoose';

const searchSchema = new mongoose.Schema(
    {
        // Define the fields in the search schema if needed
    },
    { timestamps: true }
);

// Define the index for text search
searchSchema.index({ name: 'text', description: 'text', category: 'text' });

const Search = mongoose.model('Search', searchSchema);

export default Search;
