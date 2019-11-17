# iwoca-calculator

## Technical Decisions
* React - Used to provide a fast, responsive user experience
* Mobx - for state management of React components
* TypeScript - to add typing to components and models resulting in reduced bugs
* Bootstrap - Used for grid layout, responsiveness and basic styling
* Axios  - to provide cross-browser compatability (including IE11) for fetching restriction data from endpoint.
* Fusebox - to compile SCSS and JS

## Improvements (if there was more time)
* Bootstrap - Instead of using a CDN I would download the source files...
* Restrict user input to 2 decimal places for amount requested
* Improve responsiveness of tables at mobile screen size
* Add error handling if product restriction data cannot be retreived from endpoint
* Improve accessiblity by adding aria-labels