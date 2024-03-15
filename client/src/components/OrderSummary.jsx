import { Button, Flex, Heading, Stack, Text, useColorModeValue as mode } from '@chakra-ui/react';
import { FaArrowRight } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link as ReactLink } from 'react-router-dom';

const OrderSummary = ({ checkoutSreen = false }) => {
	const { subtotal, shipping } = useSelector((state) => state.cart);


	let discount;
	if (subtotal >= 10000) {
		discount = 0.06;
	} else if (subtotal >= 5000) {
		discount = 0.03;
	} else {
		discount = 0;
	}
	const totalAmount = subtotal - (subtotal * discount);
	return (
		<Stack
			minWidth='300px'
			spacing='8'
			borderWidth='1px'
			borderColor={mode('red.500', 'red.100')}
			rounded='lg'
			padding='8'
			w='full'>
			<Heading size='md'>Rendelési összefoglaló</Heading>
			<Stack spacing='6'>
				<Flex justify='space-between'>
					<Text fontWeight='medium' color={mode('gray.600', 'gray.400')}>
						Összeg
					</Text>
					<Text fontWeight='medium'> {subtotal} Ft</Text>
				</Flex>
				<Flex justify='space-between'>
					<Text fontWeight='medium' color={mode('gray.600', 'gray.400')}>
						Kedvezmény
					</Text>
					<Text fontWeight='medium'>
						{subtotal >= 10000 ? '6%' : (subtotal >= 5000 ? '3%' : 'Nincs kedvezmény')}
					</Text>
				</Flex>
				<Flex justify='space-between'>
					<Text fontWeight='medium' color={mode('gray.600', 'gray.400')}>
						Fizetés
					</Text>
					<Text fontWeight='medium'> {shipping && parseFloat(shipping) === 4.99 ? 'Fizetés a helszínen': 'Fizetés bankkártyával'}</Text>


				</Flex>
				<Flex justify='space-between'>
					<Text fontSize='xl' fontWeight='extrabold'>
						Teljes összeg
					</Text>
					<Text fontWeight='medium'>{Number(totalAmount)} Ft</Text>
				</Flex>
			</Stack>
			<Button
				hidden={checkoutSreen}
				as={ReactLink}
				to='/checkout'
				colorScheme='red'
				size='lg'
				rightIcon={<FaArrowRight />}>
				Pénztár
			</Button>
		</Stack>
	);
};

export default OrderSummary;