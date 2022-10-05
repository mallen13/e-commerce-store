import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom'
import CartDrawer from './CartDrawer';
import '@testing-library/jest-dom';

const renderCart = () => (
    {
        items: [
            {
                title: 'item1',
                price: 400,
                quantity: 1,
                total: 400
            }
        ],
        numItems: 1,
        subtotal: 400,
    }
)
const component = (modifyCart = null,cart = {numItems: 0}) => (
    <Router>
        <CartDrawer
            isOpen={true}
            cart={cart}
            numItems={cart.numItems}
            modifyCart={modifyCart}
        />
    </Router>
)

describe('cart', ()=> {
    it('renders the cart with item and prices', ()=> {
        const cart = renderCart();
        render(component(null,cart));
        expect(screen.getByText(/Shopping Cart/i)).toBeInTheDocument();
    })

    it('updates cart after clicking add button', async ()=> {
        //mocks
        const cart = renderCart()
        const modifyCart = jest.fn( ()=> {
            cart.items= [{
                title: 'item1',
                quantity: 2,
                price: 400,
                total: 800
            }]
            cart.numItems = 2
            cart.subtotal = 800
        });

        //render
        const {rerender} = render(component(modifyCart,cart));

        //get add btn
        const addBtn = screen.getByLabelText('increase quantity')

        //click add btn
        userEvent.click(addBtn);

        //rerender
        rerender(component(modifyCart,cart))

        //expects quantity to change from one to two
        const quantity = screen.getByText('2');
        expect(quantity).toBeInTheDocument();
    })

    it('removes item after click subtract button if none remain', async ()=> {
        //mocks
        const cart = renderCart()
        const modifyCart = jest.fn( ()=> {
            cart.items= []
            cart.numItems = 0
            cart.subtotal = 0
        });

        //render
        const {rerender} = render(component(modifyCart,cart));

        //get add btn
        const subtractBtn = screen.getByLabelText('decrease quantity')

        //click add btn
        userEvent.click(subtractBtn);

        //rerender
        rerender(component(modifyCart,cart))

        //expects quantity to change from one to two
        expect(screen.getByText(/0 items/i)).toBeInTheDocument();
    })

    it('changes item quantity if subtracing when > 0 items remain', async ()=> {
        //mocks
        const cart = {
            items: [
                {
                    title: 'item1',
                    price: 400,
                    quantity: 2,
                    total: 800
                }
            ],
            numItems: 2,
            subtotal: 800,
        }

        const modifyCart = jest.fn( ()=> {
            cart.items= [{
                title: 'item1',
                quantity: 1,
                price: 400,
                total: 400
            }]
            cart.numItems = 1
            cart.subtotal = 400
        });

        //render
        const {rerender} = render(component(modifyCart,cart));

        //get add btn
        const subtractBtn = screen.getByLabelText('decrease quantity')

        //click add btn
        userEvent.click(subtractBtn);

        //rerender
        rerender(component(modifyCart,cart))

        //expects quantity to change from one to two
        const quantity = screen.getByText('1');
        expect(quantity).toBeInTheDocument();
    })

    it('disables proceed button after clicking remove', async ()=> {
        //mocks
        const cart = renderCart()
        const modifyCart = jest.fn( ()=> {
            cart.items= []
            cart.numItems = 0
            cart.subtotal = 0
        });

        //render
        const {rerender} = render(component(modifyCart,cart));

        //get add btn
        const removeBtn = screen.getByText(/remove/i)

        //click add btn
        userEvent.click(removeBtn);

        //rerender
        rerender(component(modifyCart,cart))

        //expects proceed to checkout button to be disabled
        const proceedBtn = screen.getByText(/proceed/i)
        expect(proceedBtn).toBeDisabled();
    })

    it('hides cart when clicking the proceed button', ()=> {

        const cart = renderCart();
        const onClose = jest.fn();

        render(
            <Router>
                <CartDrawer
                    isOpen={true}
                    cart={cart}
                    numItems={cart.numItems}
                    onClose={onClose}
                />
            </Router>
        );

        //expects proceed to checkout button to be disabled
        const proceedBtn = screen.getByText(/proceed/i)

        userEvent.click(proceedBtn);

        //get proceed to 
        expect(onClose).toHaveBeenCalled();
    })    

})