// Função responsavel por buscar todos os pedidos na api e exibir na tela
function listarPedidos() {
    // busca o elemento HTML (lista), onde a listagem de pedidos será exibida
    const lista = document.getElementById("lista");
    // conexão suave entre a interface e a conexão da API
    lista.innerHTML = "Carregando pedidos...";
    /// faz uma requisição GET para API com a url publicada
    fetch("https://nodejs-api-wk46.onrender.com/pedidos")
    // convertendo a resposta da API para JSON
    .then(res => res.json())
    // trabalhando o resultado da API
    .then(resultado => {
        // limpando a lista para preencher com os pedidos
        lista.innerHTML = "";
        // percorrendo o array de pedidos recebido da API (array de pedidos)
        resultado.dados.forEach(pedido => {
            // cria um item de linha para cada pedido 
            const item = document.createElement("li");
            // define como o texto será exibido na tela
            item.textContent = `${pedido.id} - ${pedido.cliente} | ${pedido.produto} | ${pedido.status}`;
            // adiciona o item dentro da lista
            lista.appendChild(item);
        });
    })
    .catch(() => {
        lista.innerHTML = "Erro ao carregar os pedidos"
    });
};

// Função responsável pela criação de novos pedidos
function cadastrarPedido() {
    const cliente = document.getElementById("cliente").value;
    const produto = document.getElementById("produto").value;
    // Envia uma requisição POST para API
    fetch("https://nodejs-api-wk46.onrender.com/pedidos", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        // converte os dados em JSON, para enviar para o BODY
        body: JSON.stringify({
            id: Date.now(), // Gerar um ID único 
            cliente: cliente,
            produto: produto,
            status: 'Pendente'
        })
    })
    // Convertendo a resposta da API para JSON
    .then(res => res.json())
    .then(() => {
        // Limpa os inputs após o envio docadastro
        document.getElementById("cliente").value = "";
        document.getElementById("produto").value = "";
        // Atualiza a lista de pedidos após o cadastro
        listarPedidos(); 
    }) 
    .catch(() => {
        alert("Erro ao cadastrar o pedido");
    });
}

// Função responsável por atualizar o status de um pedido
function atualizarStatus() {
    // Pega o ID informado e o força a ser um número
    const id = Number(document.getElementById("idAtualizar").value);
    // Pega o novo status do pedido (digitado no input)
    const status = document.getElementById("statusAtualizar").value; 

    fetch("https://nodejs-api-wk46.onrender.com/pedidos", {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        // converte os dados em JSON, para enviar para o BODY
        body: JSON.stringify({
        id: id, // Gerar um ID único 
        status: status
        })
    })
    .then(res => res.json())
    .then(() => {        // Limpa os inputs após a atualização
        document.getElementById("idAtualizar").value = "";
        document.getElementById("statusAtualizar").value = "";
        // Atualiza a lista de pedidos após a atualização
        listarPedidos(); 
    })
    .catch(() => {
        alert("Erro ao atualizar o pedido");
    });
}

// Função responsável por excluir um pedido DELETE
function removerPedido() {
    // Pega o ID informado e o força a ser um número
    const id = Number(document.getElementById("idRemover").value);

    fetch("https://nodejs-api-wk46.onrender.com/pedidos",{
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id // Gerar um ID único 
        })
    })
    .then(res => res.json())
    // Limpa o input após a exclusão
    .then(() => {        
        document.getElementById("idRemover").value = "";
    })
    .catch(() => {
        alert("Erro ao remover o pedido");
    });
}
// Chama a função para listar os pedidos assim que a página for carregada
listarPedidos();