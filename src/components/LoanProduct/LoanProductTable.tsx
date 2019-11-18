import * as React from 'react';
import { observer } from 'mobx-react';
import { ILoanProductProps } from './LoanProduct';

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