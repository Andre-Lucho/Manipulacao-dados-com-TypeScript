/*Inicialmente, dataFecth retorna uma Promise de any - usar interface*/
export async function fetchData<T>(url: string): Promise<T | null> {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Erro: ${response.status}`);
        const json = await response.json();
        return json;
    } catch (error) {
        if (error instanceof Error)
            console.error(`Retorno fetchData: ${error.message}`);
        return null;
        // importante: caso vazio === undefined --> para o script
        // com null, posso fazer um Type guard - ln 38-main
    }
}
