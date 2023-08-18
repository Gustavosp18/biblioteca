const addButton = document.getElementById('addButton');
const showButton = document.getElementById('showButton');
const bookList = document.getElementById('bookList');
const carousel = document.getElementById('carousel');
const imageInput = document.getElementById('imageInput');

let books = [];

addButton.addEventListener('click', () => {
    const title = prompt('Digite o título do livro:');
    const author = prompt('Digite o autor do livro:');
    const year = prompt('Digite o ano do livro:');
    
    const image = imageInput.files[0]; // Captura a imagem selecionada
    
    const book = { title, author, year, image };
    books.push(book);
    
    alert('Livro adicionado com sucesso!');
});

showButton.addEventListener('click', () => {
    if (books.length === 0) {
        bookList.innerHTML = 'Nenhum livro cadastrado.';
        carousel.innerHTML = ''; // Limpar o carrossel quando não há livros
    } else {
        let html = '<ul>';
        books.forEach((book, index) => {
            const imageTag = book.image ? `<img src="${URL.createObjectURL(book.image)}" alt="${book.title}" style="max-width: 100px;">` : '';
            html += `
                <li>
                    ${imageTag}
                    ${book.title} - ${book.author} - ${book.year}
                    <button onclick="excluirLivro(${index})">Excluir</button>
                </li>`;
        });
        html += '</ul>';
        bookList.innerHTML = html;
        criarCarrossel();
    }
});

function excluirLivro(index) {
    if (index >= 0 && index < books.length) {
        books.splice(index, 1);
        showButton.click(); // Atualizar a lista após a exclusão
    }
}

function criarCarrossel() {
    let carouselHTML = '';
    books.forEach((book) => {
        const imageTag = book.image ? `<img src="${URL.createObjectURL(book.image)}" alt="${book.title}">` : '';
        carouselHTML += `
            <div>
                ${imageTag}
                <p>${book.title}</p>
            </div>`;
    });

    carousel.innerHTML = carouselHTML;

    // Inicializar o carrossel usando a biblioteca Slick (se houver livros)
    if (books.length > 0) {
        setTimeout(() => {
            $(carousel).slick(); // Aguarde um pouco para garantir que as imagens estejam carregadas
        }, 100);
    }
}
