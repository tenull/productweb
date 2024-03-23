import {
	Box,
	Button,
	Flex,
	FormControl,
	Heading,
	Radio,
	RadioGroup,
	Spacer,
	Stack,
	Text,
	VStack,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { setShipping } from '../redux/actions/cartActions';
import { setAddress, setPayment } from '../redux/actions/orderActions';
import TextField from './TextField';
import TextArea from './TextArea';
import { Link as ReactLink } from 'react-router-dom';

const ShippingInformation = () => {
	const { shipping } = useSelector((state) => state.cart);
	const { shippingAddress } = useSelector((state) => state.order);

	const dispatch = useDispatch();

	const onSubmit = async (values) => {
		dispatch(setAddress(values));
		dispatch(setPayment());
	};

	return (
		<Formik
			initialValues={{
				address: shippingAddress ? shippingAddress.address : '',
				// postalCode: shippingAddress ? shippingAddress.postalCode : '',
				// city: shippingAddress ? shippingAddress.city : '',
				number: shippingAddress ? shippingAddress.number : '',
				comment: shippingAddress ? shippingAddress.comment : '',
			}}
			validationSchema={Yup.object({
				address: Yup.string().required('Szükségünk van a címedre.').min(2, 'Ez a cím túl rövid.'),
				// postalCode: Yup.string().required('We need a postal code.').min(2, 'This postal code is too short.'),
				// city: Yup.string().required('We need a city.').min(2, 'This city is too short.'),
				number: Yup.string().required('We need a number.').min(2, 'This number is too short.'),
			})}
			onSubmit={onSubmit}>
			{(formik) => (
				<>
					<VStack as='form'>
						<FormControl>
							<TextField name='address' placeholder='Utca, házszám' label='Utca, házszám' />
							<TextField name='number' placeholder='Telefonszám' label='Telefonszám' />
							<TextArea name='comment' placeholder='Megjegyzés szállítási idővel kapcsolatban stb.' label='Megjegyzés'/>
							{/* <Flex>
								<Box flex='1' mr='10'>
								<TextField name='postalCode' placeholder='Irányítószám' label='Irányítószám' />
								</Box>
								<Box flex='2'>
									<TextField name='city' placeholder='Város' label='Város' value='Hajdúnánás' ReadOnly  />
								</Box>
							</Flex> */}
							
						</FormControl>
						<Box w='100%' pr='5'>
							<Heading fontSize='2xl' fontWeight='extrabold' mb='10'>
								Fizetési lehetőségek
							</Heading>
							<RadioGroup
								onChange={(e) => {
									dispatch(setShipping(e === 'express' ? '14.99' : '4.99'));
								}}
								defaultValue={shipping === 14.99 ? 'express' : 'withoutExpress'}>
								<Stack direction={{ base: 'column', lg: 'row' }} align={{ lg: 'flex-start' }}>
									<Stack pr='10' spacing={{ base: '8', md: '10' }} flex='1.5'>
										<Box>
											<Radio value='express'>
												<Text fontWeight='bold'>Fizetés a helyszínen</Text>
												<Text>Bankkártyával</Text>
											</Radio>
										</Box>
										<Stack spacing='6'>Express</Stack>
									</Stack>
									<Radio value='withoutExpress'>
										<Box>
											<Text fontWeight='bold'>Fizetés a helyszínen</Text>
											<Text>Készpénzzel</Text>
										</Box>
									</Radio>
								</Stack>
							</RadioGroup>
						</Box>
					</VStack>
					<Flex alignItems='center' gap='2' direction={{ base: 'column', lg: 'row' }}>
						<Button variant='outline' colorScheme='red' w='100%' as={ReactLink} to='/cart'>
							Vissza a kosárhoz
						</Button>
						<Button
							variant='outline'
							colorScheme='red'
							w='100%'
							as={ReactLink}
							to='/success'
							onClick={formik.handleSubmit}>
							Tovább a fizetéshez
						</Button>
					</Flex>
				</>
			)}
		</Formik>
	);
};

export default ShippingInformation;