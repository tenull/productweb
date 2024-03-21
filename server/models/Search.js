import mongoose from 'mongoose';

const searchSchema = new mongoose.Schema(
    {
        
    },
    { timestamps: true }
);


searchSchema.index({ name: 'text', description: 'text', category: 'text' });

const Search = mongoose.model('Search', searchSchema);

export default Search;
