import currencyToNumber from './currencyToNumber';
import stringToDate from './stringToDate';

export default function normalizeData(transaction: PaymentAPI): Payment {
    return {
        name: transaction.Nome,
        id: transaction.ID,
        email: transaction.Email,
        date: stringToDate(transaction.Data),
        status: transaction.Status,
        newClient: Boolean(transaction['Cliente Novo']),
        paymentType: transaction['Forma de Pagamento'],
        currency: transaction['Valor (R$)'],
        value: currencyToNumber(transaction['Valor (R$)']),
    };
}
