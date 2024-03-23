import {
	Accordion,
	AccordionButton,
	AccordionItem,
	AccordionPanel,
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Box,
	Spinner,
	Stack,
	Table,
	Tbody,
	Text,
	Th,
	Thead,
	Tr,
	Wrap,
	useToast,
  } from '@chakra-ui/react';
  import { useEffect } from 'react';
  import { useDispatch, useSelector } from 'react-redux';
  import {
	getProducts,
	resetProductError,
  } from '../redux/actions/productActions';
  import ProductTableItem from './ProductTableItem';
  import AddNewProduct from './AddNewProduct';
  import { useState } from 'react';
  
  const ProductsTab = () => {
	const dispatch = useDispatch();
	const { error, loading } = useSelector((state) => state.admin);
	const { products, productUpdate } = useSelector((state) => state.product);
	const [filteredProducts, setFilteredProducts] = useState(products);
	const [search, setSearch] = useState('');
	const toast = useToast();
  
	useEffect(() => {
	  dispatch(getProducts());
	  dispatch(resetProductError());
  
	  if (productUpdate) {
		toast({
		  description: 'A termék frissítve lett.',
		  status: 'success',
		  isClosable: true,
		});
	  }
	}, [dispatch, toast, productUpdate]);
  
	useEffect(() => {
	  setFilteredProducts(products);
	}, [products]);
  
	function filterProducts(term) {
	  const filtered = products.filter((product) =>
		product.description.toLowerCase().includes(term.toLowerCase())
	  );
	  setFilteredProducts(filtered);
	}
  
	return (
	  <Box>
		{error && (
		  <Alert status="error">
			<AlertIcon />
			<AlertTitle>Upps!</AlertTitle>
			<AlertDescription>{error}</AlertDescription>
		  </Alert>
		)}
		{loading ? (
		  <Wrap justify="center">
			<Stack direction="row" spacing="4">
			  <Spinner
				mt="20"
				thickness="2px"
				speed="0.65s"
				emptyColor="gray.200"
				color="cyan.500"
				size="xl"
			  />
			</Stack>
		  </Wrap>
		) : (
		  <Box>
			<Accordion allowToggle>
			  <AccordionItem>
				<h2>
				  <AccordionButton>
					<Box flex="1" textAlign="right">
					  <Box>
						<Text mr="8px" fontWeight="bold">
						  Új termék hozzáadása
						</Text>
					  </Box>
					</Box>
				  </AccordionButton>
				</h2>
				<AccordionPanel pb="4">
				  <Table>
					<AddNewProduct />
				  </Table>
				</AccordionPanel>
			  </AccordionItem>
			</Accordion>
			<input
			  className="productFilterInput"
			  type="text"
			  id="myInput"
			  onChange={(e) => {
				setSearch(e.target.value);
				filterProducts(e.target.value);
			  }}
			  placeholder="Termékek szűrése.."
			/>
			<Table variant="simple" size="lg">
			  <Thead>
				<Tr>
				  <Th>Képek</Th>
				  <Th>Leírás</Th>
				  <Th>Márka és Név</Th>
				  <Th>StripeId & Alcím</Th>
				  <Th>Kategória és Ár</Th>
				  <Th>Készlet és Akció jelvény</Th>
				</Tr>
			  </Thead>
			  <Tbody>
				{products.length > 0 &&
				  filteredProducts.map((product) => (
					<ProductTableItem key={product._id} product={product} />
				  ))}
			  </Tbody>
			</Table>
		  </Box>
		)}
	  </Box>
	);
  };
  
  export default ProductsTab;
  