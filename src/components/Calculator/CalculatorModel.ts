import { observable, action } from 'mobx';
const axios = require('axios');

export interface ICalculatorConfig {
    loanAmount: number;
    loanDuration: number;
}

export interface ICalculatorModel {
    loanAmount: number;
    loanDuration: number;
    isLoading: boolean;
    productRestrictions;
    loadProductRestrictions(): Promise<void>;
    handleLoanAmountChange(e: React.FormEvent<HTMLInputElement>): void;
    handleLoanDurationChange(e: React.FormEvent<HTMLInputElement>): void;
}

export class CalculatorModel implements ICalculatorModel {
    @observable loanAmount: number;
    @observable loanDuration: number;
    @observable isLoading: boolean;
    @observable.ref productRestrictions = {};
    @observable errorMessage: string = '';

    constructor(cfg: ICalculatorConfig) {
        this.loanAmount = cfg.loanAmount || 10000;
        this.loanDuration = cfg.loanDuration || 4;
    };

    @action handleLoanAmountChange = (e: React.FormEvent<HTMLInputElement>) => {
        this.loanAmount = e.currentTarget.valueAsNumber;
    }

    @action handleLoanDurationChange = (e: React.FormEvent<HTMLInputElement>) => {
        this.loanDuration = e.currentTarget.valueAsNumber;
    }

    @action loadProductRestrictions = async () => {
        this.isLoading = true;
        try {
            const response = await axios.get('http://www.mocky.io/v2/5d4aa9e93300006f000f5ea9');
            if (response.status === 200 && response.data && response.data) {
                this.productRestrictions = response.data;
            }
        } catch (error) {
            console.error(error);
        } finally {
            this.isLoading = false;
        }
    }
}