/**
 * Recebe tipo string "1.000,00" e retorna number 1000.00
 */
export default function currencyToNumber(currency: String): number | null {
    const number = Number(currency.replaceAll('.', '').replace(',', '.'));

    return isNaN(number) ? null : number;
}
