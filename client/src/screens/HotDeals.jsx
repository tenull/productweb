import { Alert,Text, AlertTitle, AlertIcon, AlertDescription, Box, Button, Center, Wrap, WrapItem } from '@chakra-ui/react';
import { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import { getProducts,getCategory } from '../redux/actions/productActions';
import Category from '../components/Category';

const HotDeals = () => {
    const dispatch = useDispatch();
    const { loading, error, products, favoritesToggled } = useSelector((state) => state.product);
    const [isNewProducts, setIsNewProducts] = useState([]);

    useEffect(() => {
        const newProducts = products.filter(product => product.productIsNew);
        setIsNewProducts(newProducts);
    }, [products]);

    useEffect(() => {
        dispatch(getProducts()); 
    }, [dispatch]);

    return ( 
        <>
            <Category/>
            <Box display='flex' justifyContent='center' marginY='20px'>
                <Text fontSize='4xl' fontWeight='bold'>Akciós termékeink</Text>
            </Box>
            {products.length >= 1 && (
                <Box>
                    <Wrap spacing='30px' justify='center' minHeight='80vh' mx={{ base: '12', md: '20', lg: '32' }}>
                        {isNewProducts.map(product => (
                            <WrapItem key={product._id}>
                                <Center w='250px' h='450px'>
                                    <ProductCard product={product} loading={loading} />
                                </Center>
                            </WrapItem>
                        ))}
                    </Wrap>
                </Box>
            )}
        </>
    );
}
 
export default HotDeals;
