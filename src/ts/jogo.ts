import conjunto from './../json/palavras.json';//Depois mandar o JSON para o discord do grupo da Softex

const palavra = <HTMLUListElement>document?.querySelector("#palavra");

const imagemEnforcado = <HTMLImageElement>document?.querySelector("aside")?.querySelector("img");
const incorretas = <HTMLHRElement>document?.querySelector("#tentativas_erradas")?.querySelector("span");
const finalizar:any = document.querySelector("#finalizar");
const jogarNovamente = <HTMLButtonElement>document?.querySelector(".play-again");

let palavraAtual:string, letrasCorretas:string[], tentativas:number;
const tentativasMaximas = 6;

function criarTeclado() {
  const teclado = <HTMLDivElement>document?.getElementById("teclado");
  teclado.innerHTML = "";

  for (let index = 65; index < 91; index++) {
    const letra:string = String.fromCharCode(index);
    const buttonElement = `<button type="button" class="btn btn-primary botao">${letra}</button>`;

    teclado.innerHTML += buttonElement;
  }
}

criarTeclado();

function resetarJogo() {
  letrasCorretas = [];
  tentativas = 0;

  imagemEnforcado.src = `src/svg/hangman-${tentativas}.svg`;
  incorretas.innerText = `${tentativas} / ${tentativasMaximas}`;
  botoes.forEach((btn:any) => {
    btn.disabled = false;
    console.log(btn.classList.contains("btn-sucess"));
    if (btn.classList.contains("btn-success") ||btn.classList.contains("btn-danger")) {
      btn.classList.remove("btn-success");
      btn.classList.remove("btn-danger");
      btn.classList.add("btn-primary");
    }
  });

  palavra.innerHTML = palavraAtual
    .split("")
    .map(() => `<li class="letra"></li>`)
    .join("");

  console.log(palavra.innerHTML);
  finalizar.classList.remove("show");
}

function getPalavraAleatoria() {

  const { palavra, dica } = conjunto.palavras[Math.floor(Math.random() * conjunto.palavras.length)];

  palavraAtual = palavra.toUpperCase();

  const textoDica:any = document.querySelector("#dica")?.querySelector("span")

  textoDica.innerText = dica;

  resetarJogo();
}

function fimDeJogo(resultado:boolean) {
  setTimeout(() => {
    const textoResultado = resultado
      ? "Você encontrou a palavra: "
      : "A palavra certa era: ";
    
      // palavra.querySelector("img").
      finalizar.querySelector("img").src = `src/img/${
      resultado ? "victory-drama" : "john-lost"
    }.gif`;
    
    finalizar.querySelector("h4").innerText = `${
      resultado ? "Parabéns!" : "Fim de jogo!"
    }`;
    
    finalizar.querySelector(
      "p"
    ).innerHTML = `${textoResultado} <strong>${palavraAtual}</strong>`;

    jogarNovamente?.addEventListener("click", getPalavraAleatoria);
    finalizar.classList.add("show");
  }, 300);
}

function iniciarJogo(botao:any, letraClicada:string) {
  if (String(palavraAtual).includes(letraClicada)) {
    palavraAtual.split('').forEach((letra, index) => {
      if (letra === letraClicada) {
        letrasCorretas.push(letra);
        palavra.querySelectorAll("li")[index].innerHTML = letra;
        palavra.querySelectorAll("li")[index].classList.add("adivinhado");
        botao.classList.remove("btn-primary");
        botao.classList.add("btn-success");
      }
    });
  } else {
    tentativas++;
    botao.classList.remove("btn-primary");
    botao.classList.add("btn-danger");
    imagemEnforcado.src = `src/svg/hangman-${tentativas}.svg`;
  }
  
  botao.disabled = true;
  incorretas.innerText = `${tentativas}/${tentativasMaximas}`;

  if (tentativas >= tentativasMaximas) {
    botoes.disabled = true;
    return fimDeJogo(false);
  }
  if (letrasCorretas.length === palavraAtual.length) {
    botoes.disabled = true;
    return fimDeJogo(true);
  }
}

const botoes:any = document.querySelectorAll(".botao");

botoes.forEach((botao:any) => {
  document.addEventListener(
    "keydown",
    (e) => {
      let chave = e.key.toUpperCase();
      if(finalizar.classList.contains("show")) return;

      if (/^([A-Z]){1}$/.test(chave) && chave == botao.innerText) {
        //Tentar resolver o problema das letras repetidas
        botao.click();
      }
      console.log(chave);
      console.log(/^([a-z]|[A-Z]){1}$/.test(chave));
    },
    false
  );

  botao.addEventListener("click", (e:Event) => {
    console.log(e.target);
    iniciarJogo(e.target, botao.innerHTML);
  });
});

//Avaliar como fazer no teclado

getPalavraAleatoria();

