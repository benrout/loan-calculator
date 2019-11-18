import { observable, action } from 'mobx';
import axios from 'axios';

export interface ICalculatorConfig {
    loanAmount: number;
    loanDuration: number;
}

export interface ICalculatorModel {
    loanAmount: number;
    loanDuration: number;
    productRestrictions;
    loadProductRestrictions(): Promise<void>;
    handleInputChange(e: React.FormEvent<HTMLInputElement>, field: string): void;
}

export class CalculatorModel implements ICalculatorModel {
    @observable loanAmount: number;
    @observable loanDuration: number;
    @observable.ref productRestrictions = {};

    constructor(cfg?: ICalculatorConfig) {
        this.loanAmount = cfg && cfg.loanAmount || 10000;
        this.loanDuration = cfg && cfg.loanDuration || 4;
    };

    @action handleInputChange = (e: React.FormEvent<HTMLInputElement>, field: string) => {
        this[field] = e.currentTarget.valueAsNumber;
    };

    @action loadProductRestrictions = async () => {
        try {
            const response = await axios.get('http://www.mocky.io/v2/5d4aa9e93300006f000f5ea9');
            if (response.status === 200 && response.data) {
                this.productRestrictions = response.data;
            }
        } catch (error) {
            console.error(error);
        } finally {
        }
    }
}