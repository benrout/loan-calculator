import * as React from 'react';
import { observer } from 'mobx-react';

import { LoanProduct } from '../LoanProduct/LoanProduct';
import { ICalculatorModel, CalculatorModel } from './CalculatorModel';
import { LoanProductModel, ILoanProductModel } from '../LoanProduct/LoanProductModel';

import '../../styles/Calculator.scss';

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

        this.calculatorModel.loadProductRestrictions().then(() => {
            this.rcfModel.amountMin = this.calculatorModel.productRestrictions['revolving_credit_facility']['amount_min'];
            this.rcfModel.amountMax = this.calculatorModel.productRestrictions['revolving_credit_facility']['amount_max'];
            this.rcfModel.durationMin = this.calculatorModel.productRestrictions['revolving_credit_facility']['duration_min'];
            this.rcfModel.durationMax = this.calculatorModel.productRestrictions['revolving_credit_facility']['duration_max'];

            this.blModel.amountMin = this.calculatorModel.productRestrictions['business_loan']['amount_min'];
            this.blModel.amountMax = this.calculatorModel.productRestrictions['business_loan']['amount_max'];
            this.blModel.durationMin = this.calculatorModel.productRestrictions['business_loan']['duration_min'];
            this.blModel.durationMax = this.calculatorModel.productRestrictions['business_loan']['duration_max'];
        });
    }

    render() {
        const { model } = this.props;
        const { loanAmount, loanDuration, isLoading } = model;

        return (
            <div className="calculator">
                <div className="container">
                    <h1 className="calculator__heading">Your loan</h1>

                    <div className="calculator-field">
                        <div className="d-flex">
                            <label className="calculator-field__label" htmlFor="loanAmount">Amount requested</label>
                            <input className="calculator-field__input" type="number" name="loanAmount" id="loanAmount" placeholder="10000" min="0" value={loanAmount} onChange={model.handleLoanAmountChange} />
                            <div>(in £)</div>
                        </div>
                        {!loanAmount ?
                            <div className="calculator-field__error">Please enter a value between £1 and £1,000,000</div>
                            : null}
                    </div>

                    <div className="calculator-field">
                        <div className="d-flex">
                            <label className="calculator-field__label" htmlFor="loanDuration">Duration</label>
                            <input className="calculator-field__input" type="number" name="loanDuration" id="loanDuration" placeholder="4" min="0" value={loanDuration} onChange={model.handleLoanDurationChange} />
                            <div>(in months)</div>
                        </div>
                        {!loanDuration ?
                            <div className="calculator-field__error">Please enter a value between 1 and 24 months</div>
                            : null}
                    </div>

                    {isLoading ?
                        <div>Please wait one moment while we load your available products</div>
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
                </div>

            </div>
        );
    }
}