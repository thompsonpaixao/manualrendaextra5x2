/**
 * MANUAL RENDA EXTRA 5X2 - SCRIPT DA ÁREA DE MEMBROS E CROSS-SELL
 * Implementa:
 * 1. Autenticação (Admin "admin" / "1234" desbloqueia tudo; Aluno normal tem cadeados)
 * 2. Vitrine estilo Netflix com 4 capas
 * 3. Lógica de Cadeados e Modal de Upsell de 1 Clique (R$ 14,90 adicionais)
 * 4. Desbloqueio dinâmico com persistência
 * 5. Leitor de Manuais e Planilhas Interativas
 */

const CATEGORIES = {
  alimentacao: {
    id: 'alimentacao',
    name: 'Alimentação Lucrativa',
    tagline: 'Marmitas & Doces Sazonais na Cozinha',
    tag: 'Cozinha 5x2',
    desc: 'Como cozinhar apenas 1x na semana no seu dia livre e lucrar até R$ 3.000 com marmitas congeladas e sobremesas de alto giro.',
    poster: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=700&q=80',
    pdfTitle: 'Manual Prático: Operação Marmitas & Doces em Lote (PDF)',
    sheetTitle: 'Planilha Inteligente de Precificação & Margem de 100% (XLSX/Drive)',
    scriptsTitle: 'Pack de Mensagens de WhatsApp para Venda Antecipada na Vizinhança',
    sheetData: [
      { item: 'Ingredientes Base (Arroz, Feijão, Proteína, Legumes)', custo: 'R$ 6,20' },
      { item: 'Embalagem Térmica + Etiqueta Personalizada', custo: 'R$ 1,10' },
      { item: 'Gás & Energia rateados por unidade', custo: 'R$ 0,70' },
      { item: 'Custo Total por Marmita', custo: 'R$ 8,00' },
      { item: 'Preço Sugerido de Venda', custo: 'R$ 18,90 (Margem Líquida: 136%)' }
    ]
  },
  'na-rua': {
    id: 'na-rua',
    name: 'Venda Rápida na Rua',
    tagline: 'Operação Sinais e Pontos Estratégicos',
    tag: 'Dinheiro Imediato',
    desc: 'A operação tática para fazer de R$ 100 a R$ 300 limpos por dia vendendo água, café ou geladinho com scripts de 15 segundos.',
    poster: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=700&q=80',
    pdfTitle: 'Manual Tático: Abordagem de 15 Segundos em Semáforos e Pontos de Ônibus (PDF)',
    sheetTitle: 'Planilha de Giro Diário & Caixa Operacional Imediato',
    scriptsTitle: 'Scripts Verbais de Abordagem Não Invasiva para Dobrar Conversão',
    sheetData: [
      { item: 'Fardo de Água Mineral c/ 12 un (Custo unitário)', custo: 'R$ 0,95' },
      { item: 'Gelo Escama & Caixa Térmica rateada', custo: 'R$ 0,25' },
      { item: 'Preço de Venda no Sinal / Ponto Estratégico', custo: 'R$ 4,00 a R$ 5,00' },
      { item: 'Lucro Líquido por Garrafa', custo: 'R$ 2,80 a R$ 3,80 (300% de Margem)' },
      { item: 'Meta Diária (60 garrafas em 3 horas)', custo: 'R$ 180 a R$ 228 Limpos' }
    ]
  },
  digital: {
    id: 'digital',
    name: 'Operações Digitais Dark',
    tagline: '100% Anônimo via Celular',
    tag: 'Sem Aparecer',
    desc: 'Método dark para gerar comissões diárias como afiliado Shopee/TikTok e micro-serviços usando apenas o celular no dia de folga.',
    poster: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=700&q=80',
    pdfTitle: 'Manual Dark: Mineração de Produtos Virais & Vídeos Sem Rosto (PDF)',
    sheetTitle: 'Planilha Rastreadora de Links & Comissões Automáticas',
    scriptsTitle: 'Templates de Copys Prontas para Legendas e Comentários Magnéticos',
    sheetData: [
      { item: 'Custo de Produção com IA Gratuita', custo: 'R$ 0,00' },
      { item: 'Tráfego Orgânico (Reels, TikTok & Shorts)', custo: 'R$ 0,00' },
      { item: 'Comissão Média por Venda Shopee/TikTok Shop', custo: 'R$ 12,50 a R$ 38,00' },
      { item: 'Meta de 3 a 5 Vendas Orgânicas/dia', custo: 'R$ 75 a R$ 190/dia' },
      { item: 'Tempo Diário Exigido', custo: '45 minutos programando postagens' }
    ]
  },
  artesanato: {
    id: 'artesanato',
    name: 'Artesanato & Presentes',
    tagline: 'Trabalho Manual de Alto Valor',
    tag: 'Sob Encomenda',
    desc: 'Como criar cestas sazonais e presentes personalizados vendendo tudo pelo WhatsApp antes mesmo de comprar os materiais.',
    poster: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=700&q=80',
    pdfTitle: 'Manual de Criação: Cestas Lucrativas & Lembranças Festivas (PDF)',
    sheetTitle: 'Calculadora de Custos de Montagem & Formação de Preço Premium',
    scriptsTitle: 'Scripts de WhatsApp de Lançamento Relâmpago para Contatos Próximos',
    sheetData: [
      { item: 'Cesta Crua + Palha + Laço Artesanal', custo: 'R$ 14,00' },
      { item: 'Mix de Chocolates/Petiscos Selecionados', custo: 'R$ 28,00' },
      { item: 'Custo de Montagem Total', custo: 'R$ 42,00' },
      { item: 'Preço Cobrado na Encomenda (com Pagamento 50% adiantado)', custo: 'R$ 119,90' },
      { item: 'Lucro Líquido por Cesta', custo: 'R$ 77,90 (185% de Lucro)' }
    ]
  }
};

// Estado da Aplicação
let currentUser = null;

document.addEventListener('DOMContentLoaded', () => {
  initAuth();
});

/* --------------------------------------------------------------------
   1. GERENCIAMENTO DE AUTENTICAÇÃO E SESSÃO
   -------------------------------------------------------------------- */
function initAuth() {
  const loginSection = document.getElementById('loginScreen');
  const dashSection = document.getElementById('dashboardScreen');

  // Verifica se há login salvo
  const savedUser = localStorage.getItem('renda_extra_active_user');
  const savedSession = localStorage.getItem('renda_extra_user_session');

  if (savedUser) {
    currentUser = JSON.parse(savedUser);
    showDashboard();
  } else if (savedSession) {
    // Veio do checkout
    const session = JSON.parse(savedSession);
    currentUser = {
      role: session.planType === 'vip' ? 'vip' : 'student',
      name: session.userName || 'Aluno do Método',
      email: session.userEmail || 'aluno@rendaextra.com',
      unlocked: session.planType === 'vip' ? ['alimentacao', 'na-rua', 'digital', 'artesanato'] : [session.unlockedCategory || 'alimentacao']
    };
    saveUserSession();
    showDashboard();
  } else {
    showLogin();
  }

  // Listener do Form de Login
  const loginForm = document.getElementById('memberLoginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLoginSubmit);
  }
}

function handleLoginSubmit(e) {
  e.preventDefault();
  const emailInput = document.getElementById('loginEmail').value.trim();
  const passwordInput = document.getElementById('loginPassword').value.trim();

  // REGRA DE MOCKUP ESPECIFICADA: Login "admin" e Senha "1234" desbloqueia TUDO!
  if (emailInput.toLowerCase() === 'admin' && passwordInput === '1234') {
    currentUser = {
      role: 'admin',
      name: 'Administrador VIP',
      email: 'admin@rendaextra.com',
      unlocked: ['alimentacao', 'na-rua', 'digital', 'artesanato']
    };
    saveUserSession();
    showDashboard();
    return;
  }

  // Aluno comum (Login padrão / Teste de Plano Start com apenas Alimentação desbloqueada)
  currentUser = {
    role: 'student',
    name: emailInput.split('@')[0] || 'Aluno Start',
    email: emailInput,
    unlocked: ['alimentacao'] // Começa apenas com Alimentação desbloqueada para testar cross-sell!
  };
  saveUserSession();
  showDashboard();
}

window.quickLoginAs = function(roleType) {
  if (roleType === 'admin') {
    currentUser = {
      role: 'admin',
      name: 'Administrador VIP',
      email: 'admin@rendaextra.com',
      unlocked: ['alimentacao', 'na-rua', 'digital', 'artesanato']
    };
  } else {
    currentUser = {
      role: 'student',
      name: 'Aluno Plano Start',
      email: 'aluno@rendaextra.com',
      unlocked: ['alimentacao']
    };
  }
  saveUserSession();
  showDashboard();
};

window.logoutUser = function() {
  localStorage.removeItem('renda_extra_active_user');
  currentUser = null;
  showLogin();
};

function saveUserSession() {
  localStorage.setItem('renda_extra_active_user', JSON.stringify(currentUser));
}

function showLogin() {
  const loginSection = document.getElementById('loginScreen');
  const dashSection = document.getElementById('dashboardScreen');
  if (loginSection) loginSection.style.display = 'flex';
  if (dashSection) dashSection.style.display = 'none';
}

function showDashboard() {
  const loginSection = document.getElementById('loginScreen');
  const dashSection = document.getElementById('dashboardScreen');
  if (loginSection) loginSection.style.display = 'none';
  if (dashSection) dashSection.style.display = 'flex';

  updateUserInterface();
  renderNetflixShowcase();
}

/* --------------------------------------------------------------------
   2. ATUALIZAÇÃO DA INTERFACE DO USUÁRIO
   -------------------------------------------------------------------- */
function updateUserInterface() {
  if (!currentUser) return;

  const isVip = currentUser.role === 'admin' || currentUser.role === 'vip' || currentUser.unlocked.length === 4;

  const userNameEl = document.getElementById('dashUserName');
  const userRoleEl = document.getElementById('dashUserRole');
  const planBadgeEl = document.getElementById('dashPlanBadge');
  const userInitialsEl = document.getElementById('dashUserInitials');

  if (userNameEl) userNameEl.innerText = currentUser.name;
  if (userInitialsEl) userInitialsEl.innerText = currentUser.name.charAt(0).toUpperCase();

  if (userRoleEl) {
    userRoleEl.innerText = isVip ? 'Acesso Total VIP Vitalício' : 'Plano Start (1 Manual)';
  }

  if (planBadgeEl) {
    if (isVip) {
      planBadgeEl.className = 'plan-status-pill vip';
      planBadgeEl.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        Status: VIP 4/4 Desbloqueado
      `;
    } else {
      planBadgeEl.className = 'plan-status-pill start';
      planBadgeEl.innerHTML = `
        <span style="width: 8px; height: 8px; background: #EAB308; border-radius: 50%;"></span>
        Status: Plano Start (${currentUser.unlocked.length}/4 Manuais)
      `;
    }
  }
}

/* --------------------------------------------------------------------
   3. VITRINE ESTILO NETFLIX COM LÓGICA DE CADEADOS
   -------------------------------------------------------------------- */
function renderNetflixShowcase() {
  const container = document.getElementById('netflixShowcaseGrid');
  if (!container) return;

  container.innerHTML = '';

  const isFullVip = currentUser.role === 'admin' || currentUser.role === 'vip';

  Object.keys(CATEGORIES).forEach(slug => {
    const item = CATEGORIES[slug];
    const isUnlocked = isFullVip || currentUser.unlocked.includes(slug);

    const card = document.createElement('div');
    card.className = `netflix-card ${isUnlocked ? 'unlocked' : 'locked'}`;

    card.innerHTML = `
      <div class="card-poster">
        <img src="${item.poster}" alt="${item.name}" class="poster-image" loading="lazy">
        <span class="poster-category-tag">${item.tag}</span>
        
        ${isUnlocked ? `
          <span class="poster-status-unlocked">
            ✓ Liberado
          </span>
        ` : `
          <!-- ÍCONE DE CADEADO ESCURO SOBREPOSTO -->
          <div class="locked-overlay" onclick="triggerLockedCard('${slug}')">
            <div class="lock-icon-circle">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
              </svg>
            </div>
            <span class="lock-badge">Conteúdo Bloqueado</span>
            <span class="lock-unlock-hint">Clique para liberar (1-clique)</span>
          </div>
        `}
      </div>

      <div class="card-info">
        <div>
          <h4 class="card-title">${item.name}</h4>
          <p class="card-desc">${item.desc}</p>
        </div>

        <div class="card-footer">
          <span style="color: ${isUnlocked ? '#16A34A' : '#64748B'}; font-weight: 800;">
            ${isUnlocked ? 'Disponível Agora' : 'Acesso Restrito'}
          </span>
          <button class="btn-open-product" onclick="${isUnlocked ? `openProductContent('${slug}')` : `triggerLockedCard('${slug}')`}">
            ${isUnlocked ? 'Acessar Manual' : 'Liberar por R$ 14,90'}
          </button>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

/* --------------------------------------------------------------------
   4. MODAL DE UPSELL / CONTEÚDO BLOQUEADO (ESPECIFICADO NO PROMPT)
   * Título: "Conteúdo Bloqueado"
   * Texto: "Você ainda não possui acesso ao Manual [Nome da Categoria]. Deseja liberar o acesso vitalício agora com 1 clique?"
   * Preço exibido: "Apenas R$ 14,90 adicionais".
   * Botão Verde: "LIBERAR CONTEÚDO AGORA".
   -------------------------------------------------------------------- */
window.triggerLockedCard = function(categorySlug) {
  const item = CATEGORIES[categorySlug];
  if (!item) return;

  let modal = document.getElementById('upsellModalContainer');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'upsellModalContainer';
    modal.className = 'modal-backdrop';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-card upsell-modal-card">
      <button class="modal-close-btn" onclick="closeModal('upsellModalContainer')">&times;</button>
      
      <div class="upsell-lock-graphic">
        <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
        </svg>
      </div>

      <h3 class="upsell-modal-title">Conteúdo Bloqueado</h3>
      <p class="upsell-modal-text">
        Você ainda não possui acesso ao Manual <strong>${item.name}</strong>. Deseja liberar o acesso vitalício agora com 1 clique?
      </p>

      <div class="upsell-price-box">
        <div class="upsell-price-label">Oferta de Cross-sell Exclusiva para Membros</div>
        <div class="upsell-price-value">Apenas R$ 14,90 adicionais</div>
        <div style="font-size: 0.8rem; color: #64748B; margin-top: 0.25rem;">Cobrança única no mesmo cartão/chave cadastrada</div>
      </div>

      <button id="btnConfirmUpsell" class="btn-upsell-submit" onclick="executeOneClickUpsell('${categorySlug}')">
        LIBERAR CONTEÚDO AGORA
      </button>

      <div class="upsell-guarantee-note">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16A34A" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        Garantia incondicional de 7 dias com devolução integral
      </div>
    </div>
  `;

  modal.classList.add('active');
};

/* Execução do Upsell com 1 Clique */
window.executeOneClickUpsell = function(categorySlug) {
  const btn = document.getElementById('btnConfirmUpsell');
  btn.innerText = 'Processando liberação com 1 clique...';
  btn.style.opacity = '0.8';
  btn.disabled = true;

  setTimeout(() => {
    // Adiciona a categoria às liberadas do usuário
    if (!currentUser.unlocked.includes(categorySlug)) {
      currentUser.unlocked.push(categorySlug);
    }
    saveUserSession();
    closeModal('upsellModalContainer');
    
    // Atualiza interface
    updateUserInterface();
    renderNetflixShowcase();

    // Notificação visual de sucesso
    alert(`🎉 Parabéns! O Manual "${CATEGORIES[categorySlug].name}" foi liberado com sucesso em sua conta!`);
    
    // Abre automaticamente o conteúdo do produto recém-desbloqueado
    openProductContent(categorySlug);
  }, 900);
};

/* --------------------------------------------------------------------
   5. VISUALIZADOR DE CONTEÚDO DO MANUAL DESBLOQUEADO
   -------------------------------------------------------------------- */
window.openProductContent = function(categorySlug) {
  const item = CATEGORIES[categorySlug];
  if (!item) return;

  let modal = document.getElementById('productViewerContainer');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'productViewerContainer';
    modal.className = 'modal-backdrop';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-card product-viewer-modal">
      <button class="modal-close-btn" onclick="closeModal('productViewerContainer')">&times;</button>
      
      <div class="viewer-header">
        <div class="viewer-title-box">
          <span style="font-size: 0.72rem; font-weight: 800; background: #DCFCE7; color: #16A34A; padding: 0.2rem 0.6rem; border-radius: 4px; text-transform: uppercase;">Acesso Ativo</span>
          <h3 style="margin-top: 0.25rem;">${item.name}</h3>
          <p>${item.tagline}</p>
        </div>
      </div>

      <div class="viewer-tabs">
        <button class="viewer-tab-btn active" onclick="switchViewerTab(this, 'tabManual')">📖 Manual em PDF</button>
        <button class="viewer-tab-btn" onclick="switchViewerTab(this, 'tabPlanilha')">📊 Planilha de Custos</button>
        <button class="viewer-tab-btn" onclick="switchViewerTab(this, 'tabScripts')">💬 Scripts Prontos</button>
      </div>

      <!-- Aba 1: Manual -->
      <div id="tabManual" class="viewer-tab-content active">
        <div class="resource-download-card">
          <div class="resource-info">
            <h4>${item.pdfTitle}</h4>
            <p>Guia direto ao ponto, leitura em 25 minutos. Sem teoria inútil.</p>
          </div>
          <a href="#" class="btn-download-resource" onclick="alert('Download do PDF iniciado!'); return false;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
            Baixar PDF
          </a>
        </div>
        <div style="background: #F1F5F9; border-radius: 12px; padding: 1.5rem; margin-top: 1rem; border-left: 4px solid #16A34A;">
          <h5 style="font-weight: 800; margin-bottom: 0.5rem; color: #0F172A;">Roteiro de 24 Horas no Fim de Semana:</h5>
          <ol style="padding-left: 1.25rem; font-size: 0.92rem; color: #334155; line-height: 1.7;">
            <li><strong>Sexta-feira à noite (30 min):</strong> Escolha 1 produto da lista de alta margem do manual e liste os insumos.</li>
            <li><strong>Sábado de manhã (2 horas):</strong> Compra dos insumos e preparação rápida em lote com a técnica do manual.</li>
            <li><strong>Sábado à tarde (1 a 2 horas):</strong> Execução dos scripts de venda ou ativação do ponto estratégico.</li>
            <li><strong>Domingo à noite:</strong> Contagem do lucro líquido com sua planilha automática.</li>
          </ol>
        </div>
      </div>

      <!-- Aba 2: Planilha de Custos Interativa -->
      <div id="tabPlanilha" class="viewer-tab-content">
        <div class="resource-download-card">
          <div class="resource-info">
            <h4>${item.sheetTitle}</h4>
            <p>Calculadora automática de insumos, margem e ponto de equilíbrio.</p>
          </div>
          <a href="#" class="btn-download-resource" onclick="alert('Cópia da Planilha salva no seu Google Drive!'); return false;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
            Abrir Planilha
          </a>
        </div>

        <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px; overflow: hidden; margin-top: 1rem;">
          <table style="width: 100%; border-collapse: collapse; font-size: 0.88rem;">
            <thead>
              <tr style="background: #F8FAFC; text-align: left; border-bottom: 1px solid #E2E8F0;">
                <th style="padding: 0.75rem 1rem;">Item de Composição</th>
                <th style="padding: 0.75rem 1rem;">Valor / Margem Calculada</th>
              </tr>
            </thead>
            <tbody>
              ${item.sheetData.map(row => `
                <tr style="border-bottom: 1px solid #F1F5F9;">
                  <td style="padding: 0.75rem 1rem; color: #0F172A; font-weight: 600;">${row.item}</td>
                  <td style="padding: 0.75rem 1rem; color: #16A34A; font-weight: 800;">${row.custo}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Aba 3: Scripts Prontos -->
      <div id="tabScripts" class="viewer-tab-content">
        <div class="resource-download-card">
          <div class="resource-info">
            <h4>${item.scriptsTitle}</h4>
            <p>Copie, personalize o nome e envie para seus contatos e clientes.</p>
          </div>
        </div>

        <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 1.25rem; margin-top: 1rem;">
          <p style="font-weight: 800; font-size: 0.85rem; color: #0F172A; margin-bottom: 0.5rem; text-transform: uppercase;">
            Modelo de Script de Validação Rápida no WhatsApp:
          </p>
          <div style="background: #FFFFFF; border: 1px solid #CBD5E1; border-radius: 8px; padding: 1rem; font-family: monospace; font-size: 0.85rem; color: #1E293B; line-height: 1.6;">
            "Oi [Nome], tudo bem? Tô passando rápido porque produzi um lote especial de [Nome do Produto] fresquinho hoje com preço de lançamento pra vizinhos e amigos. Tenho só 4 unidades sobrando aqui. Se quiser garantir o seu pro final de semana, me dá um toque que separo agora!"
          </div>
          <button style="margin-top: 0.75rem; background: #0F172A; color: #FFFFFF; border: none; border-radius: 6px; padding: 0.45rem 0.9rem; font-size: 0.78rem; font-weight: 700; cursor: pointer;" onclick="alert('Script copiado para a área de transferência!')">
            📋 Copiar Script
          </button>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('active');
};

window.switchViewerTab = function(btn, tabId) {
  document.querySelectorAll('.viewer-tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.viewer-tab-content').forEach(c => c.classList.remove('active'));

  btn.classList.add('active');
  const targetTab = document.getElementById(tabId);
  if (targetTab) targetTab.classList.add('active');
};
