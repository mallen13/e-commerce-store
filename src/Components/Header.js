import React from 'react';
import { 
  Center,
  Circle,
  Heading,
  HStack,
  IconButton,
  Image,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import image from '../images/logo.png';
import { Cart2 } from 'react-bootstrap-icons';

const Header = ({openCart,cartCount}) => {
  
  const countBadge = (
    <Circle 
      size='25px' 
      bg='#D70B0B' 
      color='white' 
      pos='absolute' 
      bottom='0' 
      right='0' 
      m='-8px'
    >{cartCount}</Circle>
  )

  return(
    <Center 
      as="header" 
      aria-label='cart icon'
      position="fixed" 
      backgroundColor="rgba(239, 249, 253, 0.8)" 
      backdropFilter="saturate(180%) blur(5px)" 
      w="100%"
      zIndex='10'
      pb='1'
      pt='1'
    >
    {/* <Center as='header'> */}
      <HStack 
        as='main' 
        align={['start','center']} 
        justify='space-between' 
        pt={['','0']}
        pl={['5','10']}
        pr={['5','10']}
        w='100%' 
        maxW='1500px'
      >

        {/* Header Branding */}
        <Link as={RouterLink} to='/e-commerce-store/' _hover={{textDecoration: 'none'}}>
          {/* Logo */}
          <HStack>
            <Image
              boxSize={['50px','60px']}
              src={image}
              alt='Empire Ships' 
              mt='1'
            />
            <VStack spacing='0' align='start' mt='75px'>
              <Heading fontSize={['15','18']}>The Bargain Barn</Heading>
              <Text>Thrifting made virtual</Text>
            </VStack>
          </HStack>
        </Link>
        
        {/* Cart Button */}
        <Center pos='relative' data-testid='numItemsBadge'>
          <IconButton 
            onClick={openCart} 
            icon={<Cart2 size='35' fill='#3182CE'/>} 
            width='50px'
            height='50px'
            borderRadius='full'
            pb='1'
            aria-label='Show Cart Button'
            bgColor='transparent'
          />

          {/* Items Count Badge */}
          {
            cartCount  ? countBadge : null
          }
        </Center>
        
      </HStack> 
    </Center>
  )
}

export default Header