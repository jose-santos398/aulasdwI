// Pegando os campos do HTML pelos IDs
const idInput = document.getElementById('id');
const nomeInput = document.getElementById('nome');
const emailInput = document.getElementById('email');
const messageDiv = document.getElementById('message');

// Função para lidar com operações (CRUD)
async function handleOperation(operation) {
    const id = idInput.value;
    const nome = nomeInput.value;
    const email = emailInput.value;

    if (operation !== 'POST' && !id) {
        showMessage('Informe o ID para esta operação!', 'error');
        return;
    }

    if (operation !== 'DELETE' && (!nome || !email)) {
        showMessage('Preencha nome e email!', 'error');
        return;
    }

    try {
        const baseUrl = "http://localhost:3000/student";
        const url = operation === 'POST' ? baseUrl : `${baseUrl}/${id}`;

        const response = await fetch(url, {
            method: operation,
            headers: { "Content-Type": "application/json" },
            body: operation === 'GET' ? undefined : JSON.stringify({ nome, email })
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.error || "Erro no servidor");

        switch (operation) {
            case 'GET':
                nomeInput.value = data.nome;
                emailInput.value = data.email;
                showMessage('Estudante encontrado!', 'success');
                break;
            case 'POST':
                idInput.value = data.id;
                showMessage(`Cadastrado com ID ${data.id}!`, 'success');
                break;
            case 'PUT':
                showMessage('Dados atualizados!', 'success');
                break;
            case 'DELETE':
                limparCampos();
                showMessage('Estudante apagado!', 'success');
                break;
        }
    } catch (error) {
        showMessage(`Erro: ${error.message}`, 'error');
        console.error(error);
    }
}

// Função para exibir mensagens
function showMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;
    setTimeout(() => messageDiv.textContent = '', 5000);
}

// Função que limpa os campos do formulário
function limparCampos() {
    idInput.value = '';
    nomeInput.value = '';
    emailInput.value = '';
}

// Adicionando eventos aos botões
document.getElementById('btnNovo').addEventListener('click', () => handleOperation('POST'));
document.getElementById('btnBuscar').addEventListener('click', () => handleOperation('GET'));
document.getElementById('btnAlterar').addEventListener('click', () => handleOperation('PUT'));
document.getElementById('btnApagar').addEventListener('click', () => handleOperation('DELETE'));
document.getElementById('btnLimpar').addEventListener('click', limparCampos);

// Impedindo envio do formulário com Enter
document.addEventListener('keypress', (e) => e.key === 'Enter' && e.preventDefault());