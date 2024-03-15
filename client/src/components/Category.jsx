import { categoryData } from "../categoryData";
import { Link as ReactLink } from "react-router-dom";
import { WrapItem, Box, Wrap, Image, Text, Link } from "@chakra-ui/react";

const Category = () => {
    return (
        <Wrap spacing='30px' justify='center'>
            {categoryData.map((category) => (
                <div className="category-button" key={category.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                    <WrapItem key={category.name} display='flex' justifyContent='center' w='75px' h='75px'>
                        <ReactLink to={category.link} style={{ width: '100%', height: '100%', backgroundImage: `url(${category.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></ReactLink>
                    </WrapItem>
                    <Link 
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
                </div>
            ))}
        </Wrap>
    );
}

export default Category;
