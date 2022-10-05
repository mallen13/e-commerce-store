import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  Center,
  Flex,
  Heading,
  useDisclosure
} from '@chakra-ui/react';
import CheckoutForm from './CheckoutForm';
import OrderReviewPane from './OrderReviewPane';
import CheckoutModal from './CheckoutModal';


const CheckoutPage = ({cart,modifyCart,setCart}) => {

  //state
  const [shipping, setShipping] = useState(10);
  const [submitErr,setSubmitErr] = useState({ 
    display: 'none',
    title: '',
    msg:''
  });

  //hooks
  const navigate = useNavigate();
  const {isOpen,onOpen,onClose} = useDisclosure();
  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isDirty, isSubmitting },
  } = useForm()

  //handle submit
  const onSubmit = async data => {

    // show data
    console.log({
      ...data,
      shipping: shipping === '10' ? 'standard' : 'expedited',
      cart: cart
    });

    // fake async fetch
    await new Promise(resolve => {
      setTimeout(() => {
          resolve();
      }, 3000);
    });
 
    //show sub
    // setSubmitErr({
    //   display: 'flex',
    //   title: 'Payment Failed', // or System Error
    //   msg: 'Your card was declined.' //Please try again later.
    // })

    //open success modal
    onOpen();
  }

  //after modal confirmation,clear cart and re-route
  const startOver = () => {
    setCart({items: [], numItems: 0, subtotal: 0});
    localStorage.removeItem('cart');
    navigate('/e-commerce-store');
  }

  return (
    <>
      <Heading size='lg' align='center' mb={['0','10']} pt='100px'>Checkout</Heading>
      <Center>
        <Flex flexDir={['column','column','column','row']}>

          {/* Checkout Form */}
          <CheckoutForm 
            register={register} 
            control={control} 
            errors={errors} 
            setShipping={setShipping}
          />

          {/* Order Review Pane */}
          <OrderReviewPane 
            cart={cart} 
            modifyCart={modifyCart}
            shippingCost={shipping} 
            isDirty={isDirty}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            isSubmitting={isSubmitting} 
            submitErr={submitErr}
            setSubmitErr={setSubmitErr}
          />
        </Flex>

        {/* Post-Submit Modal */}
        <CheckoutModal isOpen={isOpen} onClose={onClose} onConfirm={startOver} />
      </Center>
    </>
  )
}

export default CheckoutPage