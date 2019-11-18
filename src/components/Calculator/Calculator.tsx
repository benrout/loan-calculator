import * as React from 'react';
import { observer } from 'mobx-react';
import { LoanProduct } from '../LoanProduct/LoanProduct';
import { ICalculatorModel } from './CalculatorModel';
import { LoanProductModel, ILoanProductModel } from '../LoanProduct/LoanProductModel';

export interface ICalculatorProps {
    model: ICalculatorModel;
}

@observer
export class Calculator extends React.Component<ICalculatorProps> {
    calculatorModel: ICalculatorModel;
    rcfModel: ILoanProductModel;
    blModel: ILoanProductModel;

    constructor(props) {
        super(props);
        this.calculatorModel = this.props.model;

        this.initProductModels();
    }

    initProductModels = () => {
        this.rcfModel = new LoanProductModel({
            id: 'RCF',
            name: 'Revolving Credit Facility',
            calculatorModel: this.calculatorModel
        });

        this.blModel = new LoanProductModel({
            id: 'BL',
            name: 'Business Loan',
            calculatorModel: this.calculatorModel,
            upfrontFees: 10
        });
    }

    componentDidMount() {
        this.calculatorModel.loadProductRestrictions().then(() => {
            this.rcfModel.setProductRestrictions('revolving_credit_facility');
            this.blModel.setProductRestrictions('business_loan');
        });
    }

    render() {
        const { model } = this.props;
        const { loanAmount, loanDuration, handleInputChange, isLoading, error } = model;

        return (
            <div className="calculator">
                <div className="container">
                    <h1 className="calculator__heading">Your loan</h1>

                    <div className="calculator-field">
                        <div className="d-flex">
                            <label className="calculator-field__label" htmlFor="loanAmount">Amount requested</label>
                            <input className="calculator-field__input" type="number" name="loanAmount" id="loanAmount" placeholder="10000" min="0" value={loanAmount} onChange={e => handleInputChange(e, 'loanAmount')} />
                            <div>(in £)</div>
                        </div>
                        {!loanAmount ? <div className="calculator-field__error">Please enter an amount to borrow</div> : null}
                    </div>

                    <div className="calculator-field">
                        <div className="d-flex">
                            <label className="calculator-field__label" htmlFor="loanDuration">Duration</label>
                            <input className="calculator-field__input" type="number" name="loanDuration" id="loanDuration" placeholder="4" min="0" value={loanDuration} onChange={e => handleInputChange(e, 'loanDuration')} />
                            <div>(in months)</div>
                        </div>
                        {!loanDuration ? <div className="calculator-field__error">Please enter a duration</div> : null}
                    </div>

                    {isLoading ?
                        <div>Loading product applicability data...</div>
                        :
                        <div className="row">
                            <div className="col-lg-6">
                                <LoanProduct model={this.rcfModel} />
                            </div>
                            <div className="col-lg-6">
                                <LoanProduct model={this.blModel} />
                            </div>
                        </div>
                    }

                    {error ? <div>*{error}</div> : null}
                </div>

            </div>
        );
    }
}