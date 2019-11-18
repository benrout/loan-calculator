// Import packages
import * as React from 'react';
import * as ReactDOM from 'react-dom';

// Import components
import { Calculator } from './components/Calculator/Calculator';
import { ICalculatorModel, CalculatorModel } from './components/Calculator/CalculatorModel';

// Import styles
import "./styles/main.scss";

export class App extends React.Component {
    calculatorModel: ICalculatorModel;

    constructor(props) {
        super(props);

        this.calculatorModel = new CalculatorModel();
    }


    render() {
        return <Calculator model={this.calculatorModel} />
    }
}

ReactDOM.render(<App />, document.getElementById('app'));