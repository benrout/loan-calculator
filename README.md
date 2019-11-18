# iwoca-calculator

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
* Add error handling if product restriction data cannot be retreived from endpoint. Alternatively inform the user that applicability for each product will need to be confirmed
* Improve responsiveness of tables at mobile screen size
* Improve accessiblity for screenreaders
* Improve styling as currently very basic
* Download source files and only what is needed from Bootstrap e.g. grid, layout. Alternatively a more lightweight library could be used
* Minify code for production for improved performance 
* Fix Websocket connection error when deployed