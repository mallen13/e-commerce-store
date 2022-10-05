import React from 'react';
import { 
  Center, 
  Heading, 
  HStack, 
  Image,
  Text, 
  VStack 
}from '@chakra-ui/react';
import image from './images/logo.png';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasErr: false };
  } 

  static getDerivedStateFromError(err) {
      console.error(err)
      return { hasErr: true}
  }

  render() {
    if (this.state.hasErr) {
      return (
        <Center minH='100vh' >
            <VStack>
              {/* Header */}
              <HStack>
                <Image  boxSize='40px' src={image} alt='Empire Ships' />
                <Heading>Empire Ships</Heading>
              </HStack>

              {/* Message */}
              <Text>Something went wrong. You may need to refresh the page or try again later.</Text>
            </VStack> 
        </Center>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary