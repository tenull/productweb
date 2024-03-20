import {
	Box,
	TableContainer,
	Th,
	Tr,
	Table,
	Td,
	Thead,
	Tbody,
	Button,
	useDisclosure,
	Alert,
	Stack,
	Spinner,
	AlertIcon,
	AlertTitle,
	AlertDescription,
	Wrap,
	Text,
	Flex,
	useToast,
} from '@chakra-ui/react';
import { CheckCircleIcon, DeleteIcon } from '@chakra-ui/icons';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders, deleteOrder, resetErrorAndRemoval, setDelivered } from '../redux/actions/adminActions';
import ConfirmRemovalAlert from './ConfirmRemovalAlert';
import { TbTruckDelivery } from 'react-icons/tb';

const OrdersTab = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef = useRef();
	const [orderToDelete, setOrderToDelete] = useState('');
	const dispatch = useDispatch();
	const { error, loading, orders, deliveredFlag, orderRemoval } = useSelector((state) => state.admin);
	const toast = useToast();

	useEffect(() => {
		dispatch(getAllOrders());
		dispatch(resetErrorAndRemoval());
		if (orderRemoval) {
			toast({
				description: 'Rendelés törölve lett.',
				status: 'success',
				isClosable: true,
			});
		}

		if (deliveredFlag) {
			toast({
				description: 'Rendelés kiszállítva.',
				status: 'success',
				isClosable: true,
			});
		}
	}, [dispatch, toast, orderRemoval, deliveredFlag]);

	const openDeleteConfirmBox = (order) => {
		setOrderToDelete(order);
		
		onOpen();
	};

	const onSetToDelivered = (order) => {
		dispatch(resetErrorAndRemoval());
		dispatch(setDelivered(order._id));
	};
	console.log(orders)

	return (
		<Box>
			{error && (
				<Alert status='error'>
					<AlertIcon />
					<AlertTitle>Upps!</AlertTitle>
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			)}
			{loading ? (
				<Wrap justify='center'>
					<Stack direction='row' spacing='4'>
						<Spinner mt='20' thickness='2px' speed='0.65s' emptyColor='gray.200' color='cyan.500' size='xl' />
					</Stack>
				</Wrap>
			) : (
				<Box>
					<TableContainer >
						<Table variant='simple'>
							<Thead>
								<Tr>
									<Th>Dátum</Th>
									<Th>Név</Th>
									<Th>email</Th>
									<Th>Szállítás</Th>
									<Th>Rendelt termékek</Th>
									<Th>Fizetési mód</Th>
									<Th>Összesen</Th>
									<Th>Kiszállítva</Th>
								</Tr>
							</Thead>
							<Tbody>
								{orders &&
									orders.map((order) => (
										<Tr key={order._id}>
											<Td>{new Date(order.createdAt).toLocaleString()}</Td>
											<Td>{order.username}</Td>
											<Td>{order.email}</Td>
											<Td maxW='200px' overflowX='auto'>
												<Text>
													<i>Cím: </i> {order.shippingAddress.address}
												</Text>
												{/* <Text>
													<i>Város: </i> {order.shippingAddress.postalCode} {order.shippingAddress.city}
												</Text> */}
												<Text>
													<i>Telefonszám: </i> {order.shippingAddress.number}
												</Text>
												<Text>
													<i>Megjegyzés: </i> {order.shippingAddress.comment}
												</Text>
											</Td>
											<Td maxW='200px' overflowX='auto'>
												{order.orderItems.map((item) => (
													<Text key={item._id}>
														{item.qty} x {item.brand} {item.name}
														{console.log(item)}
													</Text>
												))}
											</Td>
											<Td>{order && parseFloat(order.shippingPrice) === 4.99 ? 'Fizetés a helyszínen': 'Fizetés bankkártyával'}</Td>
											<Td>{order.totalPrice} Ft</Td>
											<Td>{order.isDelivered ? <CheckCircleIcon /> : 'Pending'}</Td>
											<Td>
												<Flex direction='column'>
													<Button variant='outline' onClick={() => openDeleteConfirmBox(order)}>
														<DeleteIcon mr='5px' />
														Rendelés törlése
													</Button>
													{!order.isDelivered && (
														<Button mt='4px' variant='outline' onClick={() => onSetToDelivered(order)}>
															<TbTruckDelivery />
															<Text ml='5px'>Kiszállítva</Text>
														</Button>
													)}
												</Flex>
											</Td>
										</Tr>
									))}
							</Tbody>
						</Table>
					</TableContainer>
					<ConfirmRemovalAlert
						isOpen={isOpen}
						onOpen={onOpen}
						onClose={onClose}
						cancelRef={cancelRef}
						itemToDelete={orderToDelete}
						deleteAction={deleteOrder}
					/>
				</Box>
			)}
		</Box>
	);
};

export default OrdersTab;