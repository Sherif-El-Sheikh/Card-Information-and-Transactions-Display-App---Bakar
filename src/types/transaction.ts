export interface Transaction {
    amount: number;
    currency: string;
    cardholder: string;
    status: TransactionStatus;
    created: string;
}

export type TransactionStatus = 
    | 'Succeeded'
    | 'Pending'
    | 'Canceled'
    | 'Failed'
    | 'Refunded'
    | 'Disputed';