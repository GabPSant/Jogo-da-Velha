const botoes = document.querySelectorAll(".botao");
const palavra = document.querySelector("#palavra");
const imagemEnforcado = document.querySelector("aside>img");

let palavraAtual, letrasCorretas, tentativas;

function resetarJogo(){
    letrasCorretas = [];
    tentativas = 0;


}

function testar_comando(letra){
    if(tentativas<7){
        if(index_teste.includes(letra)){
            console.log(letra);
        }
    }
    else{

    }
}

botoes.forEach(botao => {
    botao.addEventListener("click", evento =>{
        const valor = evento.target.value;
        palavra.innerHTML += valor;
        console.log(valor);
    })
})

document.addEventListener('keydown', evento =>{
    let chave = evento.key;

    if(/^([A-Z]){1}$/.test(chave) || chave == "Ç"){
        palavra.innerHTML += chave;
    }
    else if(/^([a-z]){1}$/.test(chave) || chave == "ç"){
        chave = chave.toUpperCase();
        palavra.innerHTML += chave;
    }
    console.log(chave);
    console.log(/^([a-z]|[A-Z]){1}$/.test(chave));
})