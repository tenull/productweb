import { FormControl, FormLabel,Flex, Button,Icon, Input, Stack, Textarea, Text, Box, VStack, HStack,useColorModeValue as mode } from "@chakra-ui/react";
import { MdLocationOn } from "react-icons/md";
import { MdOutlineMail } from "react-icons/md";
import { MdLocalPhone } from "react-icons/md";
const Contact = () => {
    return (
        <VStack alignItems="center" minHeight='80vh' mx={{ base: '12', md: '20', lg: '32' }}>
            <Box display='flex' justifyContent='center' marginY='20px'>
                <Text fontSize='4xl' fontWeight='bold'>Kapcsolat</Text>
            </Box>

            <Flex justify={{base:'center', md:'center'}} flexDirection={{base:'column',md:'row'}} alignItems='center' flexWrap={{base:'nowrap',md:'wrap'}}  width='90%' marginBottom='20px'>
                <Stack spacing='4'  w="300px" h='150px' display='flex' align='center' justify='center' bg={mode('red.300', 'gray.900')} rounded='10px'p='20px' position='relative'>
                    <Icon  as={MdLocationOn} fontSize='50px' h='10' color={mode('black', 'yellow.200')} position='absolute' top='-15%' />
                    <Text fontWeight='bolder'>Cím</Text>
                    <Text>4080 Hajdúnánás Sarló utca 45.</Text>
                </Stack>
                <Stack my={{base:'25px',md:'25px'}} mx={{base:'25px',md:'25px'}} spacing='4' w="300px" h='150px' align='center' justify='center' bg={mode('red.300', 'gray.900')} rounded='10px'p='20px' position='relative'>
                    <Icon as={MdOutlineMail} fontSize='50px' h='10' color={mode('black', 'yellow.200')} position='absolute' top='-15%'/>
                    <Text fontWeight='bolder'>Email cím</Text>
                    <Text><a href="mailto:t0csa91@gmail.com">t0csa91@gmail.com</a></Text>
                </Stack>
                <Stack spacing='4' w="300px" h='150px' align='center' justify='center' bg={mode('red.300', 'gray.900')} rounded='10px'p='20px' position='relative'>
                    <Icon as={MdLocalPhone} fontSize='35px' h='10' color={mode('black', 'yellow.200')} position='absolute' top='-15%'/>
                    <Text fontWeight='bolder'>Telefonszám</Text>
                    <Text><a href="tel:+36702074102">+36 70 207 4102</a></Text>
                </Stack>
            </Flex>

            <Box display='flex' justifyContent='center' marginY='20px'>
                <Text fontSize='4xl' textAlign='center' fontWeight='bold'>Küldjön üzenetet</Text>
                
            </Box>

  <Box display='flex' justifyContent='center' >
                <Text fontSize='l' fontWeight=''>Amennyiben szeretné megrendelését másik időpontban megkapni leadhatja rendelését előre. Vagy ha szeretne másik terméket is látni kínálatunkba adja le igényeit.</Text>
                
            </Box>
            

            <Box width='100%' display='flex' justifyContent='center'>
                <Box width='100%' maxWidth='590px'>
                    <HStack spacing={{ base: '0', md: '8' }} display='flex' flexWrap='wrap'>
                        <FormControl flex='1' minW='250px'>
                            <FormLabel htmlFor='name'>Név</FormLabel>
                            <Input id='name' name='name' placeholder='Név' />
                        </FormControl>
                        <FormControl flex='1' minW='250px'>
                            <FormLabel htmlFor='phone'>Telefonszám</FormLabel>
                            <Input id='phone' name='phone' placeholder='Telefonszám' />
                        </FormControl>
                    </HStack>

                    <HStack spacing={{ base: '0', md: '8' }} display='flex' flexWrap='wrap'>
                        <FormControl flex='1' minW='250px'>
                            <FormLabel htmlFor='email'>E-mail cím</FormLabel>
                            <Input id='email' name='email' placeholder='E-mail cím' />
                        </FormControl>
                        <FormControl flex='1' minW='250px'>
                            <FormLabel htmlFor='address'>Lakcím</FormLabel>
                            <Input id='address' name='address' placeholder='Utca, házszám' />
                        </FormControl>
                    </HStack>
                </Box>
            </Box>

            <Box width='100%' display='flex' mb='20px' justifyContent='center'>
                <Box width='100%' maxWidth='590px'>
                    <FormControl>
                        <FormLabel htmlFor='comment'>Megjegyzés</FormLabel>
                        <Textarea height='300px' id='comment' name='comment' placeholder='Megjegyzés szállítási idővel kapcsolatban stb.' />
                    </FormControl>
                </Box>
            </Box>
            <Button  bg={mode('red.300', 'gray.900')} mb='20px'>Küldés</Button>
        </VStack>
    );
}

export default Contact;
