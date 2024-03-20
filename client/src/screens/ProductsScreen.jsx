import { Alert,Text, AlertTitle, AlertIcon, AlertDescription, Box, Button, Center, Wrap, WrapItem } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import { getProducts, getCategory } from '../redux/actions/productActions';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import Category from '../components/Category';
const ProductsScreen = () => {
	const dispatch = useDispatch();
	const { loading, error, products, pagination, favoritesToggled } = useSelector((state) => state.product);

	useEffect(() => {
		dispatch(getProducts(1));
	}, [dispatch]);

	const paginationButtonClick = (newPage) => {
		let nextPage = pagination.currentPage;
		if (newPage === 'prev') {
			nextPage = Math.max(1, nextPage - 1);
		} else if (newPage === 'next') {
			nextPage = Math.min(pagination.totalPages, nextPage + 1);
		} else {
			nextPage = newPage;
		}
		dispatch(getProducts(nextPage));
	};

	return (
		<>
			<Category />
			{products.length >= 1 && (
				<Box>
					  <Box display='flex' justifyContent='center' marginY='20px'>
                <Text fontSize='4xl' fontWeight='bold'>Termékeink</Text>
                
                </Box>
					<Wrap spacing='30px' justify='center' minHeight='80vh' mx={{ base: '12', md: '20', lg: '32' }}>
						{error ? (
							<Alert status='error'>
								<AlertIcon />
								<AlertTitle>Sajnáljuk!</AlertTitle>
								<AlertDescription>{error}</AlertDescription>
							</Alert>
						) : (
							products.map((product) => (
								<WrapItem key={product._id}>
									<Center w='250px' h='450px'>
										<ProductCard product={product} loading={loading} />
									</Center>
								</WrapItem>
							))
						)}
					</Wrap>
					{!favoritesToggled && (
						<Wrap spacing='10px' justify='center' p='5'>
							<Button colorScheme='red' onClick={() => paginationButtonClick('prev')}>
								<ArrowLeftIcon />
							</Button>
							{Array.from(Array(pagination.totalPages), (e, i) => {
								return (
									<Button
										colorScheme={pagination.currentPage === i + 1 ? 'red' : 'gray'}
										key={i}
										onClick={() => paginationButtonClick(i + 1)}>
										{i + 1}
									</Button>
								);
							})}
							<Button colorScheme='red' onClick={() => paginationButtonClick('next')}>
								<ArrowRightIcon />
							</Button>
						</Wrap>
					)}
				</Box>
			)}
		</>
	);
};

export default ProductsScreen;