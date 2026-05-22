import { fetchData } from './fetchData';
import { url } from './global';

async function handleFetch(url: string) {
    const data = await fetchData<PaymentAPI[]>(url);

    let transactions;
    // if (!data) return; ou
    if (data && Array.isArray(data)) {
        // type Guard com retorno null ==  p evitar erro de .map() --> quebra codigo | já estou fazendo acima (ln 9), escolher

        // transacoes = data.map(normalizeData); //(forma simplificada)
        console.log(data);
    }
}

handleFetch(url);
