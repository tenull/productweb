import React from 'react';
import axios from 'axios';
import { TbTruckDelivery } from "react-icons/tb";
import {
	IconButton,
	Input, InputGroup, InputLeftElement, InputRightElement,
	Box,
	Flex,
	HStack,
	Icon,
	Stack,
	Text,
	useColorModeValue as mode,
	useDisclosure,
	AlertDescription,
	Alert, AlertIcon, AlertTitle, Divider, Image, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Spacer, useToast, Toast
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { BsPhoneFlip } from 'react-icons/bs';
import { Link as ReactLink, useNavigate } from 'react-router-dom';
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import NavLink from './NavLink';
import ColorModeToggle from './ColorModeToggle';
import { BiUserCheck, BiLogInCircle } from 'react-icons/bi';
import { toggleFavorites } from '../redux/actions/productActions';
import { HamburgerIcon, CloseIcon, ChevronDownIcon, SearchIcon } from '@chakra-ui/icons';
import { TbShoppingCart } from 'react-icons/tb';
import { logout } from '../redux/actions/userActions'
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import user from '../redux/slices/user';
import { FcGoogle } from 'react-icons/fc';
import { googleLogout } from '@react-oauth/google';
import { FaBasketShopping } from "react-icons/fa6";
import { searchProducts } from '../redux/actions/searchActions';

const Links = [
	{ name: 'Termékek', route: '/products' },
	{ name: 'Akció', route: '/hot-deals' },
	{ name: 'Kapcsolat', route: '/contact' },
];

const Header = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const dispatch = useDispatch();
	const { favoritesToggled } = useSelector((state) => state.product);
	const { cartItems } = useSelector((state) => state.cart);
	const { userInfo } = useSelector((state) => state.user);
	const toast = useToast()
	const navigate = useNavigate();
	const [showBanner, setShowBanner] = useState(userInfo ? !userInfo.active : false)
	const [searchValue, setSearchValue] = useState("");
	const [autocompleteOptions, setAutocompleteOptions] = useState([]);
	const [selectedProductId, setSelectedProductId] = useState(null);
	const [openAutoComplete, setOpenAutoComplete] = useState(false);
  
	useEffect(() => {
	  if (userInfo && !userInfo.active) {
		setShowBanner(true)
	  }
	}, [favoritesToggled, dispatch, userInfo]);
  
	const logoutHandler = () => {
	  googleLogout()
	  dispatch(logout());
	  toast({
		description: 'Kijelentkeztél.',
		status: 'success',
		isClosable: 'true',
	  })
	}
  
	const handleSearchChange = async (query) => {
	  setSearchValue(query);
	  setOpenAutoComplete(true); // Autocomplete box megnyitása az input változásakor
	  try {
		const { data } = await axios.get(`/api/autocomplete?t=${query}`);
		setAutocompleteOptions(data);
	  } catch (error) {
		console.error('Error fetching autocomplete options:', error);
	  }
	};
  
	const handleSearchSubmit = async () => {
	  try {
		if (searchValue.trim() !== '') {
		  await dispatch(searchProducts(searchValue));
		  navigate(`/search/${searchValue}`);
		}
	  } catch (error) {
		console.error('Error during search:', error);
		toast({
		  title: 'Hiba történt a keresés közben',
		  status: 'error',
		  isClosable: true,
		});
	  }
	};
  
	const handleProductClick = (productId) => {
	  setSelectedProductId(productId);
	  navigate(`/product/${productId}`);
	  setSearchValue(''); 
	  setOpenAutoComplete(false); 
	};
  
	useEffect(() => {
	  // Az oldalon kívüli kattintások figyelése
	  const handleClickOutside = (event) => {
		if (event.target.closest('.autocomplete-box') === null) {
		  setSearchValue(''); 
		  setOpenAutoComplete(false);
		}
	  };
  
	  document.addEventListener('mousedown', handleClickOutside);
	  return () => {
		document.removeEventListener('mousedown', handleClickOutside);
	  };
	}, []);
  
	console.log(searchValue)
	return (
		<>
			<Box style={{ paddingLeft: '25px' }} bg='black'>
				<Flex display={{ base: 'none', md: 'flex' }} alignItems='center'>
					<TbTruckDelivery style={{ width: '30px', height: '30px' }} color='white' />
					<Text pt='10px' pb='10px' ps='10px' color='white'>

						Hajdúnánás területén 5000Ft felett vállaljuk ingyenesen a kiszállítást minden hétköznap 12-18 óra között.
					</Text></Flex>

			</Box>
			<Box bg={mode(`red.300`, 'gray.900')} px='4' position='sticky' top='0' zIndex='sticky'>
				<Flex h='16' alignItems='center' justifyContent='space-between'>
					<Flex display={{ base: 'flex', md: 'none' }} alignItems='center'>
						<IconButton
							bg='parent'
							size='md'
							icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
							onClick={isOpen ? onClose : onOpen}
						/>
						<IconButton
							ml='12'
							position='absolute'
							icon={<TbShoppingCart size='20px' />}
							as={ReactLink}
							to='/cart'
							variant='ghost'
						/>
						{cartItems.length > 0 && (
							<Text fontWeight='bold' fontStyle='italic' position='absolute' ml='74px' mt='-6' fontSize='sm'>
								{cartItems.length}
							</Text>
						)}
					</Flex>
					<HStack spacing='8' alignItems='center'>
						<Box alignItems='center' display='flex' as={ReactLink} to='/'>
							<Icon as={FaBasketShopping} h='5' w='4' color={mode('white', 'yellow.200')} />
							<Text as='b' alignItems='center' color='white'> ÉVI ABC</Text>
						</Box>

						<HStack as='nav' spacing='4' display={{ base: 'none', md: 'flex' }}>
							{Links.map((link) => (
								<NavLink route={link.route} key={link.route}>
									<Text fontWeight='medium'>{link.name}</Text>
								</NavLink>
							))}
							<Box>
								<IconButton icon={<TbShoppingCart size='20px' />} as={ReactLink} to='/cart' variant='ghost' />
								{cartItems.length > 0 && (
									<Text fontWeight='bold' fontStyle='italic' position='absolute' ml='26px' mt='-6' fontSize='sm'>
										{cartItems.length}
									</Text>
								)}
							</Box>

							<ColorModeToggle />
							{favoritesToggled ? (
								<IconButton
									onClick={() => dispatch(toggleFavorites(false))}
									icon={<MdOutlineFavorite size='20px' />}
									variant='ghost'
								/>
							) : (
								<IconButton
									onClick={() => dispatch(toggleFavorites(true))}
									icon={<MdOutlineFavoriteBorder size='20px' />}
									variant='ghost'
								/>
							)}
						</HStack>
					</HStack>
					<Box w='30%' position="relative">
						<InputGroup color='black'>
							<Input
								type="text"
								bg='white'
								placeholder="Keresés"
								color='black'
								border='1px'
								value={searchValue}
								onChange={(e) => handleSearchChange(e.target.value)}
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										handleSearchSubmit();
									}
								}}
							/>
							<InputRightElement>
								<SearchIcon
									aria-label="Keresés"
									cursor='pointer'
									icon={<SearchIcon />}
									onClick={handleSearchSubmit}
								/>
							</InputRightElement>
						</InputGroup>

						{openAutoComplete && searchValue && autocompleteOptions.length > 0 && (
        <Box className="autocomplete-box" bg="white" boxShadow="lg" p={2} position="absolute" top="calc(100% + 8px)" left="0" width="100%">
          {autocompleteOptions.map((option, index) => (
            <Box key={index} p={2} _hover={{ bg: "gray.200" }} onClick={() => handleProductClick(option._id)}>
              <Flex>
                {option.brand} {option.name}
                <Image
                  w='35px'
                  mb='30px'
                  src={option.images[0]}
                  alt={option.name}
                  fallbackSrc='https://via.placeholder.com/250'
                />
              </Flex>
            </Box>
          ))}
        </Box>
      )}

					</Box>

					<Flex alignItems='center'>
						{userInfo ? (
							<Menu>
								<MenuButton rounded='full' variant='link' cursor='pointer' minW='0' >
									<HStack>
										{userInfo.googleImage ? (<Image borderRadius='full' boxSize='40px' src={userInfo.googleImage} referrerPolicy='no-referrer' />) : (<BiUserCheck size='30' />)}

										<ChevronDownIcon />
									</HStack>
								</MenuButton>
								<MenuList>
									<HStack>
										<Text pl='3' as='i'>{userInfo.email}</Text>
										{userInfo.googleId && <FcGoogle />}
									</HStack>
									<Divider py='' />
									<MenuItem as={ReactLink} to='/order-history'>Rendelési előzmények</MenuItem>
									<MenuItem as={ReactLink} to='/profile'>Profil</MenuItem>
									{userInfo.isAdmin && (
										<>
											<MenuDivider />
											<MenuItem as={ReactLink} to='/admin-console'>
												<MdOutlineAdminPanelSettings />
												<Text ml='2'>Admin felület</Text>
											</MenuItem>
										</>
									)}
									<MenuDivider />
									<MenuItem onClick={logoutHandler}>Kijelentkezés</MenuItem>
								</MenuList>
							</Menu>
						) : (
							<Menu>
								<MenuButton as={IconButton} variant='ghost' cursor='pointer' icon={<BiLogInCircle size='25px' />} />
								<MenuList>
									<MenuItem as={ReactLink} to='/login' p='2' fontWeight='400' variant='link'> Bejelentkezés</MenuItem>
									<MenuDivider />
									<MenuItem as={ReactLink} to='/registration' p='2' fontWeight='400' variant='link'> Regisztráció</MenuItem>
								</MenuList>
							</Menu>
						)}
					</Flex>
				</Flex>
				<Box display='flex'>
					{isOpen && (
						<Box pb='4' display={{ md: 'none' }}>
							<Stack as='nav' spacing='4'>
								{Links.map((link) => (
									<NavLink route={link.route} key={link.route}>
										<Text fontWeight='medium'>{link.name}</Text>
									</NavLink>
								))}
							</Stack>
							{favoritesToggled ? (
								<IconButton
									onClick={() => dispatch(toggleFavorites(false))}
									icon={<MdOutlineFavorite size='20px' />}
									variant='ghost'
								/>
							) : (
								<IconButton
									onClick={() => dispatch(toggleFavorites(true))}
									icon={<MdOutlineFavoriteBorder size='20px' />}
									variant='ghost'
								/>
							)}
							<ColorModeToggle />
						</Box>
					)}
				</Box>
			</Box>
			{userInfo && !userInfo.active && showBanner && (
				<Box>
					<Alert status='warning'>
						<AlertIcon />
						<AlertTitle>Email címe nincs megerősítve!</AlertTitle>
						<AlertDescription>Meg kell erősítenie az e-mail címét.</AlertDescription>
						<Spacer />
						<CloseIcon cursor={'pointer'} onClick={() => setShowBanner(false)} />
					</Alert>
				</Box>
			)}
		</>
	);
};

export default Header;