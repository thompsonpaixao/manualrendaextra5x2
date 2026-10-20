/**
 * MANUAL RENDA EXTRA 5X2 - SCRIPT PRINCIPAL DAS LANDING PAGES
 * Gerencia:
 * 1. Intersection Observer ("Fade In Up" ao rolar a página)
 * 2. Smooth Scroll nativo e via botões
 * 3. Accordion de Perguntas Frequentes (FAQ)
 * 4. Mockup Interativo de Vídeo (VSL Player)
 * 5. Modal de Checkout Simulado com integração direta à Dashboard
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initFaqAccordion();
  initVideoMockup();
  initCheckoutTriggers();
  initSmoothScroll();
});

/* --------------------------------------------------------------------
   1. ANIMAÇÕES FADE IN UP AO ROLAR (INTERSECTION OBSERVER)
   -------------------------------------------------------------------- */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.fade-in-up');
  if (!animatedElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target); // Anima uma única vez
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.12
  });

  animatedElements.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------
   2. SMOOTH SCROLL PARA BOTÕES DO HERO E TOPO
   -------------------------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 60;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* --------------------------------------------------------------------
   3. ACCORDION DO FAQ
   -------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Fecha outros itens para foco limpo
      faqItems.forEach(other => {
        if (other !== item) other.classList.remove('active');
      });

      if (!isActive) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  });
}

/* --------------------------------------------------------------------
   4. MOCKUP INTERATIVO DE VÍDEO
   -------------------------------------------------------------------- */
function initVideoMockup() {
  const videoMockup = document.querySelector('.video-mockup-inner');
  if (!videoMockup) return;

  videoMockup.addEventListener('click', () => {
    openVideoModal();
  });
}

function openVideoModal() {
  let modal = document.getElementById('videoPreviewModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'videoPreviewModal';
    modal.className = 'modal-backdrop';
    modal.innerHTML = `
      <div class="modal-card" style="max-width: 720px; padding: 1.5rem;">
        <button class="modal-close-btn" onclick="closeModal('videoPreviewModal')">&times;</button>
        <div style="aspect-ratio: 16/9; background: #000; border-radius: 12px; display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative; overflow: hidden;">
          <div style="position: absolute; top: 12px; left: 16px; display: flex; align-items: center; gap: 8px;">
            <span style="background: #DC2626; color: #fff; font-size: 11px; font-weight: 800; padding: 2px 8px; border-radius: 4px;">AO VIVO</span>
            <span style="color: #fff; font-size: 13px; font-weight: 600;">Apresentação do Método 5x2</span>
          </div>
          <div style="text-align: center; padding: 2rem;">
            <div style="width: 64px; height: 64px; border-radius: 50%; background: #16A34A; color: #fff; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; animation: pulse-cta 2s infinite;">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </div>
            <p style="color: #fff; font-size: 1.1rem; font-weight: 700; margin-bottom: 0.5rem;">Vídeo Demonstrativo Interativo</p>
            <p style="color: #94A3B8; font-size: 0.88rem; max-width: 460px; margin: 0 auto 1.5rem;">
              "Como usar o seu dia livre para faturar alto sem complicação e sem teorias cansativas."
            </p>
            <a href="#checkout" onclick="closeModal('videoPreviewModal')" class="btn-primary-pulse" style="font-size: 0.95rem; padding: 0.8rem 1.8rem;">
              IR DIRETO PARA A OFERTA
            </a>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  modal.classList.add('active');
}

/* --------------------------------------------------------------------
   5. MODAL DE CHECKOUT SIMULADO E REDIRECIONAMENTO PARA A DASHBOARD
   -------------------------------------------------------------------- */
function initCheckoutTriggers() {
  document.querySelectorAll('[data-checkout-plan]').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const planType = button.getAttribute('data-checkout-plan') || 'start';
      const category = button.getAttribute('data-category') || 'alimentacao';
      openCheckoutDrawer(planType, category);
    });
  });
}

function openCheckoutDrawer(planType, category) {
  let modal = document.getElementById('checkoutFlowModal');
  const isVip = planType === 'vip';
  const planTitle = isVip ? 'PLANO VIP (Acesso TOTAL + 4 Manuais + Planilhas)' : `PLANO START (Manual ${formatCategoryName(category)})`;
  const planPrice = isVip ? 'R$ 34,90' : 'R$ 14,90';

  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'checkoutFlowModal';
    modal.className = 'modal-backdrop';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-card">
      <button class="modal-close-btn" onclick="closeModal('checkoutFlowModal')">&times;</button>
      
      <div style="text-align: center; margin-bottom: 1.5rem;">
        <span style="background: rgba(22, 163, 74, 0.1); color: #16A34A; font-size: 0.75rem; font-weight: 800; padding: 0.25rem 0.75rem; border-radius: 9999px; text-transform: uppercase;">
          Ambiente Seguro 256-bit SSL
        </span>
        <h3 style="font-size: 1.45rem; font-weight: 900; margin-top: 0.5rem; color: #0F172A;">Finalizar Pedido</h3>
        <p style="font-size: 0.88rem; color: #64748B;">Seu acesso à Dashboard será liberado instantaneamente</p>
      </div>

      <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 1rem; margin-bottom: 1.25rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
          <span style="font-weight: 800; font-size: 0.95rem; color: #0F172A;">${planTitle}</span>
          <span style="font-weight: 900; font-size: 1.25rem; color: #16A34A;">${planPrice}</span>
        </div>
        <p style="font-size: 0.8rem; color: #64748B;">Pagamento único • Sem mensalidades • Garantia de 7 dias</p>
      </div>

      <div class="payment-methods-tabs">
        <div class="pay-tab active" onclick="switchPaymentTab(this, 'pix')">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 12l10 10 10-10L12 2zm0 3.5L18.5 12 12 18.5 5.5 12 12 5.5z"/></svg>
          PIX (Imediato)
        </div>
        <div class="pay-tab" onclick="switchPaymentTab(this, 'card')">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></svg>
          Cartão de Crédito
        </div>
      </div>

      <form id="checkoutSimulatorForm" onsubmit="handleCheckoutSubmit(event, '${planType}', '${category}')">
        <div class="checkout-form-group">
          <label>Seu Nome Completo</label>
          <input type="text" id="buyerName" placeholder="Ex: Maria Silva" required value="Aluno Exemplo">
        </div>
        <div class="checkout-form-group">
          <label>Seu Melhor E-mail (Para receber os dados de login)</label>
          <input type="email" id="buyerEmail" placeholder="seuemail@exemplo.com" required value="aluno@rendaextra.com">
        </div>
        <div class="checkout-form-group">
          <label>WhatsApp / Celular com DDD</label>
          <input type="tel" id="buyerPhone" placeholder="(11) 99999-9999" required value="(11) 98765-4321">
        </div>

        <button type="submit" class="btn-primary-pulse" style="width: 100%; border-radius: 12px; font-size: 1rem; padding: 1rem; margin-top: 0.5rem;">
          PAGAR ${planPrice} E ACESSAR DASHBOARD
        </button>
      </form>

      <div style="margin-top: 1rem; text-align: center; font-size: 0.78rem; color: #94A3B8;">
        🔒 Dados protegidos e criptografados. Acesso liberado no mesmo segundo.
      </div>
    </div>
  `;

  modal.classList.add('active');
}

window.switchPaymentTab = function(element, type) {
  document.querySelectorAll('.pay-tab').forEach(tab => tab.classList.remove('active'));
  element.classList.add('active');
};

window.handleCheckoutSubmit = function(event, planType, category) {
  event.preventDefault();
  const name = document.getElementById('buyerName').value;
  const email = document.getElementById('buyerEmail').value;

  // Salva no localStorage para simular conta ativa no Dashboard
  const purchaseData = {
    planType: planType, // 'start' ou 'vip'
    unlockedCategory: category, // 'alimentacao', 'na-rua', 'digital', 'artesanato'
    purchasedAt: new Date().toISOString(),
    userName: name,
    userEmail: email
  };

  localStorage.setItem('renda_extra_user_session', JSON.stringify(purchaseData));

  // Feedback e redirecionamento para a Dashboard
  const submitBtn = event.target.querySelector('button[type="submit"]');
  submitBtn.innerText = 'Processando e liberando acesso...';
  submitBtn.style.opacity = '0.7';

  setTimeout(() => {
    window.location.href = 'dashboard.html';
  }, 900);
};

window.closeModal = function(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('active');
};

function formatCategoryName(slug) {
  const map = {
    'alimentacao': 'Alimentação Lucrativa',
    'na-rua': 'Venda Rápida na Rua',
    'digital': 'Operações Digitais Dark',
    'artesanato': 'Artesanato & Presentes'
  };
  return map[slug] || 'Selecionado';
}
