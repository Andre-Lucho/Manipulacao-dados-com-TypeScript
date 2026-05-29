import currencyToNumber from './currencyToNumber';
import stringToDate from './stringToDate';

export default function normalizeData(transaction: PaymentAPI): Payment {
    return {
        name: transaction.Nome,
        id: transaction.ID,
        email: transaction.Email,
        date: stringToDate(transaction.Data),
        status: transaction.Status,
        newClient: String(transaction['Cliente Novo'] === 1 ? 'sim' : '--'),
        paymentType: transaction['Forma de Pagamento'],
        currency: transaction['Valor (R$)'],
        value: currencyToNumber(transaction['Valor (R$)']),
    };
}
