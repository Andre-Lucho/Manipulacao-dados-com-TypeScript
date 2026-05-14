import { fetchData } from './fetchData';

const url = 'https://api.origamid.dev/json/transacoes.json';

type PaymentType = 'Boleto' | 'Cartão de Crédito';
type PaymentStatus =
    | 'Paga'
    | 'Aguardando pagamento'
    | 'Recusada pela operadora de cartão'
    | 'Estornada';

interface PaymentReturn {
    Nome: string;
    ID: number;
    Email: string;
    Data: string;
    Status: PaymentStatus;
    ['Cliente Novo']: number;
    ['Forma de Pagamento']: PaymentType;
    ['Valor (R$)']: string;
}

interface DataNormalizado {
    nome: string;
    id: number;
    email: string;
    data: string;
    clienteNovo: number;
    formasPagamento: string;
    status: string;
    valor: string;
}

async function handleFetch(url: string) {
    const data = await fetchData<PaymentReturn[]>(url);

    if (data && Array.isArray(data)) {
        // type Guard com retorno null ==  p evitar erro de .map() --> quebra codigo
        const dados = data.map((item) => {
            return item.Status;
        });
        console.log(dados);
    }
}

handleFetch(url);

/*
return {
  Nome: item['Valor (R$)'],
  id: item.ID,
  email: item.Email,
  data: item.Data,
  clienteNovo: item['Cliente Novo'],
  formasPagamento: item['Forma de Pagamento'],
  status: item.Status,
  valor: item['Valor (R$)'],
};
*/
