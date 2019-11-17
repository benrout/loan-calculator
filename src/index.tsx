// Import packages
import * as React from 'react';
import * as ReactDOM from 'react-dom';

// Import components
import { Calculator } from './components/Calculator/Calculator';
import { ICalculatorConfig, ICalculatorModel, CalculatorModel } from './components/Calculator/CalculatorModel';

// Import styles
import "./styles/main.scss";

export class App extends React.Component {
    calculatorModel: ICalculatorModel;

    constructor(props) {
        super(props);

        const calculatorConfig: ICalculatorConfig = {
            loanAmount: 10000,
            loanDuration: 4
        };

        this.calculatorModel = new CalculatorModel(calculatorConfig);
    }


    render() {
        return (
            <div>
                <Calculator model={this.calculatorModel} />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));