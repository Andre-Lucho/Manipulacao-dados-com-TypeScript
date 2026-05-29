type PaymentValue = Payment & { value: number };

function filterValue(trans: Payment): trans is PaymentValue {
    return trans.value !== null;
}

export default class Statistics {
    private transactions: Payment[];
    public total: number;

    constructor(transactions: Payment[]) {
        this.transactions = transactions;
        this.total = this.sumTotal();
    }

    private sumTotal() {
        const filtered = this.transactions
            .filter((item) => filterValue(item))
            .reduce((acc, item) => {
                return acc + item.value;
            }, 0);
        return filtered;
    }
}
