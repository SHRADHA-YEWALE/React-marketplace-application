# React-marketplace-application

### Introduction
This application provides the functionality for user to post ads to sell their goods as well as browse others users ad posts.

### How to run this application

- This application has to be run on localhost. 
- There are two folders: **frontend** (Contains code for user interface with React) and **backend** (Contains code to handle backend functionality with Node JS).
- Open the two terminals, each one in **frontend** and **backend** folder respectively.
- Run the command on both terminals: **npm install**
- Run the command on both terminals: **npm start** (This will start both frontend and backend servers).
- Go to http://localhost:3000

### Functionalities

1. **Home Page**:
   * This page component is implemented with **Class Component**.
   * It will display all the ad posts that are available.
   * There will be a search bar to search for the product items along with the **_price filter_** to filter the search criteria while searching for the product items.
   * Bootstrap grids are used to arrange the ad posts cards on the page.

2. **Result Page**:
   * This page component is implemented with **Class Component**.
   * After clicking on particular posts, it will redirect to this page to display the product details. It will also display the product images.

3. **Add Post Page**:
   * This page component is implemented with **Functional Component along with react hooks**.
   * Implemented **React context** to manage global state. (Displaying the product item details that have been added).
   * It allows users to add products by adding product details(name, description, price, address, contact).
   * Implemented uploading the product image functionality with the use of **multer**.
  
### Backend

- Handled Backend functionality with **Node js**.
- Leveraging Express server to setup the data in backend. **data.js** file contains the product data.

### Webpack
- Setup webpack configurations for module bundle.

### Babel
- Setup babel configuration to transpile the javascript files.


