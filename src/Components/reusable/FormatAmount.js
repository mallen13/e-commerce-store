import React from 'react';
import { Text } from '@chakra-ui/react';

const FormattedPrice = ({amount,fontWeight}) => (
    <Text fontWeight={fontWeight}>
        ${(Math.round(amount * 100)/100).toLocaleString('en-us', {minimumFractionDigits: 2})}
    </Text>
)

export default FormattedPrice;