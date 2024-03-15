import { FormControl, FormLabel, Textarea, FormErrorMessage } from "@chakra-ui/react";
import { useField } from 'formik';

const TextArea = ({ label, name, placeholder }) => {
    const [field, meta] = useField(name);

    return (  
        <FormControl isInvalid={meta.error && meta.touched} mb='6'>
            <FormLabel htmlFor={name}>{label}</FormLabel>
            <Textarea {...field} id={name} name={name} placeholder={placeholder} />
            <FormErrorMessage>{meta.error}</FormErrorMessage>
        </FormControl>
    );
}
 
export default TextArea;
