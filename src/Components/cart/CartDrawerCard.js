import {
    Button,
    HStack,
    IconButton,
    Image,
    Text,
    VStack
  } from '@chakra-ui/react';
import { Dash,Plus } from 'react-bootstrap-icons';
import FormattedPrice from '../reusable/FormatAmount';

const CartDrawerCard = ({item,modifyCart}) => (
    <VStack 
        w='100%' 
        align='start'
        justify='space-between' 
        p='2' 
        bg={['gray.100','white']}
        mt={0}
        borderRadius='md'
    >
        <HStack w='100%' justify='space-between'>
            {/* Name */}
            <Text maxW='60%' fontWeight='bold'>{item.title}</Text>

            {/*Total*/}
            <FormattedPrice amount={item.total} />
        </HStack>
        
        <HStack w='100%' justify='space-between'>
            {/* item image */}
            <Image 
                src={item.image} 
                width='50px'
                borderRadius='md' 
                bg='gray.200' 
                alt='Product'
                w='120px'
            />
            <VStack>
                {/* Quantity Buttons */}
                <HStack>
                    {/* Decrese Quantity */}
                    <IconButton 
                        icon={<Dash size={25} />} 
                        aria-label='decrease quantity' 
                        onClick={()=> modifyCart(item,'subtract')} 
                    />

                    {/* Quantity */}
                    <Text data-testid='itemQuantity'>{item.quantity}</Text>

                    {/* Increase Quantity */}
                    <IconButton 
                        icon={<Plus size={25} />} 
                        aria-label='increase quantity'
                        onClick={()=> modifyCart(item,'add')} 
                    />
                </HStack>

                {/* Remove Button */}
                <Button 
                    onClick={ ()=> modifyCart(item,'remove') } 
                    variant='link' 
                    color='blue'
                    >Remove
                </Button>
            </VStack>
        </HStack>
    </VStack>
)

export default CartDrawerCard;