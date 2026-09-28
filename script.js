const formEntrada = document.getElementById("formEntrada");
const tituloInput = document.getElementById("titulo");
const descricaoInput = document.getElementById("descricao");
const dataInput = document.getElementById("data");
const listaEntradas = document.getElementById("listaEntradas");
const btnInstalar = document.getElementById("btnInstalar");

let entradas = JSON.parse(localStorage.getItem("entradas")) || [];
let eventoInstalacao = null;

// Salva as entradas no navegador
function salvarEntradas() {
  localStorage.setItem("entradas", JSON.stringify(entradas));
}

// Formata a data para o padrão brasileiro
function formatarData(data) {
  const [ano, mes, dia] = data.split("-");
  return `${dia}/${mes}/${ano}`;
}

// Exibe todas as entradas
function renderizarEntradas() {
  listaEntradas.innerHTML = "";

  if (entradas.length === 0) {
    listaEntradas.innerHTML = `
      <p class="sem-entradas">
        Nenhuma entrada registrada ainda.
      </p>
    `;
    return;
  }

  entradas
    .slice()
    .reverse()
    .forEach((entrada) => {
      const artigo = document.createElement("article");
      artigo.classList.add("entrada");

      const titulo = document.createElement("h3");
      titulo.textContent = entrada.titulo;

      const data = document.createElement("span");
      data.classList.add("data");
      data.textContent = formatarData(entrada.data);

      const descricao = document.createElement("p");
      descricao.textContent = entrada.descricao;

      const botaoRemover = document.createElement("button");
      botaoRemover.classList.add("btn-remover");
      botaoRemover.textContent = "Remover";
      botaoRemover.addEventListener("click", () => {
        removerEntrada(entrada.id);
      });

      artigo.append(titulo, data, descricao, botaoRemover);
      listaEntradas.appendChild(artigo);
    });
}

// Cria uma nova entrada
formEntrada.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const novaEntrada = {
    id: Date.now(),
    titulo: tituloInput.value.trim(),
    descricao: descricaoInput.value.trim(),
    data: dataInput.value,
  };

  if (
    !novaEntrada.titulo ||
    !novaEntrada.descricao ||
    !novaEntrada.data
  ) {
    return;
  }

  entradas.push(novaEntrada);

  salvarEntradas();
  renderizarEntradas();

  formEntrada.reset();
});

// Remove uma entrada
function removerEntrada(id) {
  entradas = entradas.filter((entrada) => entrada.id !== id);

  salvarEntradas();
  renderizarEntradas();
}

// Permite instalação da PWA quando o navegador disponibilizar
window.addEventListener("beforeinstallprompt", (evento) => {
  evento.preventDefault();

  eventoInstalacao = evento;
  btnInstalar.hidden = false;
});

btnInstalar.addEventListener("click", async () => {
  if (!eventoInstalacao) {
    return;
  }

  eventoInstalacao.prompt();

  await eventoInstalacao.userChoice;

  eventoInstalacao = null;
  btnInstalar.hidden = true;
});

// Registra o Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./service-worker.js")
      .catch((erro) => {
        console.error("Erro ao registrar Service Worker:", erro);
      });
  });
}

// Exibe as entradas salvas quando a página é aberta
renderizarEntradas();