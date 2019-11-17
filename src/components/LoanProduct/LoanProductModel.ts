import { ICalculatorModel } from "../Calculator/CalculatorModel";
import { action, observable, computed } from "mobx";
import { IRepayment } from "./IRepayment";

export interface ILoanProductConfig {
    id: string;
    name: string;
    calculatorModel: ICalculatorModel;
    upfrontFees?: number;
}

export interface ILoanProductModel {
    id: string;
    name: string;
    calculatorModel: ICalculatorModel;
    interestRate: number;
    totalInterest: number;
    repayments: IRepayment[];
    amountMin: number;
    amountMax: number;
    durationMin: number;
    durationMax: number;
    handleInterestChange(e: React.FormEvent<HTMLInputElement>): void;
    formatCurrency(num: number): string;
}

export class LoanProductModel implements ILoanProductModel {
    id: string;
    name: string;
    calculatorModel: ICalculatorModel;
    upfrontFees: number;
    @observable amountMin: number = 0;
    @observable amountMax: number = Infinity;
    @observable durationMin: number = 0;
    @observable durationMax: number = Infinity;
    @observable interestRate: number = 3;

    constructor(cfg: ILoanProductConfig) {
        this.id = cfg.id;
        this.name = cfg.name;
        this.calculatorModel = cfg.calculatorModel;
        this.upfrontFees = cfg.upfrontFees || 0;
    }

    @action handleInterestChange = (e: React.FormEvent<HTMLInputElement>) => {
        this.interestRate = e.currentTarget.valueAsNumber
    }

    @computed get totalInterest() {
        let total = 0;

        for (let i = 0; i < this.repayments.length; i++) {
            total += this.repayments[i].interest
        };

        return total;
    }

    @computed get repayments() {
        const repayments: IRepayment[] = [];
        const { loanAmount, loanDuration } = this.calculatorModel;
        const today = new Date();

        for (let i = 0; i < loanDuration; i++) {
            const principal = loanAmount / loanDuration;
            const amountRemaining = loanAmount - principal * i;
            let interest = (this.interestRate / 100) * amountRemaining;

            if (i === 0) {
                interest += (loanAmount * this.upfrontFees / 100);
            }

            const repaymentDate = new Date();
            repaymentDate.setMonth(today.getMonth() + i + 1);

            repayments.push({
                date: repaymentDate,
                principal,
                interest,
                total: principal + interest,
                amountRemaining
            });
        }

        return repayments;
    }

    formatCurrency = (num: number, decimal: number = 0): string => {
        return '£' + Number(num).toFixed(decimal);
    };
}
