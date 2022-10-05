import { 
    Box,
    Heading,
    HStack,
    Input,
    FormControl,
    FormErrorMessage,
    FormLabel, 
    NumberInput,
    NumberInputField,
    Radio,
    RadioGroup,
    Text,
} from '@chakra-ui/react';
import { Controller } from 'react-hook-form';
import NumberFormat from 'react-number-format';
import FormattedPrice from '../reusable/FormatAmount';


const CheckoutForm = ({
  register,
  control,
  errors,
  setShipping
}) => (
    <Box p='5' bgColor='white' m='5'  borderRadius='lg'>
      <form>
      {/* Shipping Info */}
      <Heading size='med' mb='3' align='center'>
        Shipping Information
      </Heading>

      {/* Name */}
      <FormControl isInvalid={errors.shippingName}>
        <FormLabel htmlFor='shippingName'>Full Name</FormLabel>
        <Input 
          id='shippingName' 
          placeholder='First and Last Name' 
          {...register('shippingName', {required: 'Required'})}
          defaultValue='Marty McFly'
        />
      {errors.shippingName ? null : <Box h='25px' />}
      <FormErrorMessage>{errors.shippingName && errors.shippingName.message}</FormErrorMessage>
      </FormControl>

      {/* Street Address */}
      <FormControl isInvalid={errors.shippingAddress}>
        <FormLabel htmlFor='shippingAddress'>Street Address</FormLabel>
        <Input 
          id='shippingAddress' 
          placeholder='123 Example St, Apt 1' 
          {...register('shippingAddress', {required: 'Required'})}
          defaultValue='1234 Fake Street'
        />
        {errors.shippingAddress ? null : <Box h='25px' />}
        <FormErrorMessage>{errors.shippingAddress && errors.shippingAddress.message}</FormErrorMessage>
      </FormControl>

      <HStack>
        {/* City */}
        <FormControl isInvalid={errors.shippingCity}>
          <FormLabel htmlFor='shippingCity'>City</FormLabel>
          <Input 
            id='shippingCity' 
            placeholder='City' 
            {...register('shippingCity', {required: 'Required'})}
            defaultValue='Pensacola'
          />
          {errors.shippingCity ? null : <Box h='25px' />}
          <FormErrorMessage>{errors.shippingCity && errors.shippingCity.message}</FormErrorMessage>
        </FormControl>

        {/* Shippint State */}
        <FormControl isInvalid={errors.shippingState}>
          <FormLabel htmlFor='shippingState'>State</FormLabel>
          <Input 
            id='shippingState' 
            placeholder='State' 
            {...register('shippingState', {required: 'Required'})}
            defaultValue='Florida'
          />
          {errors.shippingState ? null : <Box h='25px' />}
          <FormErrorMessage>{errors.shippingState && errors.shippingState.message}</FormErrorMessage>
        </FormControl>
      </HStack>

      {/* Shipping Method */}
      <Heading size='med' mb='3' mt='5' >Shipping Method</Heading>

      <FormControl>
        <RadioGroup 
          onChange={setShipping} 
          defaultValue='10' 
          display='flex'
          flexDir={['column','row']}
          justifyContent='space-between'
          alignItems='flex-start'
        >

          {/* Option 1 */}
          <Radio value='10' mb='3'>
            <HStack>
            <Text>Standard</Text>
            <FormattedPrice amount={10} fontWeight='bold'/>
            </HStack>
            <Text>Arrives in 5 to 10 Business Days.</Text>
          </Radio>

          {/* Option 2 */}
          <Radio value='15'>
            <HStack>
            <Text>Expedited</Text>
            <FormattedPrice amount={15} fontWeight='bold'/>
            </HStack>
            <Text>Arrives in 2 to 3 Business Days.</Text>
          </Radio>
        </RadioGroup>
      </FormControl>

      {/* Shipping Info */}
      <Heading size='med' mb='3' mt='10' textAlign='center' >Payment Information</Heading>

      {/* Name */}
      <FormControl isInvalid={errors.buyerName}>
        <FormLabel htmlFor='buyerName'>Full Name</FormLabel>
        <Input 
          id='buyerName' 
          placeholder='First and Last Name' 
          defaultValue='Marty McFly'
          {...register('buyerName', {required: 'Required'})}
        />
        {errors.buyerName ? null : <Box h='25px' />}
        <FormErrorMessage>{errors.buyerName && errors.buyerName.message}</FormErrorMessage>
      </FormControl>

      {/* Credit Card Number */}
      <FormControl isInvalid={errors.cardNum}>
        <Controller 
          render={ ({ field }) => (
            <>
              <FormLabel htmlFor='cardNum'>Credit Card Number</FormLabel>
              <NumberFormat
                customInput={Input}
                format='#### #### #### ####' 
                mask='#'
                placeholder='Card Number'
                defaultValue='1111 1111 1111 1111'
                {...field}
                id='cardNum'
              />
              {errors.cardNum ? null : <Box h='25px' />}
              <FormErrorMessage>{errors.cardNum && errors.cardNum.message}</FormErrorMessage>
            </>
          )}
          name='cardNum'
          control={control}
          rules={{ 
              // required: 'Required',
              minLength: {
                value: 19,
                message: 'Incomplete Card Number'
              }
          }}
        />
      </FormControl>

      <HStack>
        {/* Expire Date */}
        <FormControl isInvalid={errors.cardExpire}>
          <Controller 
            render={ ({ field }) => (
              <>
                <FormLabel htmlFor='cardExpire'>Expiration Date</FormLabel>
                <NumberFormat
                  id='cardExpire'
                  customInput={Input}
                  format='##/##' 
                  mask='#'
                  placeholder='MM/YY'
                  defaultValue='11/25'
                  {...field}
                />
                {errors.cardExpire? null : <Box h='25px' />}
                <FormErrorMessage>{errors.cardExpire && errors.cardExpire.message}</FormErrorMessage>
              </>
            )}
            name='cardExpire'
            control={control}
            rules={{ 
                // required: 'Required',
                minLength: {
                  value: 5,
                  message: 'Incomplete Date'
                }
            }}
          />
        </FormControl>

        {/* Security Code */}
        <FormControl isInvalid={errors.securityCode}>
        <FormLabel htmlFor='securityCode'>Security Code</FormLabel>
        <NumberInput defaultValue='123'>
          <NumberInputField 
            id='securityCode'
            maxLength={3}
            placeholder='CVV'
            {...register('securityCode', {
              required: 'Required',
              minLength: {
                value: 3,
                message: 'Not Enough Digits'
              }
            })}
          />
        </NumberInput>
        {errors.securityCode ? null : <Box h='25px' />}
        <FormErrorMessage>{errors.securityCode && errors.securityCode.message}</FormErrorMessage>
      </FormControl>
      </HStack>  
      </form>
    </Box>
    
)

export default CheckoutForm