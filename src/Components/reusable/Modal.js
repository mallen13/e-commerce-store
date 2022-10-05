import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    ModalFooter,
  } from '@chakra-ui/react';

const ProductModal = ({
  isOpen,
  onClose,
  title,
  footerBtn,
  size,
  children,
  hideClose = false
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={size}>
        <ModalOverlay backdropFilter='blur(5px)'/>
        <ModalContent maxH={['85%','']} w='900px' maxW='90%' overflow='auto'> 
            {/* Header */}
            <ModalHeader textAlign='center' >{title}</ModalHeader>
            {!hideClose ? <ModalCloseButton /> : null}

            {/* Modal Body */}
            <ModalBody> 
                {children}
            </ModalBody>

            <ModalFooter>
              {footerBtn}
            </ModalFooter>
        </ModalContent>
    </Modal>
  )
}

export default ProductModal