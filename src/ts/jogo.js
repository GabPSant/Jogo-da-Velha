"use strict";
var _a, _b;
//Object.defineProperty(exports, "__esModule", { value: true });
import palavras_json_1 from "./json/palavras.json" assert {type: "json"}; //Depois mandar o JSON para o discord do grupo da Softex
var palavra = document === null || document === void 0 ? void 0 : document.querySelector("#palavra");
var imagemEnforcado = (_a = document === null || document === void 0 ? void 0 : document.querySelector("aside")) === null || _a === void 0 ? void 0 : _a.querySelector("img");
var incorretas = (_b = document === null || document === void 0 ? void 0 : document.querySelector("#tentativas_erradas")) === null || _b === void 0 ? void 0 : _b.querySelector("span");
var finalizar = document.querySelector("#finalizar");
var jogarNovamente = document === null || document === void 0 ? void 0 : document.querySelector(".play-again");
var palavraAtual, letrasCorretas, tentativas;
var tentativasMaximas = 6;
function criarTeclado() {
    var teclado = document === null || document === void 0 ? void 0 : document.getElementById("teclado");
    teclado.innerHTML = "";
    for (var index = 65; index < 91; index++) {
        var letra = String.fromCharCode(index);
        var buttonElement = "<button type=\"button\" class=\"btn btn-primary botao\">".concat(letra, "</button>");
        teclado.innerHTML += buttonElement;
    }
}
criarTeclado();
function resetarJogo() {
    letrasCorretas = [];
    tentativas = 0;
    imagemEnforcado.src = "src/svg/hangman-".concat(tentativas, ".svg");
    incorretas.innerText = "".concat(tentativas, " / ").concat(tentativasMaximas);
    botoes.forEach(function (btn) {
        btn.disabled = false;
        console.log(btn.classList.contains("btn-sucess"));
        if (btn.classList.contains("btn-success") || btn.classList.contains("btn-danger")) {
            btn.classList.remove("btn-success");
            btn.classList.remove("btn-danger");
            btn.classList.add("btn-primary");
        }
    });
    palavra.innerHTML = palavraAtual
        .split("")
        .map(function () { return "<li class=\"letra\"></li>"; })
        .join("");
    console.log(palavra.innerHTML);
    finalizar.classList.remove("show");
}
function getPalavraAleatoria() {
    var _a;
    var _b = palavras_json_1.palavras[Math.floor(Math.random() * palavras_json_1.palavras.length)], palavra = _b.palavra, dica = _b.dica;
    palavraAtual = palavra.toUpperCase();
    var textoDica = (_a = document.querySelector("#dica")) === null || _a === void 0 ? void 0 : _a.querySelector("span");
    textoDica.innerText = dica;
    resetarJogo();
}
function fimDeJogo(resultado) {
    setTimeout(function () {
        var textoResultado = resultado
            ? "Você encontrou a palavra: "
            : "A palavra certa era: ";
        // palavra.querySelector("img").
        finalizar.querySelector("img").src = "src/img/".concat(resultado ? "victory-drama" : "john-lost", ".gif");
        finalizar.querySelector("h4").innerText = "".concat(resultado ? "Parabéns!" : "Fim de jogo!");
        finalizar.querySelector("p").innerHTML = "".concat(textoResultado, " <strong>").concat(palavraAtual, "</strong>");
        jogarNovamente === null || jogarNovamente === void 0 ? void 0 : jogarNovamente.addEventListener("click", getPalavraAleatoria);
        finalizar.classList.add("show");
    }, 300);
}
function iniciarJogo(botao, letraClicada) {
    if (String(palavraAtual).includes(letraClicada)) {
        palavraAtual.split('').forEach(function (letra, index) {
            if (letra === letraClicada) {
                letrasCorretas.push(letra);
                palavra.querySelectorAll("li")[index].innerHTML = letra;
                palavra.querySelectorAll("li")[index].classList.add("adivinhado");
                botao.classList.remove("btn-primary");
                botao.classList.add("btn-success");
            }
        });
    }
    else {
        tentativas++;
        botao.classList.remove("btn-primary");
        botao.classList.add("btn-danger");
        imagemEnforcado.src = "src/svg/hangman-".concat(tentativas, ".svg");
    }
    botao.disabled = true;
    incorretas.innerText = "".concat(tentativas, "/").concat(tentativasMaximas);
    if (tentativas >= tentativasMaximas) {
        botoes.disabled = true;
        return fimDeJogo(false);
    }
    if (letrasCorretas.length === palavraAtual.length) {
        botoes.disabled = true;
        return fimDeJogo(true);
    }
}
var botoes = document.querySelectorAll(".botao");
botoes.forEach(function (botao) {
    document.addEventListener("keydown", function (e) {
        var chave = e.key.toUpperCase();
        if (finalizar.classList.contains("show"))
            return;
        if (/^([A-Z]){1}$/.test(chave) && chave == botao.innerText) {
            //Tentar resolver o problema das letras repetidas
            botao.click();
        }
        console.log(chave);
        console.log(/^([a-z]|[A-Z]){1}$/.test(chave));
    }, false);
    botao.addEventListener("click", function (e) {
        console.log(e.target);
        iniciarJogo(e.target, botao.innerHTML);
    });
});
//Avaliar como fazer no teclado
getPalavraAleatoria();
