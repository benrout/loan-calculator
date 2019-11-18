import * as React from 'react';
import { observer } from 'mobx-react';
import { LoanProductTable } from './LoanProductTable';
import { ILoanProductModel } from './LoanProductModel';

export interface ILoanProductProps {
    model: ILoanProductModel;
}

@observer
export class LoanProduct extends React.Component<ILoanProductProps> {
    render() {
        const { model } = this.props;
        const { id, name, interestRate, calculatorModel, amountMin, amountMax, durationMin, durationMax, isAvailable } = model;
        const { loanAmount, loanDuration } = calculatorModel;

        return (
            loanAmount && loanDuration ?
                isAvailable ?
                    <div className="loan-product shadow">
                        <div className="loan-product__field d-flex justify-content-center align-items-center">
                            <label className="loan-product__field-label" htmlFor={"interestRate-" + id}>Interest rate</label>
                            <input className="loan-product__field-input" type="number" name={"interestRate-" + id} id={"interestRate-" + id} value={interestRate} onChange={model.handleInterestChange} />
                            <div>(in %)</div>
                        </div>

                        {interestRate ? <LoanProductTable model={model} /> : <div className="loan-product__field-error">Please enter an interest rate</div>}

                        <h5 className="loan-product--title d-flex justify-content-center">{name}</h5>
                    </div>
                    :
                    <div>Unfortunately our {name} is only available for amounts between <strong>£{amountMin}-{amountMax}</strong> and for durations between <strong>{durationMin}-{durationMax} months</strong>.</div>
                : null
        )
    }
}