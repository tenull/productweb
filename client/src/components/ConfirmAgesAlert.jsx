import {
    Button,
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

const ConfirmAgesAlert = ({ isOpen, onClose, cancelRef, }) => {
    const dispatch = useDispatch();
    const onDeleteItem = () => {
        
        onClose();
    };
    return (
        <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                       
                    </AlertDialogHeader>
                    <AlertDialogBody>
                        <Text>
                            A terméket csak 18 évet betöltött személy vásárolhatja meg!
                        </Text>
                        <Checkbox size='sm' colorScheme='red.300'>
                            Kijelentem, hogy elmúltam 18éves
                        </Checkbox>

                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            Mégsem
                        </Button>
                        <Button colorScheme='red' onClick ml={3}>
                            Elfogadom
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
};

export default ConfirmAgesAlert;