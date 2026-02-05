const nomeProduto = document.getElementById('nomeProduto');
const quantidadeProduto = document.getElementById('quantidadeProduto');
const categoriaProduto = document.getElementById('categoriaProduto');
const valorProduto = document.getElementById('precoProduto');
const bntAdicionar = document.getElementById('btnProduto');
const bodyTable = document.getElementById('corpoTabelas');
const totalValor = document.getElementById('totalValor');

const produtos = {
    nome: [],
    quantidade: [],
    categoria: [],
    valor: []
}

const deleteProduct = (index) => {
    produtos.nome.splice(index, 1);
    produtos.quantidade.splice(index, 1);
    produtos.categoria.splice(index, 1);
    produtos.valor.splice(index, 1);
    renderTable();
    atualizarTotal();

}

const renderTable = () => {
    bodyTable.innerHTML = '';
    for (let i = 0; i < produtos.nome.length; i++) {
        if(produtos.quantidade[i] < 5) {
            bodyTable.innerHTML += `
            <tr style="background-color: #ff6961;">
                <td>${produtos.nome[i]}</td>
                <td>${produtos.categoria[i]}</td>
                <td>${produtos.quantidade[i]}</td>
                <td>R$ ${produtos.valor[i]}</td>
                <td><button onclick="deleteProduct(${i})">X</button></td>
            </tr>
            `;
            } 
        else {
            bodyTable.innerHTML += `
            <tr>
                <td>${produtos.nome[i]}</td>
                <td>${produtos.categoria[i]}</td>
                <td>${produtos.quantidade[i]}</td>
                <td>R$ ${produtos.valor[i]}</td>
                <td><button onclick="deleteProduct(${i})">X</button></td>
            </tr>
            `;
        }
    }
}

const atualizarTotal = () => {
    const somaTotal = produtos.valor.reduce((acc, curr, index) => {
        return acc + (parseFloat(curr) * parseInt(produtos.quantidade[index]));
    }, 0);

    totalValor.innerText = `Valor Total em Estoque: R$ ${somaTotal.toFixed(2)}`;
}

const addProduct = () => {
    if (nomeProduto.value === "" || valorProduto.value === "") {
        alert("Por favor, preencha pelo menos o nome e o preço.");
        return;
    }

    produtos.nome.push(nomeProduto.value);
    produtos.quantidade.push(quantidadeProduto.value);
    produtos.categoria.push(categoriaProduto.value);
    produtos.valor.push(valorProduto.value);

    renderTable();

    atualizarTotal();

    nomeProduto.value = '';
    quantidadeProduto.value = '';
    categoriaProduto.value = '';
    valorProduto.value = '';
};


bntAdicionar.addEventListener('click', addProduct);