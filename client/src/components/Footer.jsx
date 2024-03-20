import { Button, ButtonGroup, Container, Divider, IconButton, Input, Stack, Text, useColorModeValue as mode, Box, Flex, Icon } from '@chakra-ui/react'
import { FaGithub, FaLinkedin, FaFacebook } from 'react-icons/fa';
import { BsPhoneFlip } from 'react-icons/bs';
import { TbShoppingCart } from 'react-icons/tb';



const Footer = () => {
    return (
        <Box w='100%' bg={mode('red.300', 'gray.900')}>
            <Container as='footer' maxW='7xl'>
                <Stack spacing='12' direction={{ base: 'column', md: 'row' }} justify='space-evenly' py={{ base: '12', md: '16' }}>
                    <Stack spacing={{ base: '6', md: '8' }} align='start'>
                        <Flex alignItems='center'>
                            <Icon as={TbShoppingCart} h='10' color={mode('black', 'yellow.200')} />
                            <Text fontSize='2xl' fontWeight='extrabold'>ÉVI ABC</Text>
                        </Flex>
                        <Text color='muted'>+36 70 207 4102</Text>
                    </Stack>
                    <Stack direction={{ base: 'column-reverse', md: 'column', lg: 'row' }} spacing={{ base: '12', md: '8' }}>
                        <Stack spacing='12' flex='1'>
                            <Text fontSize='sm' fontWeight='semibold' color='subtle'>Elérhetőségek</Text>
                            <Stack spacing='3' shouldWrapChildren direction='column'>
                                <Button variant='link'>Cím: 4080 Hajdúnánás, Sarló utca 45.</Button>
                                <Button variant='link'>Telefon: +36 70 207 4102</Button>
                                <Button variant='link'>Email: t0csa91@gmail.com</Button>
                            </Stack>
                        </Stack>
                        <Stack spacing='12' flex='1'>
                            <Text fontSize='sm' fontWeight='semibold' color='subtle'>Információk</Text>
                            <Stack spacing='3' shouldWrapChildren direction='column'>
                                <Button variant='link'>Általános szerződési feltételek</Button>
                                <Button variant='link'>Szállítási és fizetési információk</Button>
                                <Button variant='link'>Adatkezelési tájékoztató</Button>
                                <Button variant='link'>Adatkezelési tájékoztató</Button>
                            </Stack>
                        </Stack>
                    </Stack>

                    {/* <Stack spacing='4'>
                        <Text fontSize='sm' fontWeight='semibold' color='subtle'> Stay up to date</Text>
                        <Stack spacing='4' direction={{base:'column',sm:'row'}} maxW={{lg:'360px'}}>
                            <Input placeholder='Enter Your email' type='email' required/>
                            <Button variant='primary' type='submit' flexShrink='0'>Subscribe</Button>
                       
                        </Stack>
                    </Stack> */}
                </Stack>
            
            <Divider />
            <Stack pt='8' pb='12' justify='space-between' direction={{ base: 'column-reverse', md: 'row' }} align='center'>
                <Text fontSize='sm' color='subtle'>
                    &copy; {new Date().getFullYear()} Évi ABC. Minden jog fenntartva.
                </Text>
                <ButtonGroup variant='ghost'>
                    <IconButton as='a' href='#' icon={<FaLinkedin fontSize='1.25rem' />} />
                    <IconButton as='a' href='#' icon={<FaGithub fontSize='1.25rem' />} />
                    <IconButton as='a' href='#' icon={<FaFacebook fontSize='1.25rem' />} />
                </ButtonGroup>
            </Stack>
        </Container>
        </Box >
      );
}

export default Footer;