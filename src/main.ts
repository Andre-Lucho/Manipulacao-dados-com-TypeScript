import { fetchData } from './fetchData';
import { url } from './global';
import normalizeData from './normalizeData';
import Statistics from './Statistics';

async function handleFetch(url: string) {
    const data = await fetchData<PaymentAPI[]>(url);

    let transactions;
    // if (!data) return; ou
    if (data && Array.isArray(data)) {
        transactions = data.map((item) => normalizeData(item));
        populatingTable(transactions);
        populatingStatistics(transactions);
    }
}

function populatingList(list: CountList, elementId: string): void {
    const element = document.querySelector<HTMLElement>(`#${elementId}`);
    if (list && element) {
        Object.keys(list).forEach((key) => {
            element.innerHTML += `<p>${key}: ${list[key]}</p>`;
        });
    }
}

function populatingStatistics(transactions: Payment[]): void {
    const data = new Statistics(transactions);
    const totalElement = document.querySelector<HTMLElement>('#total span');

    if (data) {
        populatingList(data.paymentType, `payment-type`);
        populatingList(data.status, `status`);

        if (!totalElement) return;
        totalElement.innerText += data.total.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
    }
}

function populatingTable(transactions: Payment[]): void {
    const table = document.querySelector('#transactions tbody');
    if (!table) return;

    transactions.forEach((item) => {
        table.innerHTML += `
        <tr>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.newClient}</td>
            <td>${item.email}</td>
            <td>${item.date.getDate()}/${item.date.getMonth()}/${item.date.getFullYear()}</td>
            <td>R$ ${item.currency}</td>
            <td>${item.paymentType}</td>
            <td>${item.status}</td>
        </tr>
    `;
    });
}

handleFetch(url);
