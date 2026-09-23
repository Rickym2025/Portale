window.allProjects = [];
window.sheetPendingRestaurants = [];
window.loadMasterData = loadMasterData;

// 1. CARICAMENTO DATI DA SUPABASE (S2 PORTALE)
async function loadMasterData() {
    try {
        const data = await fetchSupabaseProjects();
        window.allProjects = data || [];
        applyFilters();
        return true;
    } catch (err) {
        console.error("Errore loadMasterData:", err);
        return false;
    }
}

// 2. RECUPERO RISTORANTI DA FOGLIO GOOGLE (EXPERIENCE)
async function fetchPendingRestaurantsFromSheet() {
    const select = document.getElementById('c-sheet-restaurant');
    if (!select) return;
    select.innerHTML = `<option value="">Caricamento dal Foglio Google...</option>`;
    try {
        const res = await fetch('https://n8n.rmstudio.app/webhook/get-pending-restaurants');
        const data = await res.json();
        if (data.success && data.restaurants && data.restaurants.length > 0) {
            window.sheetPendingRestaurants = data.restaurants;
            let opt = `<option value="">-- Seleziona un Ristorante (${data.restaurants.length} pronti) --</option>`;
            data.restaurants.forEach((r, idx) => {
                opt += `<option value="${idx}">${r.nome || 'Senza Nome'} (${r.sito || 'Nessun Sito'})</option>`;
            });
            select.innerHTML = opt;
        } else {
            select.innerHTML = `<option value="">Nessun ristorante da elaborare nel foglio.</option>`;
        }
    } catch (err) {
        select.innerHTML = `<option value="">Errore connessione Sheet</option>`;
    }
}

function onRestaurantSelectedFromSheet() {
    const idx = document.getElementById('c-sheet-restaurant').value;
    if (idx === "" || !window.sheetPendingRestaurants[idx]) return;
    const r = window.sheetPendingRestaurants[idx];
    if (r.nome) document.getElementById('c-name').value = r.nome;
    if (r.sito) document.getElementById('c-url').value = r.sito;
    if (r.telefono) document.getElementById('c-phone').value = r.telefono;
    document.getElementById('c-title').value = "Smart Experience Page";
    document.getElementById('c-price').value = 390;
}

// 3. AGGIORNAMENTO DINAMICO CAMPI MODALE PER TUTTI I SAAS
function toggleModalFields() {
    const t = document.getElementById('c-type').value;
    const titleInput = document.getElementById('c-title');
    const priceInput = document.getElementById('c-price');
    const urlInput = document.getElementById('c-url');
    const urlLabel = document.getElementById('c-url-label');

    const config = {
        locanda: { title: "Locanda Digitale • Living 3D Menu & Compleanni", price: 169, url: "https://www.ristorante.it", label: "Sito Web o Pagina Social del Locale" },
        radar: { title: "DriveMotion RADAR • Starter Salone", price: 99, url: "https://www.autosalone.it", label: "Sito Web dell'Autosalone / Concessionario" },
        nexus: { title: "NexusAI • Sales Overlay Pro", price: 99, url: "https://www.azienda.it", label: "Sito Web Azienda (per Generazione Shadow-Proxy)" },
        concierge: { title: "Concierge24 • Giulia Voice Assistant H24", price: 179, url: "https://www.hotel.it", label: "Sito Web Struttura Ricettiva (Hotel / B&B)" },
        dentis: { title: "Dentis AI • Serena PRO", price: 149, url: "https://www.sanadent.it/", label: "Sito Web Studio Dentistico (per Scraping AI)" },
        lexis: { title: "Lexis AI • Chiara PRO", price: 149, url: "https://www.studiolegale.it/", label: "Sito Web Studio Legale (per Scraping AI)" },
        eternia: { title: "ETERNIA • Hub Agenzia B2B (10 Cerimonie)", price: 690, url: "https://www.onoranzefunebri.it", label: "Sito Web dell'Impresa Funebre" },
        love: { title: "LOVE • Agency Hub B2B (10 Nozze)", price: 490, url: "https://www.weddingplanner.it", label: "Sito Web Agenzia Wedding Planner" },
        forma_materia: { title: "Forma & Materia • Atelier Pro 4K", price: 249, url: "https://formamateria.rmstudio.app/studio", label: "URL Destinazione Studio" },
        aura: { title: "AURA • Pro Mensile", price: 19, url: "https://aura.rmstudio.app/radar.html", label: "URL Stanza Radar" },
        experience: { title: "Smart Experience Page", price: 390, url: "https://www.ristorante.it", label: "Sito Web Ristorante (per Scraping AI)" },
        html: { title: "SiteEngine Pro • Sito Web", price: 400, url: "https://sitengine.rmstudio.app/lead", label: "URL Sito Web" },
        social: { title: "Carousel Engine", price: 29, url: "https://social.rmstudio.app", label: "URL Destinazione" },
        vision: { title: "Vision UGC Video", price: 50, url: "", label: "URL Destinazione" },
        video: { title: "HomeTour Video", price: 59, url: "", label: "URL Destinazione" },
        license: { title: "Licenza Software", price: 290, url: "", label: "URL Destinazione" }
    };

    if (config[t]) {
        if (titleInput) titleInput.value = config[t].title;
        if (priceInput) priceInput.value = config[t].price;
        if (urlInput) urlInput.placeholder = config[t].url;
        if (urlLabel) urlLabel.innerText = config[t].label;
    }

    const sheetBox = document.getElementById('experience-sheet-select-box');
    if (sheetBox) sheetBox.classList.toggle('hidden', t !== 'experience');
    if (t === 'experience') fetchPendingRestaurantsFromSheet();

    const isFile = (t === 'video' || t === 'vision');
    const fileBox = document.getElementById('file-upload-box');
    const linkBox = document.getElementById('link-input-box');
    if (fileBox) fileBox.classList.toggle('hidden', !isFile);
    if (linkBox) linkBox.classList.toggle('hidden', isFile);
}

function getDaysAgo(dateStr) {
    if (!dateStr) return "";
    const diff = Math.floor(Math.abs(new Date() - new Date(dateStr)) / (1000 * 60 * 60 * 24));
    return diff === 0 ? "Oggi" : (diff === 1 ? "1 gg fa" : `${diff} gg fa`);
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const icon = document.getElementById('sidebar-icon');
    if (!sidebar) return;
    sidebar.classList.toggle('sidebar-collapsed');
    const isCol = sidebar.classList.contains('sidebar-collapsed');
    if (icon) icon.className = isCol ? 'fa-solid fa-chevron-right' : 'fa-solid fa-chevron-left';
    localStorage.setItem('sidebar_collapsed', isCol ? 'true' : 'false');
}

function applyFilters() {
    const fType = document.getElementById('filter-type')?.value || 'all';
    const fName = (document.getElementById('filter-name')?.value || '').toLowerCase().trim();
    const fPaid = document.getElementById('filter-paid')?.value || 'all';

    const filtered = (window.allProjects || []).filter(p => {
        if (fType !== 'all' && p.portal_type !== fType) return false;
        const match = (p.client_name || '').toLowerCase().includes(fName) || 
                      (p.client_email || '').toLowerCase().includes(fName) || 
                      (p.title || '').toLowerCase().includes(fName);
        if (!match) return false;
        const isPaid = p.is_paid === true || p.is_paid === "true";
        if (fPaid === 'paid' && !isPaid) return false;
        if (fPaid === 'unpaid' && isPaid) return false;
        return true;
    });

    renderMasterTable(filtered);
}

// 🎯 GESTIONE RESET VISITE & STATO LETTURA PULITO
async function handleViewsChange(id, value) {
    const count = parseInt(value, 10);
    const validCount = isNaN(count) || count < 0 ? 0 : count;
    const isOpened = validCount > 0;

    const payload = {
        views_count: validCount,
        is_opened: isOpened
    };

    try {
        const { error } = await supabaseClient.from('portal_videos').update(payload).eq('id', id);
        if (error) throw error;

        const proj = (window.allProjects || []).find(p => p.id === id);
        if (proj) {
            proj.views_count = validCount;
            proj.is_opened = isOpened;
        }
        applyFilters();
    } catch (err) {
        alert("Errore aggiornamento visite: " + err.message);
    }
}

// 🎯 GESTIONE UNIFICATA CHECKBOX OUTREACH (WHATSAPP O EMAIL)
async function handleOutreachToggle(id, isChecked) {
    const payload = {
        is_whatsapp_sent: isChecked,
        first_email_sent: isChecked
    };

    try {
        const { error } = await supabaseClient.from('portal_videos').update(payload).eq('id', id);
        if (error) throw error;

        const proj = (window.allProjects || []).find(p => p.id === id);
        if (proj) {
            proj.is_whatsapp_sent = isChecked;
            proj.first_email_sent = isChecked;
        }
        applyFilters();
    } catch (err) {
        alert("Errore aggiornamento stato invio: " + err.message);
    }
}

function renderMasterTable(data) {
    let rev = 0, paidCount = 0, total = data.length;
    data.forEach(p => {
        if (p.is_paid === true || p.is_paid === "true") {
            rev += parseFloat(p.price_euro || 0);
            paidCount++;
        }
    });

    const elRev = document.getElementById('stat-revenue');
    const elTot = document.getElementById('stat-total');
    const elRat = document.getElementById('stat-ratio');
    const elCr = document.getElementById('stat-cr');

    if (elRev) elRev.innerText = `€${rev.toFixed(2)}`;
    if (elTot) elTot.innerText = total;
    if (elRat) elRat.innerText = `${paidCount} / ${total}`;
    if (elCr) elCr.innerText = total > 0 ? Math.round((paidCount / total) * 100) + '%' : '0%';

    const container = document.getElementById('master-table-body');
    if (!container) return;
    container.innerHTML = '';

    if (data.length === 0) {
        container.innerHTML = `<tr><td colspan="10" class="p-8 text-center text-gray-400 font-semibold text-base">Nessun progetto trovato.</td></tr>`;
        return;
    }

    data.forEach(p => {
        const tr = document.createElement('tr');
        tr.className = "hover:bg-[#101015] transition border-b border-zinc-900/80";

        const isPaid = p.is_paid === true || p.is_paid === "true";
        const views = parseInt(p.views_count || 0, 10);
        
        // 🔒 UN PROGETTO È LETTO SOLO SE LE VISITE SONO > 0 E IS_OPENED È VERO
        const isOpenedFlag = p.is_opened === true || p.is_opened === "true";
        const isRead = views > 0 && isOpenedFlag;

        const emailSent = p.first_email_sent === true || p.first_email_sent === "true";
        const waSent = p.is_whatsapp_sent === true || p.is_whatsapp_sent === "true";
        const isContacted = waSent || emailSent;
        
        // 🔒 URL SICURO: Finché non è pagato, apre SEMPRE la pagina con filigrana view.html!
        const portalUrl = `https://portale.rmstudio.app/view?id=${p.id}`;
        const targetUrl = isPaid ? (p.content_url || portalUrl) : portalUrl;

        const sendDateFormatted = p.sent_at ? new Date(p.sent_at).toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit' }) : null;
        const sendDaysAgo = getDaysAgo(p.sent_at);
        const openDateFormatted = p.updated_at ? new Date(p.updated_at).toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit' }) : null;
        const openDaysAgo = getDaysAgo(p.updated_at);

        // 🏷️ BADGES COMPATTI CON WHITESPACE-NOWRAP
        const badges = {
            locanda: `<span class="bg-amber-500/15 text-amber-300 border border-amber-500/30 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase whitespace-nowrap inline-flex items-center gap-1">🍽️ locanda</span>`,
            radar: `<span class="bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase whitespace-nowrap inline-flex items-center gap-1">🏎️ radar</span>`,
            nexus: `<span class="bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase whitespace-nowrap inline-flex items-center gap-1">🤖 nexus</span>`,
            dentis: `<span class="bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase whitespace-nowrap inline-flex items-center gap-1">🦷 dentis</span>`,
            lexis: `<span class="bg-yellow-500/15 text-yellow-300 border border-yellow-500/30 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase whitespace-nowrap inline-flex items-center gap-1">⚖️ lexis</span>`,
            concierge: `<span class="bg-orange-500/15 text-orange-300 border border-orange-500/30 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase whitespace-nowrap inline-flex items-center gap-1">🏨 concierge</span>`,
            forma_materia: `<span class="bg-amber-500/15 text-amber-300 border border-amber-500/30 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase whitespace-nowrap inline-flex items-center gap-1">🏛️ f&amp;m</span>`,
            aura: `<span class="bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase whitespace-nowrap inline-flex items-center gap-1">📡 aura</span>`,
            eternia: `<span class="bg-amber-500/10 text-amber-300 border border-amber-500/30 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase whitespace-nowrap inline-flex items-center gap-1">🕊️ eternia</span>`,
            love: `<span class="bg-pink-500/10 text-pink-300 border border-pink-500/30 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase whitespace-nowrap inline-flex items-center gap-1">💍 love</span>`,
            html: `<span class="bg-blue-500/15 text-blue-300 border border-blue-500/30 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase whitespace-nowrap inline-flex items-center gap-1">🌐 siteengine</span>`
        };

        const typeBadge = badges[p.portal_type] || `<span class="bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase whitespace-nowrap inline-flex items-center gap-1">${p.portal_type || 'html'}</span>`;

        // 🔥 IL TASTO VIP COMPARE SOLO SE LETTO E NON ANCORA PAGATO
        let closingPitchBtn = '';
        if (isRead && !isPaid) {
            closingPitchBtn = `<button onclick="openClosingPitchModal('${p.id}')" class="bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/40 px-2 py-1 rounded-lg text-xs font-black transition animate-pulse" title="Pitch Chiusura Dedicato"><i class="fa-solid fa-fire"></i> VIP</button>`;
        }

        // Indicatori canali usati per il contatto
        let channelIndicators = '';
        if (waSent) channelIndicators += `<i class="fa-brands fa-whatsapp text-emerald-400 text-xs" title="Inviato su WhatsApp"></i>`;
        if (emailSent) channelIndicators += `<i class="fa-solid fa-envelope text-blue-400 text-xs" title="Inviato via Email"></i>`;

        // 🚦 PIPELINE LOGICA A 3 STATI (NON INVIATA / INVIATA / LETTA)
        let statusHtml = '';
        if (isRead) {
            statusHtml = `
                <div class="text-green-400 font-extrabold text-[11px]">
                    <i class="fa-solid fa-eye animate-pulse"></i> Letta (${views}v) ${openDateFormatted || ''} 
                    <span class="text-emerald-500 font-bold">(${openDaysAgo || 'Oggi'})</span>
                </div>
            `;
        } else if (isContacted) {
            statusHtml = `
                <div class="space-y-0.5">
                    <div class="text-amber-400 font-bold text-[11px]">
                        <i class="fa-solid fa-paper-plane"></i> Inviata ${sendDateFormatted || ''} 
                        <span class="text-zinc-500 font-normal">(${sendDaysAgo || 'Oggi'})</span>
                    </div>
                    <div class="text-zinc-500 text-[10px] font-medium pl-4">In attesa di apertura</div>
                </div>
            `;
        } else {
            statusHtml = `
                <div class="text-zinc-500 text-[11px] font-semibold flex items-center gap-1.5">
                    <i class="fa-regular fa-clock text-zinc-600"></i> Non ancora inviata
                </div>
            `;
        }

        tr.innerHTML = `
            <td class="p-4 text-center whitespace-nowrap min-w-[125px]">
                ${typeBadge}
                <span class="font-mono text-xs text-gray-400 block mt-1 font-bold">#${p.id ? p.id.substring(0, 4).toUpperCase() : '---'}</span>
            </td>
            <td class="p-4">
                <input type="text" value="${p.client_name || ''}" placeholder="Nome Cliente" onchange="updateSupabaseField('${p.id}', 'client_name', this.value)" class="bg-transparent border-b border-transparent hover:border-zinc-700 focus:border-purple-500 focus:outline-none font-extrabold text-white text-sm block w-full mb-1">
                <input type="email" value="${p.client_email || ''}" placeholder="Email" onchange="updateSupabaseField('${p.id}', 'client_email', this.value)" class="bg-transparent border-b border-transparent hover:border-zinc-700 focus:border-purple-500 focus:outline-none text-xs text-gray-400 w-full block">
                <input type="text" value="${p.client_phone || ''}" placeholder="Telefono" onchange="updateSupabaseField('${p.id}', 'client_phone', this.value)" class="bg-transparent border-b border-transparent hover:border-zinc-700 focus:border-purple-500 focus:outline-none text-xs text-gray-400 w-full block font-mono">
            </td>
            <td class="p-4">
                <input type="text" value="${p.title || ''}" placeholder="Titolo" onchange="updateSupabaseField('${p.id}', 'title', this.value)" class="bg-transparent border-b border-transparent hover:border-zinc-700 focus:border-purple-500 focus:outline-none text-xs text-gray-200 font-bold w-full">
            </td>
            <td class="p-4 whitespace-nowrap">
                <a href="${targetUrl}" target="_blank" class="inline-flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 ${isPaid ? 'text-emerald-400 border-emerald-500/30' : 'text-purple-300 border-zinc-800'} border px-3 py-1.5 rounded-lg text-xs font-bold transition truncate max-w-[140px] shadow-sm whitespace-nowrap">
                    <i class="fa-solid ${isPaid ? 'fa-globe' : 'fa-eye'} text-[10px]"></i> ${isPaid ? 'Sito Live' : 'Bozza'}
                </a>
            </td>
            <td class="p-4">
                <input type="number" value="${p.price_euro || 0}" onchange="updateSupabaseField('${p.id}', 'price_euro', this.value)" class="w-16 bg-[#15151a] border border-zinc-800 rounded-lg p-1.5 text-center font-black text-purple-400 focus:border-purple-500 text-xs font-mono">
            </td>
            <td class="p-4 text-center">
                <input type="number" value="${views}" min="0" onchange="handleViewsChange('${p.id}', this.value)" class="w-12 bg-[#15151a] border border-zinc-800 rounded-lg p-1.5 text-center font-bold text-blue-400 focus:border-purple-500 text-xs font-mono cursor-pointer" title="Modifica visite (imposta 0 per resettare lo stato a Non Letta)">
            </td>
            <td class="p-4 text-center whitespace-nowrap">
                <div class="flex items-center justify-center gap-1.5">
                    <input type="checkbox" ${isContacted ? 'checked' : ''} onchange="handleOutreachToggle('${p.id}', this.checked)" class="w-4 h-4 text-purple-600 bg-zinc-900 border-zinc-800 rounded cursor-pointer" title="Segna come inviato/contattato (WA o Email)">
                    ${channelIndicators}
                </div>
            </td>
            <td class="p-4 text-xs whitespace-nowrap">
                ${statusHtml}
            </td>
            <td class="p-4">
                <button onclick="togglePayment('${p.id}', ${isPaid})" class="px-2.5 py-1 rounded-full text-[11px] font-bold transition cursor-pointer ${isPaid ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'}">
                    ${isPaid ? '✓ Pagato' : '● Attesa'}
                </button>
            </td>
            <td class="p-4 text-right space-x-1 whitespace-nowrap">
                ${closingPitchBtn}
                <button onclick="openMessageModal('${p.id}', 'wa')" class="bg-green-600/20 text-green-400 border border-green-500/30 hover:bg-green-600/40 px-2 py-1 rounded-lg text-xs font-bold cursor-pointer" title="Invia WhatsApp">WA</button>
                <button onclick="openMessageModal('${p.id}', 'mail')" class="bg-purple-600/20 text-purple-300 border border-purple-500/30 hover:bg-purple-600/40 px-2 py-1 rounded-lg text-xs font-bold cursor-pointer" title="Invia Email con Resend">Mail</button>
                <button onclick="handleDelete('${p.id}')" class="text-gray-500 hover:text-red-500 p-1 rounded cursor-pointer" title="Elimina Progetto"><i class="fa-solid fa-trash-can text-xs"></i></button>
            </td>
        `;
        container.appendChild(tr);
    });
}

function openClosingPitchModal(projectId) {
    const project = window.allProjects.find(p => p.id === projectId);
    if (!project) return;

    const name = project.client_name || 'Titolare';
    const title = project.title || 'il vostro locale';
    const portalUrl = `https://portale.rmstudio.app/view?id=${project.id}`;
    const phone = project.client_phone ? project.client_phone.replace(/\D/g, '') : '';

    let text = "";
    if (project.portal_type === 'dentis') {
        text = `Ciao ${name}! 👋\n\nHo visto che avete avuto modo di verificare la scheda tecnica di Serena per ${title}.\n\nSe attivate Serena PRO questa settimana, **vi includiamo GRATIS l'integrazione del gateway WhatsApp per i promemoria automatici ai pazienti del giorno prima** (abbatte le disdette del 72%)!\n\nPotete sbloccare il servizio direttamente da qui:\n${portalUrl}\n\nResto a disposizione per qualsiasi supporto!`;
    } else if (project.portal_type === 'concierge') {
        text = `Ciao ${name}! 👋\n\nHo visto che avete avuto modo di testare l'anteprima per ${title}.\n\nSe attivate Concierge24 questa settimana, **vi accreditiamo 100 minuti omaggio di conversazione AI** nel vostro portafoglio per la stagione!\n\nPotete sbloccare la proposta da qui:\n${portalUrl}\n\nResto a disposizione per qualsiasi prova!`;
    } else if (project.portal_type === 'locanda') {
        text = `Ciao ${name}! 👋\n\nHo visto che hai dato un'occhiata all'anteprima del vostro Living 3D Menu per ${title}.\n\nCi tenevo a farti sapere che sbloccando la proposta questa settimana, oltre ai piatti animati a 60 FPS vi configuriamo **INCLUSO nel pacchetto il Bancomat dei Compleanni automatico su WhatsApp e lo Scudo Recensioni a 5 stelle per Google Maps**! 🎂🍷\n\nPuoi sbloccare il progetto direttamente da qui:\n${portalUrl}\n\nResto a disposizione per qualsiasi chiarimento!`;
    } else {
        text = `Ciao ${name}! 👋\n\nHo visto che hai avuto modo di esplorare l'anteprima creata per ${title}.\n\nSbloccandola questa settimana, **includiamo GRATIS un Jingle Audio d'Autore personalizzato (valore 150€)** realizzato dal nostro studio musicale FF Edizioni!\n\nPuoi rivedere l'anteprima e sbloccarla qui:\n${portalUrl}\n\nResto a disposizione!`;
    }

    document.getElementById('copy-text-area').value = text;
    const waBtn = document.getElementById('copy-wa-direct-link');
    if (phone) {
        waBtn.href = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
        waBtn.classList.remove('hidden');
    } else {
        waBtn.classList.add('hidden');
    }

    document.getElementById('copy-modal').classList.remove('hidden');
    document.getElementById('copy-modal').classList.add('flex');
}

function quickOpenCreate(typeKey) {
    const select = document.getElementById('c-type');
    if (select) {
        select.value = typeKey;
        toggleModalFields();
    }
    openCreationModal();
}

async function togglePayment(id, current) {
    await updateSupabaseField(id, 'is_paid', !current);
    loadMasterData();
}

// 🗑️ ELIMINAZIONE COMPLETA SINCRONIZZATA (S1, S2 E R2)
async function handleDelete(id) {
    if (!confirm("Eliminare definitivamente questo record dal Portale e da tutti i database?")) return;
    try {
        const res = await fetch('https://n8n.rmstudio.app/webhook/delete-portal-video', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        });
        
        if (!res.ok) {
            await supabaseClient.from('portal_videos').delete().eq('id', id);
        }

        await loadMasterData();
    } catch (err) {
        alert("Errore cancellazione: " + err.message);
    }
}

function switchTab(tab) {
    document.getElementById('tab-master')?.classList.toggle('hidden', tab !== 'master');
    document.getElementById('tab-outreach')?.classList.toggle('hidden', tab !== 'outreach');
}

function openCreationModal() {
    const m = document.getElementById('creation-modal');
    if (m) { m.classList.remove('hidden'); m.classList.add('flex'); }
    toggleModalFields();
}

function closeCreationModal() {
    const m = document.getElementById('creation-modal');
    if (m) { m.classList.remove('flex'); m.classList.add('hidden'); }
}

// 4. SUBMIT FORM: DISPATCH SU TUTTI I SAAS
async function handleCreateSubmit(e) {
    e.preventDefault();
    const btn = document.getElementById('c-btn');
    const orig = btn.innerText;
    btn.disabled = true;

    const type = document.getElementById('c-type').value;
    const clientName = document.getElementById('c-name').value.trim();
    const email = document.getElementById('c-email').value.trim();
    const phone = document.getElementById('c-phone').value.trim();
    const price = parseFloat(document.getElementById('c-price').value) || 0;
    const siteUrl = document.getElementById('c-url').value.trim();
    const slug = clientName.toLowerCase().replace(/[^a-z0-9]/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '');

    // 🤖 NEXUSAI: Shadow-Proxy
    if (type === 'nexus') {
        btn.innerText = "Generazione Shadow-Proxy (15s)...";
        let targetUrl = siteUrl;
        if (!/^https?:\/\//i.test(targetUrl)) targetUrl = 'https://' + targetUrl;
        const botId = 'bot_' + Math.random().toString(36).slice(2, 9);

        try {
            const res = await fetch('https://n8n.rmstudio.app/webhook/chatbot-creator', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ site_url: targetUrl, bot_id: botId, nome_struttura: clientName, email: email, is_paid: false })
            });
            const data = await res.json();
            const demoUrl = (data.success && data.demo_url) ? data.demo_url : `https://demo.rmstudio.app/?site=${encodeURIComponent(targetUrl)}&bot_id=${botId}`;

            await supabaseClient.from('portal_videos').insert([{
                client_name: clientName, client_email: email, client_phone: phone,
                title: document.getElementById('c-title').value || "NexusAI • Sales Overlay",
                price_euro: price || 99, portal_type: "nexus", content_url: demoUrl,
                is_paid: false, sent_at: new Date().toISOString(), first_email_sent: false, views_count: 0
            }]);

            alert(`✨ Shadow-Proxy generato per ${clientName}!`);
            closeCreationModal(); loadMasterData();
        } catch (err) {
            alert("⚠️ Errore NexusAI: " + err.message);
        } finally { btn.disabled = false; btn.innerText = orig; }
        return;
    }

    // 🏨 CONCIERGE24
    if (type === 'concierge') {
        btn.innerText = "Configurazione Giulia AI & Scraper...";
        try {
            const res = await fetch('https://n8n.rmstudio.app/webhook/nuova-registrazione', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ "Nome Agenzia": clientName, "Email": email || 'info@hotel.it', "Telefono": phone, "Piano": 'trial', "Sito Web": siteUrl, "Fonte": "Command Center Portale (Bozza Speculativa)" })
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            alert(`✨ Giulia AI configurata per ${clientName}!`);
            closeCreationModal(); setTimeout(loadMasterData, 1500);
        } catch (err) { alert("⚠️ Errore Concierge24: " + err.message); } 
        finally { btn.disabled = false; btn.innerText = orig; }
        return;
    }

    // 🦷 DENTIS & ⚖️ LEXIS
    if (type === 'dentis' || type === 'lexis') {
        btn.innerText = "Configurazione AI & Scraper...";
        try {
            const res = await fetch('https://n8n.rmstudio.app/webhook/studio-registrazione', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ "Nome Agenzia": clientName, "Email": email || 'info@studio.it', "Telefono": phone || '+3904251675950', "Piano": 'trial', "Sito Web": siteUrl, "Settore": type === 'lexis' ? 'legale' : 'odontoiatria', "Fonte": "Command Center Portale (Bozza Speculativa)" })
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            alert(`✨ Assistente AI registrato per ${clientName}!`);
            closeCreationModal(); setTimeout(loadMasterData, 1500);
        } catch (err) { alert("⚠️ Errore attivazione: " + err.message); } 
        finally { btn.disabled = false; btn.innerText = orig; }
        return;
    }

    // 🍽️ LOCANDA DIGITALE
    if (type === 'locanda') {
        btn.innerText = "Registrazione Ristorante...";
        const menuUrl = `https://locandadigitale.rmstudio.app/menu.html?slug=${slug}`;
        try {
            await supabaseClient.from('portal_videos').insert([{
                client_name: clientName, client_email: email, client_phone: phone,
                title: document.getElementById('c-title').value || "Locanda Digitale • Living 3D Menu",
                price_euro: price || 169, portal_type: "locanda", content_url: menuUrl,
                is_paid: false, sent_at: new Date().toISOString(), first_email_sent: false, views_count: 0
            }]);
            alert(`✨ Locanda Digitale registrata! Link tavolo: ${menuUrl}`);
            closeCreationModal(); loadMasterData();
        } catch (err) { alert("⚠️ Errore: " + err.message); } 
        finally { btn.disabled = false; btn.innerText = orig; }
        return;
    }

    // 🏎️ DRIVEMOTION RADAR
    if (type === 'radar') {
        btn.innerText = "Registrazione Concessionario...";
        const radarUrl = `https://drivemotion-radar.rmstudio.app/dashboard.html`;
        try {
            await supabaseClient.from('portal_videos').insert([{
                client_name: clientName, client_email: email, client_phone: phone,
                title: document.getElementById('c-title').value || "DriveMotion RADAR • Starter Salone",
                price_euro: price || 99, portal_type: "radar", content_url: radarUrl,
                is_paid: false, sent_at: new Date().toISOString(), first_email_sent: false, views_count: 0
            }]);
            alert(`✨ Concessionario registrato su DriveMotion RADAR!`);
            closeCreationModal(); loadMasterData();
        } catch (err) { alert("⚠️ Errore: " + err.message); } 
        finally { btn.disabled = false; btn.innerText = orig; }
        return;
    }

    // 🕊️ ETERNIA & 💍 LOVE
    if (type === 'eternia' || type === 'love') {
        btn.innerText = "Attivazione Hub Agenzia B2B...";
        const hubUrl = type === 'eternia' ? `https://eternia.rmstudio.app/agency/${slug}` : `https://love.rmstudio.app/agency/${slug}`;
        try {
            await supabaseClient.from('portal_videos').insert([{
                client_name: clientName, client_email: email, client_phone: phone,
                title: document.getElementById('c-title').value,
                price_euro: price || (type === 'eternia' ? 690 : 490), portal_type: type, content_url: hubUrl,
                is_paid: false, sent_at: new Date().toISOString(), first_email_sent: false, views_count: 0
            }]);
            alert(`✨ Hub Agenzia B2B generato per ${clientName}!`);
            closeCreationModal(); loadMasterData();
        } catch (err) { alert("⚠️ Errore: " + err.message); } 
        finally { btn.disabled = false; btn.innerText = orig; }
        return;
    }

    // 🍷 EXPERIENCE
    if (type === 'experience') {
        btn.innerText = "Analisi Ristorante (20s)...";
        try {
            const res = await fetch('https://n8n.rmstudio.app/webhook/omnia-taste-generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ site_url: siteUrl, phone: phone, nome_ristorante: clientName })
            });
            const data = await res.json();
            if (data.success) {
                alert("✨ Smart Experience Page generata!");
                closeCreationModal(); loadMasterData();
            } else { throw new Error(data.message || "Errore"); }
        } catch (err) { alert("⚠️ Errore: " + err.message); } 
        finally { btn.disabled = false; btn.innerText = orig; }
        return;
    }

    // TUTTI GLI ALTRI PRODOTTI (INCLUSO SITEENGINE PRO)
    btn.innerText = "Salvataggio Supabase...";
    try {
        const { error } = await supabaseClient.from('portal_videos').insert([{
            client_name: clientName, client_email: email, client_phone: phone,
            title: document.getElementById('c-title').value, price_euro: price,
            portal_type: type, content_url: siteUrl, is_paid: false,
            sent_at: new Date().toISOString(), first_email_sent: false, views_count: 0
        }]);
        if (error) throw error;
        alert("Progetto registrato con successo!");
        closeCreationModal(); loadMasterData();
    } catch (err) { alert("Errore salvataggio: " + err.message); } 
    finally { btn.disabled = false; btn.innerText = orig; }
}

// INIZIALIZZAZIONE SIDEBAR RESIZER & CARICAMENTO
document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const resizer = document.getElementById('resizer');
    
    if (sidebar && resizer) {
        if (localStorage.getItem('sidebar_collapsed') === 'true') {
            sidebar.classList.add('sidebar-collapsed');
        } else {
            const savedW = localStorage.getItem('sidebar_width');
            if (savedW) sidebar.style.width = `${savedW}px`;
        }
        let x = 0, w = 0;
        const onMouseMove = (e) => {
            const nw = w + (e.clientX - x);
            if (nw < 120) {
                sidebar.classList.add('sidebar-collapsed');
                localStorage.setItem('sidebar_collapsed', 'true');
            } else {
                sidebar.classList.remove('sidebar-collapsed');
                const finalW = Math.min(Math.max(nw, 220), 480);
                sidebar.style.width = `${finalW}px`;
                localStorage.setItem('sidebar_width', finalW);
                localStorage.setItem('sidebar_collapsed', 'false');
            }
        };
        const onMouseUp = () => {
            resizer.classList.remove('resizing');
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };
        resizer.addEventListener('mousedown', (e) => {
            x = e.clientX;
            w = sidebar.getBoundingClientRect().width;
            resizer.classList.add('resizing');
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });
    }
});
