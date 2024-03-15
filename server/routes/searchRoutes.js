import express from 'express';
import Product from '../models/Product.js';

const searchRoutes = express.Router();

const getSearch = async (req, res) => {
    try {
        let aggregationPipeline = [];

        if (req.query.t !== '') {
            aggregationPipeline.push({
                $search: {
                    index: "search-text",
                    text: {
                        query: req.query.t,
                        path: {
                            wildcard: "*"
                        },
                        fuzzy: {
                            maxEdits: 1
                        }
                    }
                }
            });
        }

        if (aggregationPipeline.length > 0) {
            const result = await Product.aggregate(aggregationPipeline);
            res.status(200).json(result);
        } else {
            res.status(200).json([]); 
        }
    } catch (error) {
        console.error('Error searching documents:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getAutocompleteSearch = async (req, res) => {
    try {
        const searchQuery = req.query.query;
        const result = await Product.aggregate([
            {
                $search: {
                    index: "autocomplete-index",
                    autocomplete: {
                        query: req.query.t == '' ? '' : req.query.t,
                        path: "brand", 
                        fuzzy:{
                            maxEdits:1
                        }
                    },
                }
            }
        ]);

        res.status(200).json(result);
    } catch (error) {
        console.error('Error searching documents for autocomplete:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


searchRoutes.get('/autocomplete', getAutocompleteSearch);
searchRoutes.get('/', getSearch);

export default searchRoutes;
