# iwoca-calculator

## Technical Decisions
* React - Used to provide a highly performant application with a responsive user experience
* Mobx - for state management of React components
* TypeScript - to add typing to components and models resulting in reduced bugs
* Bootstrap - Used for grid layout, responsiveness and basic styling
* Axios  - to provide cross-browser compatability (including IE11) for fetching product data from endpoint.
* Fusebox - to compile SCSS and JS (down to ES5 for support with older browsers)

## Improvements (if there was more time)
* Bootstrap - Instead of using a CDN I would download the source files and compile only what is needed e.g. grid, layout etc. Alternatively a more lightweight library could be used
* Restrict user input for loan amount requested to 2 decimal places
* Improve responsiveness of tables at mobile screen size
* Add error handling if product restriction data cannot be retreived from endpoint
* Improve accessiblity for screenreaders
* Improve styling as currently very basic