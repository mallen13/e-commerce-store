# Bargain Barn E-Commerce Store

Check it out at https://mallen13.github.io/e-commerce-frontend/

## About
This app is a front-end e-commerce application created using React and Chakra-UI. First, users can view a grid of products, view a modal with product detials, then add the product to the cart. Once the cart drawer is loaded, product quantities can be changed and the user can navigate to the checkout page. The checkout page makes use of the react-hook-form library to collect and validate user inputs after submission. 

## Development
The software development started with gathering project requirements, expectations, and parameters. A big focus was on responsive mobile-first design. Next, the project was drafted using Figma then coded by following the project designs. 

The project was coded, then development finished with writing some automated unit/integration tests with Jest and React-Testing-Library. A big focus was on creating components that were re-usable and easy to maintain. 

After design and development, deployment was the final step. GH-pages is currently sufficient for hosting as it meets the project budget and allows for simple front-end deployment. 

## Technologies
React was used since it allows for fast modular development. It makes projects easier to scale and creating of DOM-nodes very easy.

As for state-management, the project did not contain a lot of components, so prop drilling was sufficient. 

Prducts are currently fetched from a place-holder API called "Fake Store API".

Styling was doine using Charka-UI. Althought the project is not as lightweight as some, the project will always be small enough that it won't make a noticable performance difference. Chakra is a React UI component library that is great for quickly creating complex components like modals, menus, alerts, toasts, and drawers. 

## Roadmap
After deployment, the project will be maintained and updated as needed. Down the road, additional features could be implemented:

-additional product categories  
-implementing stripe or square for payments  
-sorting and searching of products  
-useContext or redux for state management  
-100% test coverage  
