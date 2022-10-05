import { useToast } from '@chakra-ui/react';

export const useSuccessToast = () => {
  const toast = useToast()

    return (title,message) => toast({
        title: title,
        description: message,
        status: 'success',
        duration: 6000,
        isClosable: true
    })
}