import React, { useState } from 'react';
import { Box, Image, Text, Badge, Flex, IconButton, Skeleton, useToast, Tooltip } from '@chakra-ui/react';
import { BiExpand } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../redux/actions/productActions';
import { useSelector } from 'react-redux';
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from 'react-icons/md';
import { Link as ReactLink } from 'react-router-dom';
import { addCartItem } from '../redux/actions/cartActions';
import { useEffect } from 'react';
import { TbShoppingCartPlus } from 'react-icons/tb';
import ConfirmAgesAlert from './ConfirmAgesAlert';// Importáljuk az Alert komponenst

const ProductCard = ({ product, loading }) => {
    const dispatch = useDispatch();
    const { favorites } = useSelector((state) => state.product);
    const [isShown, setIsShown] = useState(false);
    const { cartItems } = useSelector((state) => state.cart);
    const toast = useToast();
    const [cartPlusDisabled, setCartPlusDisabled] = useState(false);
    const [isOpen, setIsOpen] = useState(false); // Állapot az Alert megnyitásához

    useEffect(() => {
        const item = cartItems.find((cartItem) => cartItem.id === product._id);
        if (item && item.qty === product.stock) {
            setCartPlusDisabled(true);
        }
    }, [product, cartItems]);

    const addItem = (id) => {
        if (cartItems.some((cartItem) => cartItem.id === id)) {
            const item = cartItems.find((cartItem) => cartItem.id === id);
            dispatch(addCartItem(id, item.qty + 1));
        } else {
            dispatch(addCartItem(id, 1));
        }
        toast({
            description: 'A tétel hozzá lett adva.',
            status: 'success',
            isClosable: true,
        });
    };

    // Az életkor megerősítő figyelmeztetés megjelenítése
    const handleAddToCartClick = () => {
        if (product.category === 'alkohol') { // Csak akkor jelenik meg az életkor megerősítő figyelmeztetés, ha az alkoholtartalmú termékre kattint
            setIsOpen(true);
        } else {
            addItem(product._id);
        }
    };

    return (
        <Skeleton isLoaded={!loading}>
            <Box
                _hover={{ transform: 'scale(1.04)', transitionDuration: '0.5s' }}
                borderWidth='1px'
                maxW='400px'
                overflow='hidden'
                p='4'
                shadow='md'>
                {product.productIsNew && (
                    <Badge position='absolute' ml='2' colorScheme='purple'>
                        AKCIÓ!
                    </Badge>
                )}
                <Box as={ReactLink} to={`/product/${product._id}`}>
                    <Image
                        onMouseEnter={() => setIsShown(true)}
                        onMouseLeave={() => setIsShown(false)}
                        src={product.images[isShown && product.images.length === 2 ? 1 : 0]}
                        fallbackSrc='https://via.placeholder.com/150'
                        alt={product.name}
                        height='200px'
                    />
                    {product.stock < 5 ? (
                        <Badge colorScheme='yellow'>Csak {product.stock}db maradt </Badge>
                    ) : product.stock < 1 ? (
                        <Badge colorScheme='red'>Elfogyott</Badge>
                    ) : (
                        <Badge colorScheme='green'>Elérhető</Badge>
                    )}

                    <Text noOfLines={1} fontSize='xl' display='flex' justifyContent='center' fontWeight='semibold' mt='2'>
                        {product.brand}
                    </Text>
                    <Text style={{ textAlign: 'center', textOverflow: 'ellipsis' }} noOfLines={1} fontSize='md' display='flex' justifyContent='center' fontWeight='' mt='2'>
                        {product.name}
                    </Text>
                    <Text noOfLines={1} fontSize='md' color='gray.600'>
                        {product.subtitle}
                    </Text>
                </Box>
                <Flex justify='center' alignItems='center' mt='2'>
                    <Text fontSize='xl' fontWeight='semibold' color='red.300'>
                        {product.price} Ft
                    </Text>
                </Flex>
                <Flex justify='space-between' mt='2'>
                    {favorites.includes(product._id) ? (
                        <IconButton
                            icon={<MdOutlineFavorite size='20px' />}
                            colorScheme='red'
                            size='sm'
                            onClick={() => dispatch(removeFromFavorites(product._id))}
                        />
                    ) : (
                        <IconButton
                            icon={<MdOutlineFavoriteBorder size='20px' />}
                            colorScheme='red'
                            size='sm'
                            onClick={() => dispatch(addToFavorites(product._id))}
                        />
                    )}

                    <IconButton
                        icon={<BiExpand size='20' />}
                        as={ReactLink}
                        to={`/product/${product._id}`}
                        colorScheme='red'
                        size='sm'
                    />

                    <Tooltip
                        isDisabled={!cartPlusDisabled}
                        hasArrow
                        label={
                            !cartPlusDisabled
                                ? 'Elérte a termék maximális mennyiségét. '
                                : product.stock <= 0
                                    ? 'Elfogyott'
                                    : ''
                        }>
                        <IconButton
                            isDisabled={product.stock <= 0 || cartPlusDisabled}
                           
                            onClick={() => handleAddToCartClick()}
                            icon={<TbShoppingCartPlus size='20' />}
                            colorScheme='red'
                            size='sm'
                        />
                    </Tooltip>
                </Flex>
            </Box>
			<ConfirmAgesAlert product={product} addItem={addItem} isOpen={isOpen} onClose={() => setIsOpen(false)} />

        </Skeleton>
    );
};

export default ProductCard;
