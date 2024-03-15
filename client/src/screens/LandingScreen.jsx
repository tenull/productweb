import {
	Box,
	Flex,
	Heading,
	HStack,
	Icon,
	Image,
	Link,
	Skeleton,
	Stack,
	Wrap, WrapItem,
	useColorModeValue as mode,
	Text,
} from '@chakra-ui/react';
import { FaArrowRight } from 'react-icons/fa';
import { Link as ReactLink } from 'react-router-dom';
import { BsPhoneFlip } from 'react-icons/bs';
import { categoryData } from '../categoryData';
import { GiTakeMyMoney } from "react-icons/gi";
import { TbTruckDelivery } from 'react-icons/tb';

const LandingScreen = () => (
	<Box maxW='8xl' mx='auto' p={{ base: '0', lg: '12' }} minH='6xl'>
		<Flex justifyContent="center" alignItems="center" flexDirection={{ base: 'column', lg: 'row' }}>
			<Box
			
				mx={{ base: '6', md: '8', lg: '0' }}
				px={{ base: '6', md: '8', lg: '0' }}
				py={{ base: '6', md: '8', lg: '12' }}
				display='flex'
				flexDirection='column'
				alignItems='center'
				textAlign='center'
				mb={{ base: '8', lg: '0' }}
			>
				<Stack spacing={{ base: '8', lg: '10' }}  direction={{ base: 'column', lg: 'row' }}>
					<Heading style={{display:'flex',flexDirection:'column', alignItems:'center'}} color='white' bg='red.400' rounded='lg' p='10' size='xl' fontWeight='normal'>
						<GiTakeMyMoney style={{display:'flex',alignItems:'center',marginBottom:'20px'}}/>
						<Text>5000 Ft vásárlás felett 3% kedvezmény</Text>
						
					</Heading>
					<Heading style={{display:'flex',flexDirection:'column', alignItems:'center'}} color='white' bg='red.400' rounded='lg' p='10' size='xl' fontWeight='normal'>
					<TbTruckDelivery style={{display:'flex',alignItems:'center',marginBottom:'20px'}}/>
						Ingyenes házhozszállítás Hajdúnánás területén hétköznap 12-18 óra között
					</Heading>
					<Heading style={{display:'flex',flexDirection:'column', alignItems:'center'}} color='white' bg='red.400' rounded='lg' p='10' size='xl' fontWeight='normal'>
					<GiTakeMyMoney style={{display:'flex',alignItems:'center',marginBottom:'20px'}}/>
						10000 Ft vásárlás felett 6% kedvezmény
						
					</Heading>
				</Stack>
				<HStack spacing='3' mt='4'>
					<Link as={ReactLink} to='/products' color={mode('red.300', 'yellow.200')}>
						Fedezze fel
					</Link>
					<Icon color={mode('red.300', 'yellow.200')} as={FaArrowRight} />
				</HStack>
			</Box>
		</Flex>
		
			<Wrap justify='center' py='10'>
				<Text fontWeight='semibold' fontSize='3xl' justify='center'>Fedezze fel termékeinket!</Text>
			</Wrap>
			<Wrap spacing='80px' justify='center'>


				{categoryData.map((category) => (
					<Box
					w='200px'
					h='150px'
					 p='5' 
					 bg='red.400' 
					 rounded='lg' 
					 className="category-button" 
					 key={category.name} 
					 style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent:'center',cursor:'pointer' }}
					 _hover={{ transform: 'scale(1.02)', transitionDuration: '0.5s' }}
					 >
						<WrapItem key={category.name} display='flex' justifyContent='center' w='50px' h='50px'>
							{/* <ReactLink to={category.link} style={{ width: '100%', height: '100%', backgroundImage: `url(${category.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></ReactLink> */}
							<ReactLink to={category.link} >{category.svg}</ReactLink>
							
						</WrapItem>
						<Link
						fontSize='15'
							as={ReactLink}
							to={category.link}
							display='flex'
							justifyContent='center'
							textDecoration="none"
							style={{textAlign:'center'}}
							_hover={{
								textDecoration: 'none',
			
							}}
						>
							{category.name}
						</Link>
					</Box>
				))}
			</Wrap>
		
	</Box>


);

export default LandingScreen;