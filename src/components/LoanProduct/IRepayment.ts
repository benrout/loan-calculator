export interface IRepayment {
    date: Date;
    principal: number;
    interest: number;
    total: number;
    amountRemaining: number;
}