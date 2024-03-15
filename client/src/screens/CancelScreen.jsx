import { Center, Text, Box, Button } from '@chakra-ui/react';
import { BsBoxSeamFill } from 'react-icons/bs';
import { Link as ReactLink } from 'react-router-dom';

const CancelScreen = () => {
	return (
		<Center height='100vh' flexDirection='column'>
			<Text fontSize={{ base: 'md', md: 'xl', lg: '4xl' }}>Megszüntette a fizetési folyamatot.</Text>
			<Box m='2'>
				<BsBoxSeamFill size='50px' mt='2' />
			</Box>

			<Text>De a biztonság kedvéért elmentettük a kosarát.</Text>
			<Button as={ReactLink} to='/cart' mt='2'>
			Menj a kosárhoz
			</Button>
		</Center>
	);
};

export default CancelScreen;