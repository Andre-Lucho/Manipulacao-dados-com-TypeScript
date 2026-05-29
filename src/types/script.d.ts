type PaymentType = 'Boleto' | 'Cartão de Crédito';
type PaymentStatus =
    | 'Paga'
    | 'Aguardando pagamento'
    | 'Recusada pela operadora de cartão'
    | 'Estornada';

interface PaymentAPI {
    Nome: string;
    ID: number;
    Email: string;
    Data: string;
    Status: PaymentStatus;
    ['Cliente Novo']: number;
    ['Forma de Pagamento']: PaymentType;
    ['Valor (R$)']: string;
    // ['chave'] = Propriedades Computadas ou String Literals --> valor da chave = texto entre aspas.
}

interface Payment {
    name: string;
    id: number;
    email: string;
    date: Date;
    status: PaymentStatus;
    newClient: string;
    paymentType: PaymentType;
    currency: string;
    value: number | null;
}
