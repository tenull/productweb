import { useState } from "react";
import { categoryData } from "../categoryData";
import { Link as ReactLink } from "react-router-dom";
import { WrapItem, Box, Wrap, Image, Text, Link, Flex, IconButton } from "@chakra-ui/react";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
const Category = () => {
    const [visibleCategories, setVisibleCategories] = useState(5);
    const [showAll, setShowAll] = useState(false);

    const toggleCategories = () => {
        setShowAll(!showAll);
        setVisibleCategories(showAll ? 5 : categoryData.length);
    };

    return (
        <Box>
            <Box display='flex' justifyContent='center' alignItems='center' marginY='20px'>
                <Text fontSize='4xl' fontWeight='bold'>Kategóriák</Text>

            </Box>
            <Wrap spacing='20px' justify='center' align='center'>
                {categoryData.slice(0, visibleCategories).map((category) => (
                    <Box className="category-button" key={category.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <WrapItem key={category.name} display='flex' justifyContent='center' w={{ base: '40px', md: '75px' }} h={{ base: '40px', md: '75px' }}>
                            <ReactLink to={category.link} style={{ width: '100%', height: '100%', backgroundImage: `url(${category.image})`, backgroundRepeat: 'no-repeat', backgroundSize: 'contain', backgroundPosition: 'center' }}></ReactLink>
                        </WrapItem>
                        <Link
                            fontSize={{ base: '10px', md: '16px' }}
                            fontWeight='semibold'
                            as={ReactLink}
                            to={category.link}
                            display='flex'
                            justifyContent='center'
                            textDecoration="none"
                            _hover={{
                                textDecoration: 'none',
                                boxShadow: '0px 3px 0px red',
                            }}
                        >
                            {category.name}
                        </Link>
                    </Box>
                ))}
                <Box h={{ base: '40px', md: '100px' }} display='flex' flexDirection='column' alignItems='center' justifyContent='flex-end' onClick={toggleCategories} style={{ cursor: 'pointer' }}>
                    {showAll ? <CiCircleMinus style={{ width: '50px', height: '50px', }} /> : <CiCirclePlus style={{ width: '50px', height: '50px' }} />}
                    <Text textAlign='end' fontWeight='semibold' fontSize={{ base: '10px', md: '16px' }}>{showAll ? 'Mutass kevesebbet' : 'Mutass többet'}</Text>
                </Box>

            </Wrap>
        </Box>
    );
}

export default Category;
