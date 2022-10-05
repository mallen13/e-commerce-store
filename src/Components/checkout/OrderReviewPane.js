import { 
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Button,
    CloseButton,
    Divider,
    Heading,
    HStack,
    Text,
    VStack
} from '@chakra-ui/react';
import FormattedPrice from '../reusable/FormatAmount';
import CartDrawerCard from '../cart/CartDrawerCard';

const OrderReviewPane = ({ 
    cart,
    modifyCart,
    shippingCost,
    isDirty,
    handleSubmit,
    onSubmit,
    isSubmitting,
    submitErr,
    setSubmitErr
}) => (
    <VStack
        w={['90%','90%','90%','400px']} 
        // ['column','column','column','row']}></Flex>
        align='center' 
        bg={['white','gray.100']}
        p='5'
        m='5'
        borderRadius='lg'
        justify='space-around'
        >

        {/* Header */}
        <Heading size='med' w='100%' textAlign={['left','center']}>Order Summary</Heading>

        {/* Items */}
        <VStack w='100%' maxH='400px' overflow='auto' spacing='7'>
        {cart.items.map( (item,i) => <CartDrawerCard item={item} key={i} modifyCart={modifyCart} /> )}
        </VStack>

        {/* Cost Breakdown */}
        <Divider/>
        <VStack w='100%' justify='space-between'>
            <HStack justify='space-between' w='100%'>
                <Text>Subtotal:</Text>
                <FormattedPrice amount={cart.subtotal}/>
            </HStack>

            <HStack justify='space-between' w='100%' data-testid='shipping cost'>
                <Text>Shipping Cost:</Text>
            
                <FormattedPrice amount={cart.subtotal > 0 ? shippingCost : 0}/>
            </HStack>

            <HStack justify='space-between' w='100%'>
                <Text>Tax:</Text>
                <FormattedPrice amount={cart.subtotal > 0 ? Math.round(cart.subtotal * .10): 0}/>
            </HStack>
        </VStack>

        {/* Total */}
        <Divider />
        <HStack justify='space-between' w='100%'>
            <Heading size='med'>Order Total:</Heading>
            <FormattedPrice 
                fontWeight='bold'
                amount={cart.subtotal > 0 ? cart.subtotal + parseInt(shippingCost) + Math.round(cart.subtotal * .10) : 0}
            />
        </HStack>

        {/* Submit Button */}
        <VStack w='100%'>
            <Button 
                onClick={handleSubmit(onSubmit)}
                colorScheme='blue'
                // isDisabled={ cart.subtotal > 0 && isDirty ? false : true}
                isDisabled={ cart.subtotal > 0 ? false : true}
                isLoading={isSubmitting}
                loadingText='Processing'
                w='90%'
            >Place Order
            </Button>
            <Text>Try me!</Text>
        </VStack>

        {/* Err Alert */}
        <Alert status='error' flexDir='row' display={submitErr.display}>

            {/* Icon */}
            <AlertIcon />

            {/* Title/ Description */}
            <VStack align='start' spacing='0'>
                <AlertTitle>{submitErr.title}</AlertTitle>
                <AlertDescription>{submitErr.msg}</AlertDescription>
            </VStack>

            {/* Close Button */}
            <CloseButton 
                position='absolute' 
                right='8px' 
                top='8px' 
                onClick={ ()=> setSubmitErr({...submitErr, display: 'none'})}
            />
        </Alert>
    </VStack>
)

export default OrderReviewPane