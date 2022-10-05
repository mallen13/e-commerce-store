import { BrowserRouter as Router } from 'react-router-dom';
import CheckoutPage from './CheckoutPage';

//test helper functions
export const renderCart = () => (
    {
        items: [
            {
                name: 'item1',
                price: 400,
                quantity: 1,
                total: 400
            }
        ],
        numItems: 1,
        subtotal: 400,
    }
)

export const renderPage = (modifyCart,cart = {},setCart) => (
    <Router>
        <CheckoutPage
            cart={cart}
            modifyCart={modifyCart}
            setCart={setCart}
        />
    </Router>
)

export const getInputs = screen => (
    {
        shippingName: screen.getAllByLabelText('Full Name')[0],
        shippingAddress: screen.getByLabelText('Street Address'),
        shippingCity: screen.getByLabelText('City'),
        shippingState: screen.getByLabelText('State'),
        buyerName: screen.getAllByLabelText('Full Name')[1],
        cardNum: screen.getByLabelText('Credit Card Number'),
        cardExpire: screen.getByLabelText('Expiration Date'),
        securityCode: screen.getByLabelText('Security Code')
    }
)

export const enterInputs = (userEvent,inputs) => {
    userEvent.type(inputs.shippingName,'fName lName');
    userEvent.type(inputs.shippingAddress,'12345 fake street');
    userEvent.type(inputs.shippingCity,'fake city');
    userEvent.type(inputs.shippingState,'ohio');
    userEvent.type(inputs.buyerName,'fName lName');
    userEvent.type(inputs.cardNum,'4444 4444 4444 4444');
    userEvent.type(inputs.cardExpire,'11/22');
    userEvent.type(inputs.securityCode,'123');
}