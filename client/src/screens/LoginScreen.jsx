import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Box,
	Button,
	Container,
	FormControl,
	HStack,
	Heading,
	Stack,
	Text,
	useToast,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as ReactLink, useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import PasswordField from '../components/PasswordField';
import PasswordForgottenForm from '../components/PasswordForgottenForm';
import TextField from '../components/TextField';
import { login, googleLogin } from '../redux/actions/userActions';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';

const LoginScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const redirect = '/products';
	const toast = useToast();

	const { loading, error, userInfo, serverMsg } = useSelector((state) => state.user);
	const [showPasswordReset, setShowPasswordReset] = useState(false);

	useEffect(() => {
		if (userInfo) {
			if (location.state?.from) {
				navigate(location.state.from);
			} else {
				navigate(redirect);
			}
			toast({
				description: 'Login successful.',
				status: 'success',
				isClosable: true,
			});
		}

		if (serverMsg) {
			toast({
				description: `${serverMsg}`,
				status: 'success',
				isClosable: true,
			});
		}
	}, [userInfo, redirect, error, navigate, location.state, toast, showPasswordReset, serverMsg]);

	const handleGoogleLogin = useGoogleLogin({
		onSuccess: async (response) => {
			const userInfo = await axios
				.get('https://www.googleapis.com/oauth2/v3/userinfo', {
					headers: { Authorization: `Bearer ${response.access_token}` },
				})
				.then((res) => res.data);
			const { sub, email, name, picture } = userInfo;
			dispatch(googleLogin(sub, email, name, picture));
		},
	});

	return (
		<Formik
			initialValues={{ email: '', password: '' }}
			validationSchema={Yup.object({
				email: Yup.string().email('Érvénytelen email.').required('Email cím megadása szükséges.'),
				password: Yup.string()
					.min(1, 'A jelszó túl rövid - legalább 1 karaktert kell tartalmaznia.')
					.required('Jelszó megadása szükséges.'),
			})}
			onSubmit={(values) => {
				dispatch(login(values.email, values.password));
			}}>
			{(formik) => (
				<Container maxW='lg' py={{ base: '12', md: '24' }} px={{ base: '0', md: '8' }} minH='4xl'>
					<Stack spacing='8'>
						<Stack spacing='6'>
							<Stack spacing={{ base: '2', md: '3' }} textAlign='center'>
								<Heading fontSize={{ base: 'md', lg: 'xl' }}>Lépj be a fiókodba</Heading>
								<HStack spacing='1' justify='center'>
									<Text>Nincs fiókod?</Text>
									<Button as={ReactLink} to='/registration' variant='link' colorScheme='cyan'>
										Regisztrálj
									</Button>
								</HStack>
							</Stack>
						</Stack>
						<Box
							py={{ base: '0', md: '8' }}
							px={{ base: '4', md: '10' }}
							bg={{ base: 'transparent', md: 'bg-surface' }}
							boxShadow={{ base: 'none', md: 'xl' }}>
							<Stack spacing='6' as='form' onSubmit={formik.handleSubmit}>
								{error && (
									<Alert
										status='error'
										flexDirection='column'
										alignItems='center'
										justifyContent='center'
										textAlign='center'>
										<AlertIcon />
										<AlertTitle>Sajnáljuk!</AlertTitle>
										<AlertDescription>{error}</AlertDescription>
									</Alert>
								)}
								<Stack spacing='5'>
									<FormControl>
										<TextField type='text' name='email' placeholder='you@example.com' label='Email' />
										<PasswordField type='password' name='password' placeholder='your password' label='Password' />

										<Button
											my='2'
											onClick={() => setShowPasswordReset(!showPasswordReset)}
											size='sm'
											colorScheme='cyan'
											variant='outline'>
											Elfelejtetted a jelszavad ?
										</Button>
										{showPasswordReset && <PasswordForgottenForm />}
									</FormControl>
								</Stack>
								<Stack spacing='6'>
									<Button colorScheme='cyan' size='lg' fontSize='md' isLoading={loading} type='submit'>
										Bejelentkezés
									</Button>
									<Button
										leftIcon={<FcGoogle />}
										colorScheme='cyan'
										size='lg'
										fontSize='md'
										isLoading={loading}
										onClick={() => handleGoogleLogin()}>
										Google bejelentkezés
									</Button>
								</Stack>
							</Stack>
						</Box>
					</Stack>
				</Container>
			)}
		</Formik>
	);
};

export default LoginScreen;