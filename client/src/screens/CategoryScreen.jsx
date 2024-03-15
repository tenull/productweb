import React from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { WrapItem, Center, Box, Wrap, Button } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'; 
import { getProducts,getCategory } from '../redux/actions/productActions';

const CategoryScreen = ({ products }) => {
    const { category } = useParams();
    const { favoritesToggled, pagination } = useSelector(state => state.product); 
    const dispatch = useDispatch();
    const filteredProducts = products.filter(product => product.category === category);
	const paginationButtonClick = (page) => {
		dispatch(getProducts(page));
	};

    return (
        <Box>
            <h1>{category} kategória termékei:</h1>
            <Wrap spacing='30px' justify='center' minHeight='80vh' mx={{ base: '12', md: '20', lg: '32' }}>
                {filteredProducts.map(product => (
                    <WrapItem key={product._id}>
                        <Center w='250px' h='450px'>
                            <ProductCard product={product} />
                        </Center>
                    </WrapItem>
                ))}
            </Wrap>
            {!favoritesToggled && (
                <Wrap spacing='10px' justify='center' p='5'>
                    <Button colorScheme='cyan' onClick={() => paginationButtonClick(1)}>
                        <ArrowLeftIcon />
                    </Button>
                    {Array.from(Array(pagination.totalPages), (e, i) => {
                        return (
                            <Button
                                colorScheme={pagination.currentPage === i + 1 ? 'cyan' : 'gray'}
                                key={i}
                                onClick={() => paginationButtonClick(i + 1)}>
                                {i + 1}
                            </Button>
                        );
                    })}
                    <Button colorScheme='cyan' onClick={() => paginationButtonClick(pagination.totalPages)}>
                        <ArrowRightIcon />
                    </Button>
                </Wrap>
            )}
        </Box>
    );
}

export default CategoryScreen;
