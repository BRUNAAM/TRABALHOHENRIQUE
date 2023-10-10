const apiUrl = 'http://reserva.laboratorio.app.br:10100/api/products';
let products = [];

const productForm = document.getElementById('productForm');
productForm.addEventListener('submit', function(event) {
    event.preventDefault();
    addProduct();
});

function addProduct() {
    const produtoId = document.getElementById('produtoId').value;
    const nomeProduto = document.getElementById('nomeProduto').value;
    const codBarras = document.getElementById('codBarras').value;
    const marca = document.getElementById('marca').value;
    const modelo = document.getElementById('modelo').value;
    const valor = parseFloat(document.getElementById('valor').value);

    if (produtoId && nomeProduto && codBarras && marca && modelo && valor && !isNaN(valor)) {
        const product = {
            id: generateId(),
            nome: nomeProduto,
            codBarras: codBarras,
            marca: marca,
            modelo: modelo,
            valor: valor
        };
        products.push(product);
        displayProducts();
        resetForm();
    } else {
        alert('Preencha todos os campos corretamente.');
    }
}

function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

function displayProducts() {
    const productListElement = document.getElementById('productList');
    productListElement.innerHTML = '';
    products.forEach((product, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            ID: ${product.id}<br>
            Nome: ${product.nome}<br>
            Código de Barras: ${product.codBarras}<br>
            Marca: ${product.marca}<br>
            Modelo: ${product.modelo}<br>
            Valor: R$ ${product.valor.toFixed(2)}<br>
            <button onclick="editProduct(${index})">Editar</button>
            <button onclick="deleteProduct(${index})">Excluir</button>
            <hr>
        `;
        productListElement.appendChild(listItem);
    });
}

function editProduct(index) {
    const product = products[index];
    const newnomeProduto = prompt('Digite o novo nome para o produto:', product.nome);
    const newcodBarras = prompt('Digite o novo código de barras para o produto:', product.codBarras);
    const newmarca = prompt('Digite a nova marca para o produto:', product.marca);
    const newmodelo = prompt('Digite o novo modelo para o produto:', product.modelo);
    const newvalor = parseFloat(prompt('Digite o novo valor para o produto:', product.valor));

    if (newnomeProduto && newcodBarras && newmarca && newmodelo && !isNaN(newvalor)) {
        product.nome = newnomeProduto;
        product.codBarras = newcodBarras;
        product.marca = newmarca;
        product.modelo = newmodelo;
        product.valor = newvalor;
        displayProducts();
    } else {
        alert('Preencha todos os campos corretamente.');
    }
}

function deleteProduct(index) {
    products.splice(index, 1);
    displayProducts();
}

function resetForm() {
    productForm.reset();
}
