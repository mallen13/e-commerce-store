import React from 'react';
import {
    Button,
    Heading,
    Image,
    Text,
    VStack,
    Wrap,
  } from '@chakra-ui/react';
import FormattedPrice from '../reusable/FormatAmount';
  import Modal from '../reusable/Modal';

const ProductModal = ({isOpen,onClose,product,modifyCart}) => {

  const footerBtn = 
    <Button 
      onClick={ () => modifyCart(product,'add')} 
      colorScheme='blue' 
      data-testid='modalAddBtn'
      w={['100%','auto']}
    >Add to Cart</Button>

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      size='4xl' 
      footerBtn={footerBtn} 
      title='View Product'
    >
      <Wrap justify='space-evenly' align='center'>
        <Image 
          src={product.image}  
          h={['150px','200px']}
          borderRadius='5px' 
          bg='gray.200' 
          alt={product.title}
        />
        <VStack w={['','40%']} align='start'>
          <Heading size='lg' w='100%'>{product.title}</Heading>
          <FormattedPrice amount={product.price} fontWeight='bold' />
          <Text>{product.description}</Text>
        </VStack>
        </Wrap>
    </Modal>
  )
}

export default ProductModal