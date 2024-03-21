import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchProducts } from '../redux/actions/searchActions';
import { WrapItem, Center, Box, Wrap } from '@chakra-ui/react';
import ProductCard from '../components/ProductCard';

const SearchScreen = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [autoComplete,setAutoComplete]=useState([])
    const dispatch = useDispatch();
    const { loading, error, searchResults } = useSelector((state) => state.search); 




    const handleSearch = () => {
        dispatch(searchProducts(searchTerm));
    };
    console.log(searchTerm)
    return (
        <div>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {searchResults && (
             <Box>
             <Wrap spacing='30px' justify='center' minHeight='80vh' mx={{ base: '12', md: '20', lg: '32' }}>
                    {searchResults.map((product) => (
                        <WrapItem key={product._id}>
                        <Center w='250px' h='450px'>
                            <ProductCard product={product} loading={loading} />
                        </Center>
                    </WrapItem>
                    ))}
                </Wrap>
                </Box>
            )}
        </div>
    );
};

export default SearchScreen;
