import * as React from 'react';
import { observer } from 'mobx-react';
import { ILoanProductModel } from './LoanProductModel';
import '../../styles/LoanProduct.scss';

export interface ILoanProductProps {
    model: ILoanProductModel;
}

@observer
export class LoanProduct extends React.Component<ILoanProductProps> {
    render() {
        const { model } = this.props;
        const { id, name, interestRate, calculatorModel, amountMin, amountMax, durationMin, durationMax } = model;
        const { loanAmount, loanDuration } = calculatorModel;

        return (
            loanAmount && loanDuration ?

                loanAmount >= amountMin && loanAmount <= amountMax && loanDuration >= durationMin && loanDuration <= durationMax ?

                    <div className="loan-product shadow">

                        <div className="loan-product__field d-flex justify-content-center align-items-center">
                            <label className="loan-product__field-label" htmlFor={"interestRate" + id}>Interest rate</label>
                            <input className="loan-product__field-input" type="number" name={"interestRate" + id} id={"interestRate" + id} value={interestRate} onChange={model.handleInterestChange} />
                            <div>(in %)</div>
                        </div>

                        {interestRate ?
                            <LoanProductTable model={model} />
                            :
                            <div className="loan-product__field-error">Please enter an interest rate</div>
                        }

                        <h5 className="loan-product--title d-flex justify-content-center">{name}</h5>
                    </div>
                    :
                    <div>Unfortunately our {name} is only available for durations between <strong>{durationMin}-{durationMax} months</strong> and for amounts between <strong>£{amountMin}-{amountMax}</strong></div>
                : null
        )
    }
}

@observer
export class LoanProductTable extends React.Component<ILoanProductProps> {
    render() {
        const { model } = this.props;
        const { totalInterest } = model;
        const { loanAmount } = model.calculatorModel;

        return (
            <table className="loan-product__table">
                <thead>
                    <tr>
                        <th>Repayment date</th>
                        <th>Principal</th>
                        <th>Interest</th>
                        <th>Total repayment</th>
                    </tr>
                </thead>
                <tbody>
                    {model.repayments.map(repayment => {
                        const { date, principal, interest, total } = repayment;

                        return (
                            <tr key={date.toLocaleDateString()}>
                                <td>{date.toLocaleDateString()}</td>
                                <td>{model.formatCurrency(principal)}</td>
                                <td>{model.formatCurrency(interest)}</td>
                                <td>{model.formatCurrency(total)}</td>
                            </tr>
                        )
                    })}
                    <tr>
                        <td>Total</td>
                        <td>{model.formatCurrency(loanAmount)}</td>
                        <td>{model.formatCurrency(totalInterest)}</td>
                        <td>{model.formatCurrency(loanAmount + totalInterest)}</td>
                    </tr>
                </tbody>
            </table>
        )
    }
}