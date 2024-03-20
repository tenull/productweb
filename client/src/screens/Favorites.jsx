import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import ProductCard from "../components/ProductCard";
import { Wrap, WrapItem, Center, Text, Box } from "@chakra-ui/react";

const Favorites = () => {
    const { loading } = useSelector((state) => state.product);
    const [favorites, setFavorites] = useState([]);
    const products = useSelector((state) => state.product.products);

    useEffect(() => {
        const localFavorites = JSON.parse(localStorage.getItem("favorites"));

        if (localFavorites) {
            setFavorites(localFavorites);
        }
    }, []);

    return (
        <Box>
            <Center marginY='20px'>
                <Text fontSize='4xl' fontWeight='bold'>Kedvenc termékek</Text>
            </Center>
            {favorites.length === 0 ? (
                <Center>
                    <Text fontSize='xl'>Jelenleg nincs hozzáadva kedvenc termék.</Text>
                </Center>
            ) : (
                <Wrap spacing='30px' justify='center' mx={{ base: '12', md: '20', lg: '32' }}>
                    {favorites.map((favoriteId) => {
                        const product = products.find((product) => product._id === favoriteId);
                        if (product) {
                            return (
                                <WrapItem key={product._id}>
                                    <Center w='250px' h='450px'>
                                        <ProductCard product={product} loading={loading} />
                                    </Center>
                                </WrapItem>
                            );
                        } else {
                            return null; 
                        }
                    })}
                </Wrap>
            )}
        </Box>
    );
};

export default Favorites;
