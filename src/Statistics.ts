import countBy from './countBy';

type PaymentValue = Payment & { value: number };

function filterValue(trans: Payment): trans is PaymentValue {
    return trans.value !== null;
}

export default class Statistics {
    private transactions: Payment[];
    private total: number;
    private paymentType: CountList;
    private status: CountList;
    private week: {};
    private bestDay: [string, number];

    constructor(transactions: Payment[]) {
        this.transactions = transactions;
        this.total = this.setTotal();
        this.paymentType = this.setPaymentType();
        this.status = this.setStatus();
        this.week = this.setWeek();
        this.bestDay = this.setBestDay();
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

    private setWeek() {
        const week = {
            sunday: 0,
            monday: 0,
            tuesday: 0,
            wednesday: 0,
            thursday: 0,
            friday: 0,
            saturday: 0,
        };

        const trans = this.transactions.map((transation) => {
            const day = transation.date.getDay();

            switch (day) {
                case 0:
                    week.sunday += 1;
                    break;
                case 1:
                    week.monday += 1;
                    break;
                case 2:
                    week.tuesday += 1;
                    break;
                case 3:
                    week.wednesday += 1;
                    break;
                case 4:
                    week.thursday += 1;
                    break;
                case 5:
                    week.friday += 1;
                    break;
                case 6:
                    week.saturday += 1;
                    break;
                default:
                    break;
            }
        });

        return week;
    }

    private setBestDay() {
        return Object.entries(this.week).sort((a, b) => {
            return b[1] - a[1];
        })[0];
    }
}
