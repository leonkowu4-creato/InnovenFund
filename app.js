// ============================================
//   INNOVENT FUND — App.js
//   Complete mobile web application logic
// ============================================

const App = (() => {

  // ---- DATA ----
  let state = {
    currentUser: null,
    currentPage: 'home',
    previousPage: null,
    currentProject: null,
    currentConv: null,
    filterOpen: false,
    sidebarOpen: false,
    filterActive: 'Tous',
  };

  const USERS = [
    { id: 1, nom: 'KOWU', prenom: 'Léon', email: 'leon@example.com', password: '1234', role: 'entrepreneur', pays: 'Togo', ville: 'Lomé', telephone: '+228 90 00 00 01', projets: [1, 2], investissements: [] },
    { id: 2, nom: 'AMEKO', prenom: 'Koffi', email: 'koffi@example.com', password: '1234', role: 'investisseur', pays: 'Togo', ville: 'Kpalimé', telephone: '+228 90 00 00 02', projets: [], investissements: [1] },
    { id: 3, nom: 'Admin', prenom: 'InnoventFund', email: 'admin@innoventfund.com', password: 'admin', role: 'admin', pays: 'Togo', ville: 'Lomé', telephone: '+228 00 00 00 00', projets: [], investissements: [] },
  ];

  const PROJECTS = [
    { id: 1, titre: 'AgriConnect Togo', categorie: 'Agriculture', description: 'Plateforme numérique connectant les agriculteurs togolais aux marchés locaux et internationaux via une application mobile simple et intuitive. Nous voulons révolutionner l\'accès aux marchés pour 50 000 agriculteurs.', budget: 5000000, obtenu: 3200000, etat: 'approuvé', auteur_id: 1, auteur: 'Léon K.', ville: 'Lomé, Togo', emoji: '🌾', investisseurs: 8, date: '2025-01-10' },
    { id: 2, titre: 'SolarHome Africa', categorie: 'Énergie', description: 'Kits solaires abordables pour les ménages ruraux sans accès à l\'électricité. Notre solution clé en main permet d\'alimenter une maison entière pour moins de 150 000 FCFA.', budget: 12000000, obtenu: 7800000, etat: 'approuvé', auteur_id: 1, auteur: 'Léon K.', ville: 'Kara, Togo', emoji: '☀️', investisseurs: 15, date: '2025-01-15' },
    { id: 3, titre: 'MediLink Santé', categorie: 'Santé', description: 'Application de télémédecine pour les zones rurales du Togo. Mise en relation entre patients et médecins via vidéo, avec suivi médical personnalisé et ordonnances numériques.', budget: 8000000, obtenu: 8000000, etat: 'financé', auteur_id: 2, auteur: 'Koffi A.', ville: 'Sokodé, Togo', emoji: '🏥', investisseurs: 22, date: '2025-01-05' },
    { id: 4, titre: 'EduTech Lycée+', categorie: 'Education', description: 'Plateforme d\'e-learning pour lycéens togolais avec des cours en français adaptés au programme national. Accès offline et suivi des progrès en temps réel pour parents et enseignants.', budget: 3500000, obtenu: 900000, etat: 'en attente', auteur_id: 2, auteur: 'Koffi A.', ville: 'Lomé, Togo', emoji: '📚', investisseurs: 3, date: '2025-02-01' },
    { id: 5, titre: 'LogiTruck West Africa', categorie: 'Transport', description: 'Réseau de camionneurs freelance pour livraisons B2B en Afrique de l\'Ouest. Mise en relation entre chargeurs et transporteurs avec traçabilité GPS en temps réel.', budget: 15000000, obtenu: 5000000, etat: 'approuvé', auteur_id: 1, auteur: 'Léon K.', ville: 'Lomé, Togo', emoji: '🚚', investisseurs: 6, date: '2025-01-20' },
    { id: 6, titre: 'PayTogo Mobile', categorie: 'Technologie', description: 'Solution de paiement mobile pour PME togolaises. Acceptez les paiements Mobile Money, cartes bancaires et crypto en un seul tableau de bord. Frais de transaction parmi les plus bas du marché.', budget: 20000000, obtenu: 2000000, etat: 'en attente', auteur_id: 2, auteur: 'Koffi A.', ville: 'Lomé, Togo', emoji: '💳', investisseurs: 2, date: '2025-02-05' },
  ];

  const INVESTISSEMENTS = [
    { id: 1, projet_id: 1, user_id: 2, montant: 500000, statut: 'confirme', date: '2025-01-12' },
    { id: 2, projet_id: 3, user_id: 2, montant: 1500000, statut: 'confirme', date: '2025-01-07' },
    { id: 3, projet_id: 5, user_id: 2, montant: 750000, statut: 'attente', date: '2025-01-21' },
  ];

  const CONVERSATIONS = [
    { id: 1, avec_id: 2, avec_nom: 'Koffi A.', avec_initiale: 'K', projet: 'AgriConnect Togo', messages: [
      { id: 1, de: 2, texte: 'Bonjour Léon, je suis très intéressé par votre projet AgriConnect !', heure: '09:15', date: '2025-01-12' },
      { id: 2, de: 1, texte: 'Bonjour Koffi, merci beaucoup ! Que voulez-vous savoir ?', heure: '09:22', date: '2025-01-12' },
      { id: 3, de: 2, texte: 'Quel est votre modèle de revenus prévu pour les 12 premiers mois ?', heure: '09:25', date: '2025-01-12' },
      { id: 4, de: 1, texte: 'Nous comptons sur les commissions de transaction + abonnement agriculteurs premium.', heure: '09:40', date: '2025-01-12' },
    ]},
    { id: 2, avec_id: 3, avec_nom: 'Admin InnoventFund', avec_initiale: 'A', projet: 'Votre compte', messages: [
      { id: 1, de: 3, texte: 'Bonjour, votre projet SolarHome Africa a été approuvé ! 🎉', heure: '14:00', date: '2025-01-16' },
      { id: 2, de: 1, texte: 'Merci beaucoup ! C\'est une excellente nouvelle.', heure: '14:15', date: '2025-01-16' },
    ]},
  ];

  const NOTIFICATIONS = [
    { id: 1, type: 'invest', texte: 'Koffi A. a investi 500 000 FCFA dans AgriConnect Togo', heure: 'Il y a 2h', lu: false },
    { id: 2, type: 'project', texte: 'Votre projet SolarHome Africa a été approuvé par l\'équipe Innovent Fund', heure: 'Hier', lu: false },
    { id: 3, type: 'message', texte: 'Nouveau message de Koffi A. concernant AgriConnect Togo', heure: 'Hier', lu: false },
    { id: 4, type: 'admin', texte: 'Bienvenue sur Innovent Fund ! Complétez votre profil pour commencer.', heure: 'Il y a 3 jours', lu: true },
    { id: 5, type: 'invest', texte: 'Votre investissement dans MediLink Santé a été confirmé', heure: 'Il y a 5 jours', lu: true },
  ];

  const CATEGORIES = [
    { name: 'Agriculture', emoji: '🌾' },
    { name: 'Technologie', emoji: '💻' },
    { name: 'Santé', emoji: '🏥' },
    { name: 'Education', emoji: '📚' },
    { name: 'Énergie', emoji: '☀️' },
    { name: 'Commerce', emoji: '🛍️' },
    { name: 'Transport', emoji: '🚚' },
    { name: 'Autre', emoji: '💡' },
  ];

  // ---- UTILS ----
  function $(id) { return document.getElementById(id); }
  function fmt(n) { return new Intl.NumberFormat('fr-FR').format(n); }
  function percent(a, b) { return Math.min(100, Math.round((a / b) * 100)); }

  function showToast(msg, type = '') {
    const t = $('toast');
    t.textContent = msg;
    t.className = `toast show ${type}`;
    setTimeout(() => t.className = 'toast', 2500);
  }

  function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    $(id).classList.add('active');
  }

  // ---- AUTH ----
  function login() {
    const email = $('login-email').value;
    const password = $('login-password').value;
    const user = USERS.find(u => u.email === email && u.password === password);
    if (!user) { showToast('Email ou mot de passe incorrect', 'error'); return; }
    _loginAs(user);
  }

  function demoLogin(role) {
    const user = USERS.find(u => u.role === role);
    if (user) _loginAs(user);
  }

  function _loginAs(user) {
    state.currentUser = user;
    showScreen('app');
    setupUserUI();
    showPage('home');
    showToast(`Bienvenue ${user.prenom} ! 👋`);
  }

  function register() {
    showToast('Compte créé avec succès ! Connexion...', 'success');
    setTimeout(() => demoLogin('entrepreneur'), 1000);
  }

  function logout() {
    state.currentUser = null;
    toggleSidebar();
    showScreen('auth');
    showToast('À bientôt !');
  }

  // ---- AUTH TABS ----
  document.querySelectorAll('.auth-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
      tab.classList.add('active');
      $(`form-${tab.dataset.tab}`).classList.add('active');
    });
  });

  // ---- SETUP UI ----
  function setupUserUI() {
    const u = state.currentUser;
    const initiale = u.prenom[0].toUpperCase();
    const fullname = `${u.prenom} ${u.nom}`;

    $('topbar-avatar').textContent = initiale;
    $('sidebar-avatar').textContent = initiale;
    $('sidebar-name').textContent = fullname;
    $('sidebar-role').textContent = u.role.charAt(0).toUpperCase() + u.role.slice(1);

    // Show/hide menu items by role
    const isEntrepreneur = u.role === 'entrepreneur';
    const isInvestisseur = u.role === 'investisseur';
    const isAdmin = u.role === 'admin';

    $('menu-mes-projets').style.display = (isEntrepreneur || isAdmin) ? 'flex' : 'none';
    $('menu-invest').style.display = (isInvestisseur || isAdmin) ? 'flex' : 'none';
    $('menu-admin').style.display = isAdmin ? 'flex' : 'none';
    $('nav-add').style.display = isEntrepreneur ? 'flex' : 'none';

    // Notification badge
    const unread = NOTIFICATIONS.filter(n => !n.lu).length;
    $('notif-badge').textContent = unread;
    $('notif-badge').style.display = unread > 0 ? 'flex' : 'none';
  }

  // ---- NAVIGATION ----
  function showPage(page) {
    state.previousPage = state.currentPage;
    state.currentPage = page;

    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const target = $(`page-${page}`);
    if (target) target.classList.add('active');

    // Update bottom nav
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    const navBtn = document.querySelector(`.nav-item[data-page="${page}"]`);
    if (navBtn) navBtn.classList.add('active');

    // Render page content
    renderPage(page);
  }

  function goBack() {
    if (state.previousPage) showPage(state.previousPage);
    else showPage('home');
  }

  function renderPage(page) {
    switch(page) {
      case 'home': renderHome(); break;
      case 'projets': renderProjets(); break;
      case 'mes-projets': renderMesProjets(); break;
      case 'investissements': renderInvestissements(); break;
      case 'messagerie': renderMessagerie(); break;
      case 'notifications': renderNotifications(); break;
      case 'profil': renderProfil(); break;
      case 'admin': renderAdmin(); break;
    }
  }

  // ---- HOME ----
  function renderHome() {
    const u = state.currentUser;
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Bonjour' : hour < 18 ? 'Bon après-midi' : 'Bonsoir';

    $('hero-greeting').textContent = greeting + ' 👋';
    $('hero-name').textContent = u.prenom;
    $('hero-sub').textContent = u.role === 'investisseur' ? 'Découvrez des projets à financer' : 'Partagez votre vision avec le monde';

    // Featured projects (approved)
    const featured = PROJECTS.filter(p => p.etat === 'approuvé').slice(0, 4);
    $('featured-projects').innerHTML = featured.map(p => renderProjectCard(p, 'featured')).join('');

    // Categories
    $('categories-grid').innerHTML = CATEGORIES.map(c => `
      <div class="category-item" onclick="App.filterByCategory('${c.name}')">
        <div class="cat-icon">${c.emoji}</div>
        <div class="cat-name">${c.name}</div>
      </div>
    `).join('');

    // Recent projects
    const recent = [...PROJECTS].sort((a,b) => b.id - a.id).slice(0, 3);
    $('recent-projects').innerHTML = recent.map(p => renderProjectCard(p, 'list')).join('');
  }

  // ---- PROJECTS ----
  function renderProjets(filter = null) {
    const chips = ['Tous', ...CATEGORIES.map(c => c.name)];
    $('filter-chips').innerHTML = chips.map(c => `
      <div class="filter-chip ${state.filterActive === c ? 'active' : ''}" onclick="App.setFilter('${c}')">${c}</div>
    `).join('');

    let projects = PROJECTS.filter(p => p.etat !== 'rejeté');
    if (state.filterActive !== 'Tous') projects = projects.filter(p => p.categorie === state.filterActive);

    const q = $('search-input')?.value?.toLowerCase();
    if (q) projects = projects.filter(p => p.titre.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));

    $('all-projects').innerHTML = projects.length
      ? projects.map(p => renderProjectCard(p, 'list')).join('')
      : `<div class="empty-state"><div class="empty-icon">🔍</div><h4>Aucun projet trouvé</h4><p>Essayez d'autres filtres</p></div>`;
  }

  function setFilter(cat) {
    state.filterActive = cat;
    renderProjets();
  }

  function filterByCategory(cat) {
    state.filterActive = cat;
    showPage('projets');
  }

  function searchProjects() { renderProjets(); }

  function toggleFilter() {
    state.filterOpen = !state.filterOpen;
    $('filter-panel').classList.toggle('open', state.filterOpen);
  }

  // ---- MY PROJECTS ----
  function renderMesProjets() {
    const u = state.currentUser;
    const myProjects = u.role === 'admin' ? PROJECTS : PROJECTS.filter(p => p.auteur_id === u.id);
    $('mes-projets-list').innerHTML = myProjects.length
      ? myProjects.map(p => renderProjectCard(p, 'list', true)).join('')
      : `<div class="empty-state"><div class="empty-icon">🚀</div><h4>Aucun projet pour l'instant</h4><p>Publiez votre premier projet et attirez des investisseurs !</p><br><button class="btn-primary" onclick="App.showPage('nouveau-projet')">+ Créer un projet</button></div>`;
  }

  // ---- PROJECT CARD ----
  function renderProjectCard(p, type = 'featured', showStatus = false) {
    const pct = percent(p.obtenu, p.budget);
    const badgeClass = { 'approuvé': 'badge-approved', 'en attente': 'badge-pending', 'financé': 'badge-funded', 'rejeté': 'badge-rejected' }[p.etat] || '';
    const badgeLabel = { 'approuvé': '✓ Approuvé', 'en attente': '⏳ En attente', 'financé': '🎉 Financé', 'rejeté': '✗ Rejeté' }[p.etat] || '';

    if (type === 'featured') {
      return `<div class="project-card featured" onclick="App.openProject(${p.id})">
        <div class="card-img">
          <span style="font-size:48px">${p.emoji}</span>
          <div class="card-badge ${badgeClass}">${badgeLabel}</div>
        </div>
        <div class="card-body">
          <div class="card-category">${p.categorie}</div>
          <div class="card-title">${p.titre}</div>
          <div class="card-progress">
            <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
            <div class="progress-text"><span>${pct}%</span><span>${fmt(p.investisseurs)} invest.</span></div>
          </div>
          <div class="card-footer">
            <span class="card-amount">${fmt(p.obtenu)} FCFA</span>
            <span class="card-location">📍 ${p.ville.split(',')[0]}</span>
          </div>
        </div>
      </div>`;
    }

    return `<div class="project-card list-card" onclick="App.openProject(${p.id})">
      <div class="card-img">
        <span>${p.emoji}</span>
        ${showStatus ? `<div class="card-badge ${badgeClass}" style="font-size:10px">${badgeLabel}</div>` : ''}
      </div>
      <div class="card-body">
        <div class="card-category">${p.categorie}</div>
        <div class="card-title">${p.titre}</div>
        <div class="card-progress">
          <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
          <div class="progress-text"><span>${pct}% financé</span><span>/${fmt(p.budget)} FCFA</span></div>
        </div>
        <div class="card-footer">
          <span class="card-amount">${fmt(p.obtenu)} FCFA</span>
          <span class="card-location">📍 ${p.ville.split(',')[0]}</span>
        </div>
      </div>
    </div>`;
  }

  // ---- PROJECT DETAIL ----
  function openProject(id) {
    const p = PROJECTS.find(p => p.id === id);
    if (!p) return;
    state.currentProject = p;
    const pct = percent(p.obtenu, p.budget);
    const u = state.currentUser;
    const isOwner = p.auteur_id === u.id;
    const canInvest = u.role === 'investisseur' && p.etat === 'approuvé';

    $('detail-projet-content').innerHTML = `
      <div class="detail-img"><span style="font-size:80px">${p.emoji}</span></div>
      <div class="detail-body">
        <div class="detail-cat">${p.categorie}</div>
        <div class="detail-title">${p.titre}</div>
        <div class="detail-author">Par ${p.auteur} · 📍 ${p.ville}</div>
        <div class="detail-progress">
          <div class="progress-bar" style="height:10px"><div class="progress-fill" style="width:${pct}%"></div></div>
          <div class="detail-amounts">
            <span>${fmt(p.obtenu)} FCFA levés</span>
            <span>Objectif: ${fmt(p.budget)} FCFA</span>
          </div>
        </div>
        <div class="detail-stats">
          <div class="dstat"><div class="dstat-val">${pct}%</div><div class="dstat-label">Financé</div></div>
          <div class="dstat"><div class="dstat-val">${p.investisseurs}</div><div class="dstat-label">Investisseurs</div></div>
          <div class="dstat"><div class="dstat-val">${fmt(p.budget - p.obtenu)}</div><div class="dstat-label">Reste (FCFA)</div></div>
        </div>
        <div class="detail-section">
          <h4>À propos du projet</h4>
          <p>${p.description}</p>
        </div>
        <div class="detail-section">
          <h4>Statut</h4>
          <p>Ce projet est actuellement <strong>${p.etat}</strong>.</p>
        </div>
        <div style="height:80px"></div>
      </div>
    `;

    // Action buttons
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'detail-actions';
    if (canInvest) {
      actionsDiv.innerHTML = `
        <button class="btn-ghost" onclick="App.openConvWithProject(${p.auteur_id})">💬 Contacter</button>
        <button class="btn-primary" onclick="App.openModal('invest')">💰 Investir</button>
      `;
    } else if (isOwner) {
      actionsDiv.innerHTML = `
        <button class="btn-ghost full">✏️ Modifier le projet</button>
      `;
    } else {
      actionsDiv.innerHTML = `
        <button class="btn-primary full" onclick="App.openConvWithProject(${p.auteur_id})">💬 Contacter l'entrepreneur</button>
      `;
    }
    $('detail-projet-content').appendChild(actionsDiv);

    $('modal-invest-project').textContent = `Projet : ${p.titre}`;
    showPage('detail-projet');
  }

  function openConvWithProject(auteurId) {
    const conv = CONVERSATIONS.find(c => c.avec_id === auteurId) || CONVERSATIONS[0];
    openConversation(conv.id);
  }

  // ---- SUBMIT PROJECT ----
  function submitProject(e) {
    e.preventDefault();
    const titre = $('proj-titre').value;
    const newP = {
      id: PROJECTS.length + 1,
      titre,
      categorie: $('proj-categorie').value,
      description: $('proj-description').value,
      budget: parseInt($('proj-budget').value),
      obtenu: 0, etat: 'en attente',
      auteur_id: state.currentUser.id,
      auteur: `${state.currentUser.prenom} ${state.currentUser.nom}`,
      ville: $('proj-ville').value || 'Lomé, Togo',
      emoji: CATEGORIES.find(c => c.name === $('proj-categorie').value)?.emoji || '💡',
      investisseurs: 0, date: new Date().toISOString().slice(0,10)
    };
    PROJECTS.push(newP);
    showToast('Projet publié avec succès ! En attente de validation.', 'success');
    e.target.reset();
    showPage('mes-projets');
  }

  // ---- INVESTISSEMENTS ----
  function renderInvestissements() {
    const u = state.currentUser;
    const invests = INVESTISSEMENTS.filter(i => i.user_id === u.id);
    const total = invests.filter(i => i.statut === 'confirme').reduce((s, i) => s + i.montant, 0);
    const confirmes = invests.filter(i => i.statut === 'confirme').length;

    $('invest-summary').innerHTML = `
      <div class="invest-stat">
        <div class="invest-stat-val">${fmt(total)}</div>
        <div class="invest-stat-label">FCFA investis (total)</div>
      </div>
      <div class="invest-stat">
        <div class="invest-stat-val">${confirmes}/${invests.length}</div>
        <div class="invest-stat-label">Investissements confirmés</div>
      </div>
    `;

    $('invest-list').innerHTML = invests.length
      ? invests.map(i => {
          const p = PROJECTS.find(pr => pr.id === i.projet_id);
          return `<div class="invest-item">
            <div class="invest-item-header">
              <div>
                <div class="invest-item-title">${p ? p.titre : 'Projet inconnu'}</div>
                <div style="font-size:12px;color:var(--text-muted);margin-top:4px">${i.date}</div>
              </div>
              <div class="invest-item-amount">${fmt(i.montant)} FCFA</div>
            </div>
            <span class="invest-status ${i.statut}">${i.statut === 'confirme' ? '✓ Confirmé' : i.statut === 'attente' ? '⏳ En attente' : '✗ Annulé'}</span>
            ${p ? `<div style="margin-top:8px"><div class="progress-bar"><div class="progress-fill" style="width:${percent(p.obtenu, p.budget)}%"></div></div></div>` : ''}
          </div>`;
        }).join('')
      : `<div class="empty-state"><div class="empty-icon">💼</div><h4>Aucun investissement</h4><p>Explorez les projets et investissez dans ceux qui vous inspirent.</p><br><button class="btn-primary" onclick="App.showPage('projets')">Explorer les projets</button></div>`;
  }

  // ---- MESSAGERIE ----
  function renderMessagerie() {
    $('conversations-list').innerHTML = CONVERSATIONS.map(c => {
      const last = c.messages[c.messages.length - 1];
      const unread = c.messages.filter(m => m.de !== state.currentUser.id).length;
      return `<div class="conv-item" onclick="App.openConversation(${c.id})">
        <div class="conv-avatar">${c.avec_initiale}</div>
        <div class="conv-info">
          <div class="conv-name">${c.avec_nom}</div>
          <div class="conv-last">${last.texte}</div>
        </div>
        <div class="conv-meta">
          <div class="conv-time">${last.heure}</div>
          ${unread > 0 ? `<div class="conv-unread">${unread}</div>` : ''}
        </div>
      </div>`;
    }).join('') || `<div class="empty-state"><div class="empty-icon">💬</div><h4>Aucune conversation</h4><p>Contactez un entrepreneur ou un investisseur via les projets.</p></div>`;
  }

  function openConversation(id) {
    const conv = CONVERSATIONS.find(c => c.id === id);
    if (!conv) return;
    state.currentConv = conv;

    $('conv-header').innerHTML = `
      <div class="conv-avatar">${conv.avec_initiale}</div>
      <div class="conv-header-info">
        <div class="conv-name">${conv.avec_nom}</div>
        <div class="conv-status">● En ligne</div>
      </div>
    `;

    renderMessages();
    showPage('conversation');
  }

  function renderMessages() {
    const conv = state.currentConv;
    const uid = state.currentUser.id;
    $('messages-area').innerHTML = conv.messages.map(m => `
      <div class="msg ${m.de === uid ? 'sent' : 'received'}">
        <div class="msg-bubble">${m.texte}</div>
        <div class="msg-time">${m.heure}</div>
      </div>
    `).join('');
    $('messages-area').scrollTop = 9999;
  }

  function sendMessage() {
    const input = $('msg-input');
    const txt = input.value.trim();
    if (!txt || !state.currentConv) return;
    const now = new Date();
    const heure = now.getHours().toString().padStart(2,'0') + ':' + now.getMinutes().toString().padStart(2,'0');
    state.currentConv.messages.push({ id: Date.now(), de: state.currentUser.id, texte: txt, heure, date: now.toISOString().slice(0,10) });
    input.value = '';
    renderMessages();
  }

  // ---- NOTIFICATIONS ----
  function renderNotifications() {
    const icons = { invest: '💰', message: '💬', project: '🚀', admin: '🛡️' };
    $('notif-list').innerHTML = NOTIFICATIONS.map(n => `
      <div class="notif-item ${n.lu ? '' : 'unread'}" onclick="App.markRead(${n.id})">
        <div class="notif-icon ${n.type}">${icons[n.type]}</div>
        <div class="notif-content">
          <div class="notif-text">${n.texte}</div>
          <div class="notif-time">${n.heure}</div>
        </div>
        ${!n.lu ? '<div class="notif-dot"></div>' : ''}
      </div>
    `).join('');
  }

  function markRead(id) {
    const n = NOTIFICATIONS.find(n => n.id === id);
    if (n) n.lu = true;
    renderNotifications();
    updateNotifBadge();
  }

  function markAllRead() {
    NOTIFICATIONS.forEach(n => n.lu = true);
    renderNotifications();
    updateNotifBadge();
    showToast('Toutes les notifications lues');
  }

  function updateNotifBadge() {
    const unread = NOTIFICATIONS.filter(n => !n.lu).length;
    $('notif-badge').textContent = unread;
    $('notif-badge').style.display = unread > 0 ? 'flex' : 'none';
  }

  // ---- PROFIL ----
  function renderProfil() {
    const u = state.currentUser;
    const myProjects = PROJECTS.filter(p => p.auteur_id === u.id);
    const myInvests = INVESTISSEMENTS.filter(i => i.user_id === u.id);
    const totalInvest = myInvests.reduce((s, i) => s + i.montant, 0);

    $('profil-content').innerHTML = `
      <div class="profil-header">
        <div class="profil-avatar">${u.prenom[0]}</div>
        <div class="profil-name">${u.prenom} ${u.nom}</div>
        <div class="profil-role">${u.email}</div>
        <div class="profil-badge">${u.role.charAt(0).toUpperCase() + u.role.slice(1)}</div>
      </div>
      <div class="profil-stats">
        <div class="pstat">
          <div class="pstat-val">${myProjects.length}</div>
          <div class="pstat-label">Projets</div>
        </div>
        <div class="pstat">
          <div class="pstat-val">${myInvests.length}</div>
          <div class="pstat-label">Investissements</div>
        </div>
        <div class="pstat">
          <div class="pstat-val">${fmt(totalInvest > 0 ? totalInvest : myProjects.reduce((s,p) => s + p.obtenu, 0))}</div>
          <div class="pstat-label">FCFA ${u.role === 'investisseur' ? 'investis' : 'levés'}</div>
        </div>
      </div>
      <div class="profil-section">
        <h4>Informations personnelles</h4>
        ${[
          ['Prénom', u.prenom],
          ['Nom', u.nom],
          ['Email', u.email],
          ['Téléphone', u.telephone],
          ['Pays', u.pays],
          ['Ville', u.ville],
          ['Rôle', u.role.charAt(0).toUpperCase() + u.role.slice(1)],
        ].map(([l, v]) => `<div class="profil-field"><span class="profil-field-label">${l}</span><span class="profil-field-val">${v}</span></div>`).join('')}
      </div>
    `;
  }

  function editProfil() { showToast('Fonctionnalité de modification en cours...'); }

  // ---- ADMIN ----
  function renderAdmin() {
    const pending = PROJECTS.filter(p => p.etat === 'en attente');
    $('admin-content').innerHTML = `
      <div class="admin-tabs">
        <button class="admin-tab active">Vue d'ensemble</button>
        <button class="admin-tab">Projets</button>
        <button class="admin-tab">Utilisateurs</button>
      </div>
      <div class="admin-stats">
        <div class="admin-stat">
          <div class="admin-stat-val">${PROJECTS.length}</div>
          <div class="admin-stat-label">Total projets</div>
          <div class="admin-stat-trend">↑ +3 ce mois</div>
        </div>
        <div class="admin-stat">
          <div class="admin-stat-val">${USERS.length}</div>
          <div class="admin-stat-label">Utilisateurs</div>
          <div class="admin-stat-trend">↑ +1 ce mois</div>
        </div>
        <div class="admin-stat">
          <div class="admin-stat-val">${pending.length}</div>
          <div class="admin-stat-label">En attente</div>
          <div class="admin-stat-trend" style="color:var(--warning)">À traiter</div>
        </div>
        <div class="admin-stat">
          <div class="admin-stat-val">${fmt(PROJECTS.reduce((s,p) => s + p.obtenu, 0) / 1000000)}M</div>
          <div class="admin-stat-label">FCFA levés</div>
          <div class="admin-stat-trend">↑ +2M ce mois</div>
        </div>
      </div>
      <div style="padding:0 16px 8px"><h3 style="font-family:'Syne',sans-serif;font-size:16px;font-weight:700">Projets en attente (${pending.length})</h3></div>
      ${pending.map(p => `
        <div class="admin-item">
          <div class="admin-item-header">
            <div>
              <div class="admin-item-title">${p.titre}</div>
              <div style="font-size:12px;color:var(--text-muted);margin-top:3px">${p.categorie} · ${p.auteur} · ${p.ville}</div>
            </div>
            <span style="font-size:24px">${p.emoji}</span>
          </div>
          <div style="font-size:13px;color:var(--text-muted);margin-bottom:8px">Budget: ${fmt(p.budget)} FCFA</div>
          <div class="admin-actions">
            <button class="btn-approve" onclick="App.adminAction(${p.id}, 'approuver')">✓ Approuver</button>
            <button class="btn-reject" onclick="App.adminAction(${p.id}, 'rejeter')">✗ Rejeter</button>
          </div>
        </div>
      `).join('') || '<div class="empty-state"><div class="empty-icon">✅</div><h4>Aucun projet en attente</h4></div>'}
      <div style="height:20px"></div>
    `;
  }

  function adminAction(projectId, action) {
    const p = PROJECTS.find(pr => pr.id === projectId);
    if (!p) return;
    p.etat = action === 'approuver' ? 'approuvé' : 'rejeté';
    showToast(`Projet "${p.titre}" ${action === 'approuver' ? 'approuvé ✓' : 'rejeté ✗'}`, action === 'approuver' ? 'success' : 'error');
    renderAdmin();
  }

  // ---- INVEST MODAL ----
  function openModal(type) {
    $(`modal-${type}`).classList.add('open');
  }

  function closeModal(type) {
    $(`modal-${type}`).classList.remove('open');
  }

  function confirmInvest() {
    const amount = parseInt($('invest-amount').value);
    const p = state.currentProject;
    if (!amount || amount <= 0) { showToast('Entrez un montant valide', 'error'); return; }
    if (!p) return;

    p.obtenu += amount;
    p.investisseurs += 1;
    INVESTISSEMENTS.push({ id: Date.now(), projet_id: p.id, user_id: state.currentUser.id, montant: amount, statut: 'confirme', date: new Date().toISOString().slice(0,10) });

    closeModal('invest');
    showToast(`Investissement de ${fmt(amount)} FCFA confirmé ! 🎉`, 'success');
    openProject(p.id);
  }

  // ---- SIDEBAR ----
  function toggleSidebar() {
    state.sidebarOpen = !state.sidebarOpen;
    $('sidebar').classList.toggle('open', state.sidebarOpen);
    $('sidebar-overlay').classList.toggle('open', state.sidebarOpen);
  }

  // ---- ONBOARDING ----
  let onboardSlide = 0;
  $('btn-next').addEventListener('click', () => {
    if (onboardSlide < 2) {
      document.querySelectorAll('.onboard-slide')[onboardSlide].classList.remove('active');
      document.querySelectorAll('.dot')[onboardSlide].classList.remove('active');
      onboardSlide++;
      document.querySelectorAll('.onboard-slide')[onboardSlide].classList.add('active');
      document.querySelectorAll('.dot')[onboardSlide].classList.add('active');
      if (onboardSlide === 2) $('btn-next').textContent = 'Commencer';
    } else {
      showScreen('auth');
    }
  });
  $('btn-skip').addEventListener('click', () => showScreen('auth'));

  // ---- SPLASH ----
  setTimeout(() => {
    $('splash').classList.remove('active');
    $('onboarding').classList.add('active');
  }, 2400);

  // ---- PUBLIC API ----
  return {
    login, demoLogin, register, logout,
    showPage, goBack, openProject, submitProject,
    searchProjects, setFilter, filterByCategory, toggleFilter,
    openConversation, openConvWithProject, sendMessage,
    markRead, markAllRead,
    editProfil,
    adminAction,
    openModal, closeModal, confirmInvest,
    toggleSidebar,
  };

})();
