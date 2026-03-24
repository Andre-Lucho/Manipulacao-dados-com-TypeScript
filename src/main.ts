interface Data {
  nome: string;
  id: number;
  email: string;
  data: string;
  clienteNovo: number;
  formasPagamento: string;
  status: string;
  valor: string;
}

const dataFetch = async () => {
  const response = await fetch('https://api.origamid.dev/json/transacoes.json');
  const data = await response.json();
  handleFetch(data);
};

dataFetch();

const handleFetch = (data: unknown) => {
  if (data && Array.isArray(data)) {
    const dados = data.map((item): Data => {
      return {
        nome: item.Nome,
        id: item.ID,
        email: item.Email,
        data: item.Data,
        clienteNovo: item['Cliente Novo'],
        formasPagamento: item['Forma de Pagamento'],
        status: item.Status,
        valor: item['Valor (R$)'],
      };
    });
    console.log(dados[0]);
  }
};
