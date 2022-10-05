import { render,screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event'; 
import React from 'react';
import App from './App';
import '@testing-library/jest-dom';
import ErrorBoundary from './ErrorBoundary';


describe('App Rendering', ()=> {
    it('renders the app', ()=> {
        render(
            <Router>
                <App />
            </Router>
        );

        const cartBtn = screen.getByLabelText('cart icon');
        expect(cartBtn).toBeInTheDocument();
        
    })
    
    it('displays error boundary when an error is thrown', () => {
        const ThrowErr = () => {
            throw new Error('You have error ID10T');
        }

       const spy = jest.spyOn(console, 'error');
       spy.mockImplementation(()=> null);
    
        render(
            <ErrorBoundary fallback>
                <ThrowErr />  
            </ErrorBoundary>
        )

        expect(screen.getByText(/Something went wrong./i)).toBeInTheDocument();
    })
})

describe('Cart Helpers', ()=> {

    it('updates item count after click add to cart', async () => {
        //arrange
        //mock fetch
        global.fetch = () =>
        Promise.resolve({
        json: ()=> Promise.resolve([{title: 'test product'}])
        })

        render(
            <Router>
                <App />
            </Router>
        )
        
        //act
        //click add to card
        const addBtn = await screen.findByText('Add to Cart');
        userEvent.click(addBtn);

        //asert
        const numItems = screen.getByTestId('numItemsBadge');
        expect(numItems).toHaveTextContent('1');
        
        localStorage.clear();
    })

    it('shows item removed after subtracting two items from cart', async () => {
        //arrange
        //mock fetch
        global.fetch = () =>
        Promise.resolve({
        json: ()=> Promise.resolve([{title: 'test product'}])})

        render(
            <Router>
                <App />
            </Router>
        )
        
        //act
        //click add to card
        const addBtn = await screen.findByText('Add to Cart');
        userEvent.click(addBtn);
        userEvent.click(addBtn);

        //assert
        const numItems = screen.getByTestId('numItemsBadge');
        expect(numItems).toHaveTextContent('2');

        const cartBtn = screen.getByLabelText('Show Cart Button');
        userEvent.click(cartBtn);

        //const test = screen.getByLabelText(/shopping cart/i);
        const removeBtn = screen.getByLabelText(/decrease quantity/i);
        userEvent.click(removeBtn);

        const removedMsg = screen.getByText(/item removed/i);
        expect(removedMsg).toBeInTheDocument();

        localStorage.clear();
    })

    it('shows item removed after subtracting one item from cart', async () => {
        //arrange
        //mock fetch
        global.fetch = () =>
        Promise.resolve({
        json: ()=> Promise.resolve([{title: 'test product'}])})

        render(
            <Router>
                <App />
            </Router>
        )
        
        //act
        //click add to card
        const addBtn = await screen.findByText('Add to Cart');
        userEvent.click(addBtn);

        //assert
        const numItems = screen.getByTestId('numItemsBadge');
        expect(numItems).toHaveTextContent('1');

        const cartBtn = screen.getByLabelText('Show Cart Button');
        userEvent.click(cartBtn);

        //const test = screen.getByLabelText(/shopping cart/i);
        const removeBtn = screen.getByLabelText(/decrease quantity/i);
        userEvent.click(removeBtn);

        const removedMsg = screen.getAllByText(/item removed/i)[0];
        expect(removedMsg).toBeInTheDocument();

        localStorage.clear();
    })

    it('shows item removed after removing from cart', async () => {
        //arrange
        //mock fetch
        global.fetch = () =>
        Promise.resolve({
        json: ()=> Promise.resolve([{title: 'test product'}])})

        render(
            <Router>
                <App />
            </Router>
        )
        
        //act
        //click add to card
        const addBtn = await screen.findByText('Add to Cart');
        userEvent.click(addBtn);

        //assert
        const numItems = screen.getByTestId('numItemsBadge');
        expect(numItems).toHaveTextContent('1');

        const cartBtn = screen.getByLabelText('Show Cart Button');
        userEvent.click(cartBtn);

        //const test = screen.getByLabelText(/shopping cart/i);
        const removeBtn = screen.getByText('Remove');
        userEvent.click(removeBtn);

        const removedMsg = screen.getAllByText(/item removed/i)[0];
        expect(removedMsg).toBeInTheDocument();
    })
})