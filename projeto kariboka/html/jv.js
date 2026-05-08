

// ===========================
//   KARIBOKA — script.js
//   Versão CLIENTE (só leitura)
//   Dados carregados do localStorage
//   (preenchidos pelo painel admin)
// ===========================
 
// ===== CARREGAR DADOS =====
function carregarShows() {
  return JSON.parse(localStorage.getItem('kariboka_shows') || '[]');
}
 
function carregarCardapio() {
  return JSON.parse(localStorage.getItem('kariboka_cardapio') || '[]');
}
 
// ===========================
//   STATUS ABERTO / FECHADO
// ===========================
function verificarStatus() {
  const agora = new Date();
  const dia = agora.getDay();
  const hora = agora.getHours();
  const minuto = agora.getMinutes();
  const horaDecimal = hora + minuto / 60;
 
  let aberto = false;
 
  if (dia >= 1 && dia <= 4) {
    aberto = horaDecimal >= 18 && horaDecimal < 24;
  } else if (dia === 5 || dia === 6) {
    aberto = horaDecimal >= 18 || horaDecimal < 2;
  } else if (dia === 0) {
    aberto = horaDecimal >= 12 && horaDecimal < 22;
  }
 
  const badge   = document.getElementById('statusBadge');
  const icone   = document.getElementById('statusIcone');
  const titulo  = document.getElementById('statusTitulo');
  const desc    = document.getElementById('statusDesc');
 
  if (aberto) {
    badge.textContent = '✦ Aberto Agora ✦';
    badge.className = 'hero-status aberto';
 
    icone.textContent = '🌿';
    titulo.textContent = 'Estamos Abertos!';
    titulo.className = 'aberto-txt';
    desc.textContent = 'Venha nos visitar. A floresta te espera.';
  } else {
    badge.textContent = '✦ Fechado ✦';
    badge.className = 'hero-status fechado';
 
    icone.textContent = '🌙';
    titulo.textContent = 'Estamos Fechados';
    titulo.className = 'fechado-txt';
    desc.textContent = 'Volte em breve. Confira nossos horários.';
  }
}
 
// ===========================
//   RENDERIZAR SHOWS
// ===========================
function renderizarShows() {
  const lista = carregarShows();
  const container = document.getElementById('showsLista');
  container.innerHTML = '';
 
  if (lista.length === 0) {
    container.innerHTML = `
      <div class="vazio-msg">
        Nenhum show agendado no momento.<br>
        <span style="font-size:0.85rem; opacity:0.5;">Fique de olho nas novidades!</span>
      </div>`;
    return;
  }
 
  // Ordena por data mais próxima
  lista.sort((a, b) => new Date(a.data) - new Date(b.data));
 
  lista.forEach((show, i) => {
    const card = document.createElement('div');
    card.className = 'show-card';
    card.style.animationDelay = (i * 0.1) + 's';
    card.innerHTML = `
      <span class="show-card-tag">✦ Ao Vivo</span>
      <h3>${show.nome}</h3>
      <div class="show-data">📅 ${formatarData(show.data)} &nbsp;·&nbsp; 🕐 ${show.hora}</div>
      <div class="show-desc">${show.desc || 'Venha curtir!'}</div>
    `;
    container.appendChild(card);
  });
}
 
// ===========================
//   RENDERIZAR CARDÁPIO
// ===========================
function renderizarCardapio() {
  const lista = carregarCardapio();
  const container = document.getElementById('cardapioLista');
  container.innerHTML = '';
 
  if (lista.length === 0) {
    container.innerHTML = `
      <div class="vazio-msg" style="border-color:rgba(76,175,125,0.2); color:rgba(212,232,212,0.4);">
        Cardápio do dia ainda não disponível.<br>
        <span style="font-size:0.85rem; opacity:0.5;">Volte mais tarde!</span>
      </div>`;
    return;
  }
 
  lista.forEach((prato, i) => {
    const card = document.createElement('div');
    card.className = 'prato-card';
    card.style.animationDelay = (i * 0.1) + 's';
    card.innerHTML = `
      <span class="prato-categoria">${prato.categoria || 'Prato'}</span>
      <h3>${prato.nome}</h3>
      <div class="prato-desc">${prato.desc || ''}</div>
      <div class="prato-preco">R$ ${parseFloat(prato.preco).toFixed(2)}</div>
    `;
    container.appendChild(card);
  });
}
 
// ===========================
//   FORMULÁRIO DE CONTATO
// ===========================
function enviarMensagem(event) {
  event.preventDefault();
 
  const nome  = document.getElementById('msgNome').value.trim();
  const email = document.getElementById('msgEmail').value.trim();
  const texto = document.getElementById('msgTexto').value.trim();
  const fb    = document.getElementById('msgFeedback');
 
  if (!nome || !email || !texto) {
    fb.textContent = 'Por favor, preencha todos os campos.';
    fb.style.color = '#ff9999';
    return;
  }
 
  fb.textContent = `✦ Mensagem enviada! Obrigado, ${nome}. Retornaremos em breve.`;
  fb.style.color = 'var(--verde-brilho)';
 
  document.getElementById('msgNome').value  = '';
  document.getElementById('msgEmail').value = '';
  document.getElementById('msgTexto').value = '';
}
 
// ===========================
//   UTILITÁRIO
// ===========================
function formatarData(dataStr) {
  if (!dataStr) return '';
  const [ano, mes, dia] = dataStr.split('-');
  return `${dia}/${mes}/${ano}`;
}
 
// ===========================
//   INICIALIZAR
// ===========================
document.addEventListener('DOMContentLoaded', function () {
  verificarStatus();
  renderizarShows();
  renderizarCardapio();
  setInterval(verificarStatus, 60000);
});

