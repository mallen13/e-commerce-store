import { useState } from 'react';
import {
  Button,
  Center,
  Heading,
  Image,
  Text,
  useDisclosure,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import FormattedPrice from '../reusable/FormatAmount';
import ProductModal from './ProductModal';

const ProductGrid = ({modifyCart,products}) => {
  
  const [modalProduct,setModalProduct] = useState({name: '', description: '', price: 0});

  //product modal
  const {isOpen,onOpen,onClose} = useDisclosure();

  //set modal product an open
  const openModal = product => {
    setModalProduct(product)
    onOpen()
  }

  //map products
  const mappedProducts = products.map( (product,i) => {
    return (
      <WrapItem 
        key={i} 
        flexDir='column' 
        w={['75%','250px']}
        h={['','375px']}
        justifyContent='space-around'
        alignItems='center'
        borderRadius='lg' 
        bgColor='rgba(239, 249, 253, 0.8)'
        p='2'
        transitionDuration='0.5s'
        _hover={{transform: 'scale(1.1)'}} 
        shadow='lg'
      >
        <Image src={product.image} h='150px' borderRadius='md' alt={product.title} bg='gray.300' />
        <Text h={['','100px']} noOfLines={3}>{product.title}</Text>
        <FormattedPrice amount={product.price} fontWeight='bold' />
        <Button 
          onClick={ ()=> modifyCart(product,'add') } 
          mt='2' 
          mb='3' 
          colorScheme='blue'
          w={['100%','auto']}
        >Add to Cart</Button>
        <Button 
          onClick={ ()=> openModal(product) } 
          variant='link' w={['100%','auto']} 
          textDecor='underline'
        >View Item</Button>
      </WrapItem>
    )
  })

  return (
    <>
      <Heading pt={['100px','125px']} textAlign='center'>Check out our items!</Heading>
      {/* Products */}
      <Center w='100%' p='3' pt={['50px','75px']}>
        <Wrap w='95%' maxW='1250px' justify={['center','center']} spacing={['40px','20']}>
          {mappedProducts}
        </Wrap>
      </Center>
      {/* Product Details Modal */}
      <ProductModal 
        isOpen={isOpen} 
        onClose={onClose}
        product={modalProduct}
        modifyCart={modifyCart}
      />
    </>
  )
}

export default ProductGrid;