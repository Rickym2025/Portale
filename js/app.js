window.allProjects = [];
window.sheetPendingRestaurants = [];

// ESPOSIZIONE GLOBALE PER AUTH.JS
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

// 3. AGGIORNAMENTO DINAMICO CAMPI MODALE PER SAAS
function toggleModalFields() {
    const t = document.getElementById('c-type').value;
    const titleInput = document.getElementById('c-title');
    const priceInput = document.getElementById('c-price');
    const urlInput = document.getElementById('c-url');
    const urlLabel = document.getElementById('c-url-label');

    const config = {
        dentis: { title: "Dentis AI • Serena PRO", price: 149, url: "https://www.sanadent.it/", label: "Sito Web Studio Dentistico (per Scraping AI)" },
        lexis: { title: "Lexis AI • Chiara PRO", price: 149, url: "https://www.studiolegale.it/", label: "Sito Web Studio Legale (per Scraping AI)" },
        concierge: { title: "Concierge24 • Ricarica Pro", price: 179, url: "https://www.hotel.it/", label: "Sito Web Hotel / B&B" },
        forma_materia: { title: "Forma & Materia • Atelier Pro 4K", price: 249, url: "https://formamateria.rmstudio.app/studio", label: "URL Destinazione Studio" },
        locanda: { title: "Locanda Digitale • Living 3D Menu", price: 169, url: "https://locandadigitale.rmstudio.app/menu.html?slug=locale", label: "URL Living Menu 3D" },
        aura: { title: "AURA • Pro Mensile", price: 19, url: "https://aura.rmstudio.app/radar.html", label: "URL Stanza Radar" },
        eternia: { title: "ETERNIA • Memoriale QR", price: 79, url: "https://eternia.rmstudio.app", label: "URL Memoriale" },
        love: { title: "LOVE • Partecipazioni Digitali", price: 149, url: "https://love.rmstudio.app", label: "URL Partecipazione" },
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
        const isRead = views > 0;
        const emailSent = p.first_email_sent === true || p.first_email_sent === "true";
        const portalUrl = `https://portale.rmstudio.app/view?id=${p.id}`;

        const badges = {
            dentis: `<span class="bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">🦷 dentis</span>`,
            lexis: `<span class="bg-yellow-500/15 text-yellow-300 border border-yellow-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">⚖️ lexis</span>`,
            concierge: `<span class="bg-orange-500/15 text-orange-300 border border-orange-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">🏨 concierge</span>`,
            locanda: `<span class="bg-amber-500/15 text-amber-300 border border-amber-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">🍽️ locanda</span>`,
            forma_materia: `<span class="bg-amber-500/15 text-amber-300 border border-amber-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">🏛️ f&amp;m</span>`,
            aura: `<span class="bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">📡 aura</span>`
        };

        const typeBadge = badges[p.portal_type] || `<span class="bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">${p.portal_type || 'html'}</span>`;

        tr.innerHTML = `
            <td class="p-4 text-center">
                ${typeBadge}
                <span class="font-mono text-xs text-gray-400 block mt-1 font-bold">#${p.id ? p.id.substring(0, 4).toUpperCase() : '---'}</span>
            </td>
            <td class="p-4">
                <input type="text" value="${p.client_name || ''}" placeholder="Nome Cliente" onchange="updateSupabaseField('${p.id}', 'client_name', this.value)" class="bg-transparent border-b border-transparent hover:border-zinc-700 focus:border-purple-500 focus:outline-none font-extrabold text-white text-sm block w-full mb-1">
                <input type="email" value="${p.client_email || ''}" placeholder="Email" onchange="updateSupabaseField('${p.id}', 'client_email', this.value)" class="bg-transparent border-b border-transparent hover:border-zinc-700 focus:border-purple-500 focus:outline-none text-xs text-gray-400 w-full block">
                <input type="text" value="${p.client_phone || ''}" placeholder="Telefono" onchange="updateSupabaseField('${p.id}', 'client_phone', this.value)" class="bg-transparent border-b border-transparent hover:border-zinc-700 focus:border-purple-500 focus:outline-none text-xs text-gray-400 w-full block">
            </td>
            <td class="p-4">
                <input type="text" value="${p.title || ''}" placeholder="Titolo" onchange="updateSupabaseField('${p.id}', 'title', this.value)" class="bg-transparent border-b border-transparent hover:border-zinc-700 focus:border-purple-500 focus:outline-none text-xs text-gray-200 font-bold w-full">
            </td>
            <td class="p-4">
                <a href="${p.content_url || portalUrl}" target="_blank" class="inline-flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 text-purple-400 border border-zinc-800 px-3 py-1.5 rounded-lg text-xs font-bold transition truncate max-w-[130px]">
                    <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i> Link
                </a>
            </td>
            <td class="p-4">
                <input type="number" value="${p.price_euro || 0}" onchange="updateSupabaseField('${p.id}', 'price_euro', this.value)" class="w-16 bg-[#15151a] border border-zinc-800 rounded-lg p-1.5 text-center font-black text-purple-400 focus:border-purple-500 text-xs">
            </td>
            <td class="p-4 text-center">
                <input type="number" value="${views}" onchange="updateSupabaseField('${p.id}', 'views_count', this.value)" class="w-12 bg-[#15151a] border border-zinc-800 rounded-lg p-1.5 text-center font-bold text-blue-400 focus:border-purple-500 text-xs">
            </td>
            <td class="p-4 text-center">
                <input type="checkbox" ${p.is_whatsapp_sent ? 'checked' : ''} onchange="updateSupabaseField('${p.id}', 'is_whatsapp_sent', this.checked)" class="w-4 h-4 text-purple-600 bg-zinc-900 border-zinc-800 rounded">
            </td>
            <td class="p-4 text-xs">
                ${emailSent ? `<div class="text-purple-400 font-bold text-[11px]"><i class="fa-solid fa-paper-plane"></i> Inviata</div>` : ''}
                ${isRead ? `<div class="text-green-400 font-bold text-[11px]"><i class="fa-solid fa-eye"></i> Letta (${views})</div>` : `<div class="text-zinc-500 text-[11px]">Non letta</div>`}
            </td>
            <td class="p-4">
                <button onclick="togglePayment('${p.id}', ${isPaid})" class="px-2.5 py-1 rounded-full text-[11px] font-bold transition ${isPaid ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'}">
                    ${isPaid ? '✓ Pagato' : '● Attesa'}
                </button>
            </td>
            <td class="p-4 text-right space-x-1 whitespace-nowrap">
                <button onclick="openMessageModal('${p.id}', 'wa')" class="bg-green-600/20 text-green-400 border border-green-500/30 hover:bg-green-600/40 px-2 py-1 rounded-lg text-xs font-bold" title="WA">WA</button>
                <button onclick="openMessageModal('${p.id}', 'mail')" class="bg-purple-600/20 text-purple-300 border border-purple-500/30 hover:bg-purple-600/40 px-2 py-1 rounded-lg text-xs font-bold" title="Mail">Mail</button>
                <button onclick="handleDelete('${p.id}')" class="text-gray-500 hover:text-red-500 p-1 rounded" title="Elimina"><i class="fa-solid fa-trash-can text-xs"></i></button>
            </td>
        `;
        container.appendChild(tr);
    });
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

async function handleDelete(id) {
    if (!confirm("Eliminare definitivamente questo record?")) return;
    try {
        const { error } = await supabaseClient.from('portal_videos').delete().eq('id', id);
        if (error) throw error;
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

// 4. SUBMIT FORM CREAZIONE PROGETTI
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

    // 🦷 DENTIS & ⚖️ LEXIS: Invio al vero Webhook di n8n
    if (type === 'dentis' || type === 'lexis') {
        btn.innerText = "Attivazione AI & Scraper in corso...";
        
        let pianoNorm = 'trial';
        if (price >= 299) pianoNorm = 'enterprise';
        else if (price >= 149) pianoNorm = 'pro';

        const payload = {
            "Nome Agenzia": clientName,
            "Email": email || 'info@studiorossi.it',
            "Telefono": phone || '+3904251675950',
            "Piano": pianoNorm,
            "Sito Web": siteUrl,
            "Settore": type === 'lexis' ? 'legale' : 'odontoiatria',
            "Fonte": "Command Center Portale"
        };

        try {
            const res = await fetch('https://n8n.rmstudio.app/webhook/studio-registrazione', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!res.ok) throw new Error(`HTTP ${res.status}`);

            alert(`✨ ${type === 'lexis' ? 'Chiara AI' : 'Serena AI'} avviata per ${clientName}!\nAccount creato, credenziali inviate e scraper in azione.`);
            closeCreationModal();
            setTimeout(loadMasterData, 1500);
        } catch (err) {
            alert("⚠️ Errore attivazione: " + err.message);
        } finally {
            btn.disabled = false;
            btn.innerText = orig;
        }
        return;
    }

    // 🍷 EXPERIENCE: Webhook Taste
    if (type === 'experience') {
        btn.innerText = "Analisi Ristorante in corso (20s)...";
        try {
            const res = await fetch('https://n8n.rmstudio.app/webhook/omnia-taste-generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ site_url: siteUrl, phone: phone, nome_ristorante: clientName })
            });
            const data = await res.json();
            if (data.success) {
                alert("✨ Smart Experience Page generata!");
                closeCreationModal();
                loadMasterData();
            } else {
                throw new Error(data.message || "Errore");
            }
        } catch (err) {
            alert("⚠️ Errore: " + err.message);
        } finally {
            btn.disabled = false;
            btn.innerText = orig;
        }
        return;
    }

    // TUTTI GLI ALTRI PRODOTTI: Inserimento Diretto Supabase S2
    btn.innerText = "Salvataggio Supabase...";
    try {
        const { error } = await supabaseClient.from('portal_videos').insert([{
            client_name: clientName,
            client_email: email,
            client_phone: phone,
            title: document.getElementById('c-title').value,
            price_euro: price,
            portal_type: type,
            content_url: siteUrl,
            is_paid: false,
            sent_at: new Date().toISOString(),
            first_email_sent: false,
            views_count: 0
        }]);

        if (error) throw error;
        alert("Progetto registrato con successo!");
        closeCreationModal();
        loadMasterData();
    } catch (err) {
        alert("Errore salvataggio: " + err.message);
    } finally {
        btn.disabled = false;
        btn.innerText = orig;
    }
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
