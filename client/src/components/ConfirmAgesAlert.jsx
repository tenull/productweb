import React, { useState } from 'react';
import {
    Button,
    Image,
    Text,
    Checkbox,
    AlertDialog,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogBody,
    AlertDialogHeader,
    AlertDialogOverlay,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';


const ConfirmAgesAlert = ({ isOpen, onClose, cancelRef,addItem,product,AdultImage }) => {



    const dispatch = useDispatch();
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };
    

    const handleButtonClick = (productId)=>{
        onClose();
        addItem(productId)
      
    }
    
    return (
        <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader display="flex" justifyContent='center' fontSize='lg' fontWeight='bold'>
                    <Image rounded='lg' w='150px' h='150px' color="red" fit='cover' src={AdultImage} fallbackSrc='https://via.placeholder.com/150' />
                    </AlertDialogHeader>
                    <AlertDialogBody>
                        <Text>
                            A terméket csak 18 évet betöltött személy vásárolhatja meg!
                        </Text>
                        <Checkbox size='sm' onChange={handleCheckboxChange}>
                            Kijelentem, hogy elmúltam 18 éves
                        </Checkbox>
                        
                        {!isChecked && (
                            <Text color="red.500" fontSize="sm">
                                Ez egy kötelező mező
                            </Text>
                        )}
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            Mégsem
                        </Button>
                        <Button colorScheme='red' onClick={() => handleButtonClick(product._id)} ml={3} isDisabled={!isChecked}>
    Megerősítem
</Button>


                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
};

export default ConfirmAgesAlert;
