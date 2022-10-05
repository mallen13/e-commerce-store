import { Button, Text, VStack } from "@chakra-ui/react";
import Modal from '../reusable/Modal';
import { Check2Circle } from 'react-bootstrap-icons';

const CheckoutModal = ({isOpen,onClose,onConfirm}) => {

  const footerBtn = <Button onClick={onConfirm} colorScheme='blue' >Done</Button>

  return (
  <Modal 
    isOpen={isOpen} 
    onClose={onClose} 
    footerBtn={footerBtn} 
    title='Transaction Complete'
    hideClose={true}
  >
    <VStack>
      <Check2Circle size='40' color='green' />
      <Text>Your order was successfully submitted.</Text>
    </VStack>
  </Modal>
  )
}

export default CheckoutModal;