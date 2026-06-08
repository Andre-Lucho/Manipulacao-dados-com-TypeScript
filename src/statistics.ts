import countBy from './countBy';

type PaymentValue = Payment & { value: number };

function filterValue(trans: Payment): trans is PaymentValue {
    return trans.value !== null;
}

export default class Statistics {
    private transactions: Payment[];
    public total: number;
    public paymentType: CountList;
    public status: CountList;

    constructor(transactions: Payment[]) {
        this.transactions = transactions;
        this.total = this.setTotal();
        this.paymentType = this.setPaymentType();
        this.status = this.setStatus();
    }

    private setTotal() {
        const filtered = this.transactions
            .filter((item) => filterValue(item))
            .reduce((acc, item) => {
                return acc + item.value;
            }, 0);
        return filtered;
    }

    private setPaymentType(): CountList {
        return countBy(this.transactions.map(({ paymentType }) => paymentType));
    }

    private setStatus(): CountList {
        return countBy(this.transactions.map(({ status }) => status));
    }
}
