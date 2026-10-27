// ===== Dados: para mexer no estoque, é só editar esta lista =====
const carros = [
  { id: 1, nome: "Chevrolet Onix 1.0 LT", cat: "hatch", ano: 2020, km: 41000, preco: 54500, extras: "completo, único dono" },
  { id: 2, nome: "Volkswagen Gol 1.6", cat: "hatch", ano: 2017, km: 79000, preco: 38900, extras: "direção hidráulica, ar-condicionado" },
  { id: 3, nome: "Fiat Argo 1.0 Drive", cat: "hatch", ano: 2021, km: 28000, preco: 61200, extras: "multimídia, sensor de ré" },
  { id: 4, nome: "Hyundai HB20 1.0", cat: "hatch", ano: 2019, km: 58000, preco: 42900, extras: "vidro e trava elétricos" },
  { id: 5, nome: "Renault Kwid Zen", cat: "hatch", ano: 2022, km: 15000, preco: 46800, extras: "baixo consumo, ideal para o primeiro carro" },
  { id: 6, nome: "Chevrolet Cobalt LTZ", cat: "sedan", ano: 2018, km: 66000, preco: 49700, extras: "automático, bancos de couro" },
  { id: 7, nome: "Toyota Corolla GLi", cat: "sedan", ano: 2016, km: 92000, preco: 68400, extras: "revisões na concessionária, IPVA pago" },
  { id: 8, nome: "Volkswagen Voyage 1.6", cat: "sedan", ano: 2019, km: 51000, preco: 52900, extras: "completo" },
  { id: 9, nome: "Jeep Renegade Sport", cat: "suv", ano: 2020, km: 47000, preco: 84900, extras: "câmbio automático, multimídia" },
  { id: 10, nome: "Chevrolet Tracker LT", cat: "suv", ano: 2022, km: 19000, preco: 98500, extras: "garantia de fábrica" },
  { id: 11, nome: "Ford EcoSport Freestyle", cat: "suv", ano: 2017, km: 73000, preco: 55300, extras: "rodas de liga leve" },
  { id: 12, nome: "Fiat Strada Freedom CD", cat: "picape", ano: 2021, km: 32000, preco: 72300, extras: "cabine dupla, revisões na concessionária" },
  { id: 13, nome: "Chevrolet Montana LS", cat: "picape", ano: 2018, km: 61000, preco: 58700, extras: "caçamba forrada" },
  { id: 14, nome: "Volkswagen Saveiro Trendline", cat: "picape", ano: 2019, km: 54000, preco: 63100, extras: "ar-condicionado, pneus novos" },
];
const JUROS_MES = 0.019; // taxa fictícia: 1,9% ao mês
const CORES = ["#2B5D3F", "#E8A33D", "#C1443B"];

const $ = (seletor) => document.querySelector(seletor);
const reais = (v) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const numero = (v) => v.toLocaleString("pt-BR");

// ===== Cabeçalho e rodapé (escritos uma vez só) =====
function montarLayout() {
  const pagina = location.pathname.split("/").pop() || "index.html";
  const menu = [["index.html", "Início"], ["estoque.html", "Estoque"], ["sobre.html", "Sobre"], ["contato.html", "Contato"]];
  const links = menu.map(([url, nome]) => `<a href="${url}" ${url === pagina ? 'class="atual"' : ""}>${nome}</a>`).join("");
  $("#cabecalho").innerHTML = `<header><div class="wrap">
    <a class="logo" href="index.html">Giro <em>Certo</em></a>
    <button class="menu-btn" aria-label="Abrir menu">☰</button>
    <nav>${links}</nav></div></header>`;
  $("#rodape").innerHTML = `<footer><div class="wrap">Giro Certo Veículos é uma concessionária fictícia, criada apenas como exemplo.</div></footer>`;
  $(".menu-btn").addEventListener("click", () => $("nav").classList.toggle("aberto"));
}

// ===== Lista de carros =====
function icone(c) {
  const cor = CORES[c.id % CORES.length];
  return `<svg viewBox="0 0 100 100"><rect x="8" y="42" width="84" height="24" rx="6" fill="${cor}"/>
    <path d="M20 42 L30 24 H70 L82 42 Z" fill="${cor}"/>
    <circle cx="28" cy="68" r="9" fill="#1F2A24"/><circle cx="72" cy="68" r="9" fill="#1F2A24"/></svg>`;
}

function linhaCarro(c) {
  return `<div class="carro">${icone(c)}
    <div><h3>${c.nome}</h3><p class="info">${c.ano} · ${numero(c.km)} km · ${c.extras}</p></div>
    <div class="lado"><span class="preco">${reais(c.preco)}</span>
      <button class="btn pequeno claro" data-simular="${c.id}">Simular financiamento</button></div></div>`;
}

function desenharLista(destino, lista) {
  destino.innerHTML = lista.length
    ? lista.map(linhaCarro).join("")
    : '<p class="sub" style="padding:20px 0">Nenhum carro encontrado com esses filtros.</p>';
}

// ===== Simulador de financiamento (tabela Price) =====
function montarSimulador() {
  document.body.insertAdjacentHTML("beforeend", `<dialog id="simulador">
    <button class="fechar" aria-label="Fechar">×</button>
    <h3 id="sim-nome"></h3><p class="sub" id="sim-preco"></p>
    <div class="linha-form">
      <div><label for="sim-entrada">Entrada (R$)</label><input id="sim-entrada" type="number" min="0" step="500"></div>
      <div><label for="sim-prazo">Prazo</label><select id="sim-prazo">
        ${[12, 24, 36, 48, 60].map((p) => `<option value="${p}" ${p === 36 ? "selected" : ""}>${p} meses</option>`).join("")}</select></div>
    </div>
    <div id="sim-resultado"></div></dialog>`);

  const dialogo = $("#simulador");
  let carro = null;

  const calcular = () => {
    const entrada = Math.min(Math.max(Number($("#sim-entrada").value) || 0, 0), carro.preco);
    const n = Number($("#sim-prazo").value);
    const financiado = carro.preco - entrada;
    if (financiado === 0) {
      $("#sim-resultado").innerHTML = '<p class="ok" style="margin-top:16px">A entrada cobre o valor total: compra à vista.</p>';
      return;
    }
    const parcela = (financiado * JUROS_MES) / (1 - Math.pow(1 + JUROS_MES, -n));
    $("#sim-resultado").innerHTML = `<table>
      <tr><th>Valor financiado</th><td>${reais(financiado)}</td></tr>
      <tr><th>Parcela mensal</th><td><strong>${reais(parcela)}</strong> em ${n}x</td></tr>
      <tr><th>Total pago</th><td>${reais(parcela * n + entrada)}</td></tr></table>
      <p class="sub">Simulação fictícia com juros de 1,9% ao mês.</p>
      <p style="margin-top:14px"><a class="btn pequeno" href="contato.html?carro=${encodeURIComponent(carro.nome)}">Tenho interesse</a></p>`;
  };

  document.addEventListener("click", (e) => {
    const botao = e.target.closest("[data-simular]");
    if (!botao) return;
    carro = carros.find((c) => c.id === Number(botao.dataset.simular));
    $("#sim-nome").textContent = carro.nome;
    $("#sim-preco").textContent = "Preço à vista: " + reais(carro.preco);
    $("#sim-entrada").value = Math.round(carro.preco * 0.2 / 500) * 500;
    calcular();
    dialogo.showModal();
  });
  $("#sim-entrada").addEventListener("input", calcular);
  $("#sim-prazo").addEventListener("change", calcular);
  dialogo.querySelector(".fechar").addEventListener("click", () => dialogo.close());
  dialogo.addEventListener("click", (e) => { if (e.target === dialogo) dialogo.close(); });
}

// ===== Página: Início =====
function paginaInicio() {
  const novos = [...carros].sort((a, b) => b.ano - a.ano).slice(0, 3);
  desenharLista($("#destaques"), novos);
  $("#total-carros").textContent = carros.length;
  montarSimulador();
}

// ===== Página: Estoque (filtro, busca e ordenação ao vivo) =====
function paginaEstoque() {
  let categoria = "todos";
  const atualizar = () => {
    const busca = $("#busca").value.trim().toLowerCase();
    const max = Number($("#max").value) || Infinity;
    const lista = carros
      .filter((c) => categoria === "todos" || c.cat === categoria)
      .filter((c) => c.nome.toLowerCase().includes(busca) && c.preco <= max);
    const ordem = $("#ordem").value;
    if (ordem === "menor") lista.sort((a, b) => a.preco - b.preco);
    if (ordem === "maior") lista.sort((a, b) => b.preco - a.preco);
    if (ordem === "km") lista.sort((a, b) => a.km - b.km);
    $("#contagem").textContent = `${lista.length} carro(s) encontrado(s).`;
    desenharLista($("#lista"), lista);
  };

  $("#filtros").addEventListener("click", (e) => {
    if (!e.target.dataset.cat) return;
    categoria = e.target.dataset.cat;
    document.querySelectorAll("#filtros a").forEach((a) => a.classList.toggle("atual", a === e.target));
    atualizar();
  });
  ["#busca", "#max"].forEach((s) => $(s).addEventListener("input", atualizar));
  $("#ordem").addEventListener("change", atualizar);
  atualizar();
  montarSimulador();
}

// ===== Página: Contato (valida e guarda no navegador) =====
function paginaContato() {
  const interesse = new URLSearchParams(location.search).get("carro");
  if (interesse) $("#mensagem").value = `Olá! Tenho interesse no ${interesse}.`;

  $("#form-contato").addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = $("#nome").value.trim();
    const telefone = $("#telefone").value.trim();
    const aviso = $("#aviso");
    if (nome.length < 2 || telefone.replace(/\D/g, "").length < 8) {
      aviso.className = "erro";
      aviso.textContent = "Confira seu nome e um telefone com DDD.";
      return;
    }
    const mensagens = JSON.parse(localStorage.getItem("mensagens") || "[]");
    mensagens.push({ data: new Date().toISOString(), nome, telefone, assunto: $("#assunto").value, mensagem: $("#mensagem").value.trim() });
    localStorage.setItem("mensagens", JSON.stringify(mensagens));
    aviso.className = "ok";
    aviso.textContent = `Obrigado, ${nome}! Sua mensagem foi registrada e vamos responder em breve.`;
    e.target.reset();
  });
}

// ===== Inicialização =====
montarLayout();
const pagina = document.body.dataset.pagina;
if (pagina === "inicio") paginaInicio();
if (pagina === "estoque") paginaEstoque();
if (pagina === "contato") paginaContato();
