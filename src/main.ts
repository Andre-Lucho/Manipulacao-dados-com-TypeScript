import { fetchData } from './fetchData';
import { url } from './global';
import normalizeData from './normalizeData';

async function handleFetch(url: string) {
    const data = await fetchData<PaymentAPI[]>(url);

    let transactions;
    // if (!data) return; ou
    if (data && Array.isArray(data)) {
        // type Guard com retorno null ==  p evitar erro de .map() --> quebra codigo | já estou fazendo acima (ln 9), escolher

        transactions = data.map((item) => normalizeData(item));
        // transacoes = data.map(normalizeData); //(forma simplificada)
        populatingTable(transactions);
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
