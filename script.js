// Setas para navegar no carrossel
const primeiraFoto = document.querySelector('.primeira');
const preco = document.querySelector('.descricaoPrecosContainer h2');
const paragrafo = document.querySelector('.descricaoPrecosContainer p');
const descricao = [preco, paragrafo];

const precosTextos = [
    {preco: 'R$ 12.200.44', desc: '4 QUARTOS | 2 CARROS'},
    {preco: 'R$ 20.199.99', desc: '8 QUARTOS | 4 CARROS'},
    {preco: 'R$ 10.899.23', desc: '6 QUARTOS | 3 CARROS'}
];

let numero = 0;
let intervalo;

function mudarConteudo() {
    descricao.forEach(ele => ele.style.opacity = '0');

    primeiraFoto.style.marginLeft = `-${numero * 25}%`;

    preco.textContent = precosTextos[numero].preco;
    descricao.textContent = precosTextos[numero].desc;

    setTimeout(() => {
        descricao.forEach(ele => ele.style.opacity = '1');
    }, 200);

    clearInterval(intervalo);
    intervalo = setInterval(avancarCarrossel, 4000);
}

function avancarCarrossel() { // Automático
    numero = (numero + 1) % precosTextos.length;
    mudarConteudo();
}

function navegarCarrossel(button) {
    if (button === 1) {
        numero = (numero - 1 + precosTextos.length) % precosTextos.length;
    } else {
        numero = (numero + 1) % precosTextos.length;
    }
    mudarConteudo();
}

document.addEventListener('DOMContentLoaded', () => { 
    mudarConteudo();
});


// Menu mobile
const navButton = document.querySelector('.navMobile-btn');
const navList = document.querySelector('.navMobile');
const navLinks = document.querySelectorAll('.navMobile a');

navButton.addEventListener('click', function() {
    if (navList.classList.contains('active')) {
        navList.classList.remove('active');
    } else {
        navList.classList.add('active');
    }
});
navLinks.forEach(ele => {
    ele.addEventListener('click', function() {
        navList.classList.remove('active');
    });
});

// Controlando HEADER
const links = document.querySelectorAll('nav a');
const header = document.querySelector('header');
let lastScroll = 0;

const botaoVoltar = document.querySelector('#backButton');

window.onscroll = function() {
    const userScroll = document.documentElement.scrollTop;

    if (userScroll > lastScroll) {
        header.style.top = '-120px';
        header.style.backdropFilter = 'blur(20px)';
    } else {
        header.style.top = '0px';
    }

    lastScroll = userScroll < 0 ? 0 : userScroll;

    if (userScroll > 400) {
        botaoVoltar.classList.add('back-active');

        // Editando o HEADER conforme o usuário scrollar a tela
        if (window.innerWidth > 900) {
            header.style.backgroundColor = 'white';
            navList.style.backgroundColor = 'white';
            header.style.borderBottom = '1px solid lightgrey';
            links.forEach(link => {
                link.style.color = 'var(--cor2)';
            });
        }
    } else {
        botaoVoltar.classList.remove('back-active');

        if (window.innerWidth > 900) {
            header.style.borderBottom = '';
            header.style.backgroundColor = '';
            navList.style.backgroundColor = '';
            links.forEach(link => {
                link.style.color = 'white';
            });
        }
    }
}

// Scroll automático
function scrollArea(call) {
    event.preventDefault();
    call.scrollIntoView({behavior:'smooth'});
}

const casasArea = document.querySelector('.casas');
function casasScroll() {
    scrollArea(casasArea);
}

const sobreArea = document.querySelector('.sobre');
function sobreScroll() {
    scrollArea(sobreArea);
}

const servicosArea = document.querySelector('.servicos');
function servicosScroll() {
    scrollArea(servicosArea);
}

const contatoArea = document.querySelector('.contato');
function contatoScroll() {
    scrollArea(contatoArea);
}

function voltarInicial() {
    event.preventDefault();
    scrollTo({top: 0, behavior: 'smooth'});
}


// Filtragem do tipo de casas
const alphavilleCasas = document.querySelectorAll('.alphaville');
const balnearioCasas = document.querySelectorAll('.balneario');
const centroCasas = document.querySelectorAll('.centro');
const todasCasas = [alphavilleCasas, balnearioCasas, centroCasas];

// Botão de ver mais casas
const moreButton = document.querySelector('#moreButton');
const stage2 = document.querySelectorAll('.stage2');

moreButton.addEventListener('click', function() {

    stage2.forEach(ele => {
        const estiloProgramado = window.getComputedStyle(ele);
        
        if (estiloProgramado.display === 'block') {
            ele.style.display = 'none';
            scrollArea(document.querySelector('.centro'));
            moreButton.innerHTML = "Ver mais <i class='bx bx-chevron-down'></i>";

        } else {
            ele.style.display = 'block';
            moreButton.innerHTML = "Ver menos <i class='bx bx-chevron-up'></i>";
        }
    });
});


function filtrar(categoria) {
    todasCasas.map(categoria => {
        categoria.forEach(casa => {casa.style.display = 'none'});
    });

    // Botões de filtro
    const btn1 = document.querySelector('#btn1');
    const btn2 = document.querySelector('#btn2');
    const btn3 = document.querySelector('#btn3');
    const todosBotoes = [btn1, btn2, btn3];
    todosBotoes.forEach(botao => botao.classList.remove('botaoAtivo'));


    if (categoria == 'alphaville') {
        alphavilleCasas.forEach(casa => {casa.style.display = 'block'});
        btn1.classList.add('botaoAtivo');

    } else if (categoria == 'balneario') {
        balnearioCasas.forEach(casa => {casa.style.display = 'block'});
        btn2.classList.add('botaoAtivo');

    } else if (categoria == 'centro') {
        centroCasas.forEach(casa => {casa.style.display = 'block'});
        btn3.classList.add('botaoAtivo');

    } else if (categoria == 'limpar') {
        moreButton.innerHTML = "Ver menos <i class='bx bx-chevron-up' ></i>";

        todasCasas.map(categoria => {categoria.forEach(casa => {casa.style.display = 'block'})});

        todosBotoes.forEach(botao => botao.classList.remove('botaoAtivo'));
    }
}


// Carrosel da área de serviços
const primeiraImagemServicos = document.querySelector('.conteudoServicos .primeira');

let numeroContagem = 0;
let intervalo2;

function mudarConteudoServicos() {
    primeiraImagemServicos.style.marginLeft = `-${numeroContagem * 25}%`;

    clearInterval(intervalo2)
    intervalo2 = setInterval(avancarCarrosselServicos, 4000);
}
function avancarCarrosselServicos() {
    numeroContagem = (numeroContagem + 1) % precosTextos.length;
    mudarConteudoServicos();
}
function mover(button) {
    if (button === 1) {
        numeroContagem = (numeroContagem - 1 + precosTextos.length) % precosTextos.length;
    } else {
        numeroContagem = (numeroContagem + 1) % precosTextos.length;
    }
    mudarConteudoServicos();
}
document.addEventListener('DOMContentLoaded', () => {mudarConteudoServicos();});


// ScrollReveal Efects
window.scrollEffect = ScrollReveal({
    reset: false,
    duration: 3000
});

scrollEffect.reveal('.sobre', {
    rotate: {y: 80, x: 0, z: 0},
});
scrollEffect.reveal('.floatImage, .servImage1', {
    origin: 'left',
    distance: '-200%',
    duration: 2000
});
scrollEffect.reveal('.floatImage2, .servImage2', {
    origin: 'right',
    distance: '-200%',
});
scrollEffect.reveal('.servicos h1', {
    origin: 'left',
    distance: '200%',
    duration: 2000
});
scrollEffect.reveal('.containerServicos', {
    rotate: {x: 0, y: 10, z: 0},
    duration: 2000
});
scrollEffect.reveal('aside', {
    rotate: {x: 0, y: 10, z: 0},
});