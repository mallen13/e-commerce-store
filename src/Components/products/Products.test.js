import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductGrid from './ProductGrid';
import '@testing-library/jest-dom';

describe('product grid', ()=> {
    it('renders product grid', () => {
        render(<ProductGrid products={[{title: 'My Product'}]} />);
        const product = screen.getByText('My Product');
        expect(product).toBeInTheDocument();
    });

    it('calls modify cart function after clicking add to cart', ()=> {
        const modifyCart = jest.fn()
        render(<ProductGrid modifyCart={modifyCart} products={[{title: 'My Product'}]}/>)

        const addBtn = screen.getAllByText(/add to cart/i)[0]

        userEvent.click(addBtn);

        expect(modifyCart).toHaveBeenCalled();
    });

    it('opens a modal after clicking view item button', ()=> {
        render(<ProductGrid products={[{title: 'My Product'}]}/>)

        const viewItemBtn = screen.getAllByText(/view item/i)[0]
        userEvent.click(viewItemBtn)

        const productModal = screen.getByText('View Product');
        
        expect(productModal).toBeInTheDocument();
    });

    it('calls modify cart function after clicking add to cart in modal', ()=> {
        const modifyCart = jest.fn();

        render(<ProductGrid modifyCart={modifyCart} products={[{title: 'My Product'}]}/>)

        //click view item button
        const viewItemBtn = screen.getAllByText(/view item/i)[0]
        userEvent.click(viewItemBtn)


        //click add to cart in modal
        const addBtn = screen.getByTestId('modalAddBtn');

        userEvent.click(addBtn);

        expect(modifyCart).toHaveBeenCalled();
    });
})

