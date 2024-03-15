import {Text,Stack,Box,Button,Input} from '@chakra-ui/react'
import { useState } from 'react';
import { UseDispatch, useDispatch } from 'react-redux';
import { sendResetEmail } from '../redux/actions/userActions';

const PasswordForgottenForm = () => {
    const dispatch = useDispatch()
    const [email,setEmail]=useState('')
    const handleChange=(event)=>{
        setEmail(event.target.value)
    }
    return (  <>
    <Box my='4'>
        <Text as='b'>Írja be az alábbi e-mail címét.</Text>
        <Text>Küldünk Önnek egy e-mailt a jelszó visszaállításához szükséges linkkel.</Text>
    </Box>
    <Stack>
        <Input mb='4' type='text' name='email' placeholder='Your Email Address' label='Email' value={email} onChange={(e)=>handleChange(e)}/>
        <Button colorScheme='yellow' size='lg' fontSize='md' onClick={()=>dispatch(sendResetEmail(email))}>Visszaállítási e-mail küldése</Button>
    </Stack>
    </> );
}
 
export default PasswordForgottenForm;