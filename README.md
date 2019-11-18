# loan-calculator

## Startup
* Clone the repo
* In your console, run ```cd loan-calculator```
* In the console, run ```npm install```
* In the console, run ```npm start```
* 
* Go to [http://localhost:4444](http://localhost:4444)

## Technical Decisions
* React - Used to provide a highly performant application with a responsive user experience
* Mobx - for state management of React components
* TypeScript - to add typing to components and models resulting in reduced bugs
* Bootstrap - Used for grid layout, responsiveness and basic styling
* Axios  - to provide cross-browser compatability (including IE11) for fetching product data from endpoint.
* Fusebox - to compile SCSS and JS (down to ES5 for support with older browsers)

## Improvements (if there was more time)
* Extract input fields into their own components
* Extract repayment rows into their own components
* Restrict user input for loan amount requested to 2 decimal places
* Improve responsiveness of tables at mobile screen size
* Improve accessiblity for screenreaders
* Improve styling as currently very basic
* Download source files and only what is needed from Bootstrap e.g. grid, layout. Alternatively a more lightweight library could be used
* Minify code for production for improved performance
* Extract formatCurrency method from LoanProductModel to utility functions
* Handle error in console when Amount Requested / Loan Duration is blank