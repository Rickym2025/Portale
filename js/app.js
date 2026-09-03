window.allProjects = [];
window.sheetPendingRestaurants = [];

// 1. CARICA I RISTORANTI DA ELABORARE DAL FOGLIO GOOGLE
async function fetchPendingRestaurantsFromSheet() {
    const select = document.getElementById('c-sheet-restaurant');
    if (!select) return;

    select.innerHTML = `<option value="">Caricamento dal Foglio Google in corso...</option>`;

    try {
        console.log("Richiesta ristoranti a n8n...");
        const res = await fetch('https://n8n.rmstudio.app/webhook/get-pending-restaurants');
        
        if (!res.ok) {
            select.innerHTML = `<option value="">Verifica che il workflow get-pending-restaurants sia ATTIVO su n8n!</option>`;
            return;
        }

        const data = await res.json();
        console.log("Dati ricevuti da Google Sheet:", data);

        if (data.success && data.restaurants && data.restaurants.length > 0) {
            window.sheetPendingRestaurants = data.restaurants;
            let optionsHtml = `<option value="">-- Seleziona un Ristorante dal Sheet (${data.restaurants.length} pronti) --</option>`;
            
            data.restaurants.forEach((r, idx) => {
                optionsHtml += `<option value="${idx}">${r.nome || 'Senza Nome'} (${r.sito || 'Nessun Sito'})</option>`;
            });

            select.innerHTML = optionsHtml;
        } else {
            select.innerHTML = `<option value="">Tutti i ristoranti del foglio sono stati elaborati! 🎉</option>`;
        }
    } catch (err) {
        console.error("Errore fetch sheet:", err);
        select.innerHTML = `<option value="">Errore di connessione col Foglio Google</option>`;
    }
}

// 2. AUTO-COMPILAZIONE DEI CAMPI ALLA SELEZIONE DAL MENU A TENDINA
function onRestaurantSelectedFromSheet() {
    const idx = document.getElementById('c-sheet-restaurant').value;
    if (idx === "" || !window.sheetPendingRestaurants[idx]) return;

    const selected = window.sheetPendingRestaurants[idx];

    if (selected.nome) document.getElementById('c-name').value = selected.nome;
    if (selected.sito) document.getElementById('c-url').value = selected.sito;
    if (selected.telefono) document.getElementById('c-phone').value = selected.telefono;
    
    document.getElementById('c-title').value = "Smart Experience Page";
    document.getElementById('c-price').value = 390;
}

// 3. GESTIONE VISIBILITÀ CAMPI E TITOLI NELLA MODALE
function toggleModalFields() {
    const t = document.getElementById('c-type').value;
    const titleInput = document.getElementById('c-title');
    const priceInput = document.getElementById('c-price');
    const urlInput = document.getElementById('c-url');

    if (titleInput) {
        if (t === 'locanda') {
            titleInput.value = "Locanda Digitale • Spot 3D & Menu";
            if (priceInput) priceInput.value = 79;
            if (urlInput) urlInput.placeholder = "https://locandadigitale.rmstudio.app";
        } else if (t === 'eternia') {
            titleInput.value = "ETERNIA • Memoriale QR";
            if (priceInput) priceInput.value = 79;
            if (urlInput) urlInput.placeholder = "https://eternia.rmstudio.app";
        } else if (t === 'love') {
            titleInput.value = "LOVE • Partecipazioni Digitali";
            if (priceInput) priceInput.value = 149;
            if (urlInput) urlInput.placeholder = "https://love.rmstudio.app";
        } else if (t === 'experience') {
            titleInput.value = "Smart Experience Page";
            if (priceInput) priceInput.value = 390;
            if (urlInput) urlInput.placeholder = "https://www.ristorante-esempio.it";
            fetchPendingRestaurantsFromSheet();
        } else if (t === 'social') {
            titleInput.value = "Carousel Engine";
            if (priceInput) priceInput.value = 29;
            if (urlInput) urlInput.placeholder = "https://social.rmstudio.app";
        } else if (t === 'html') {
            titleInput.value = "Sito Web";
            if (priceInput) priceInput.value = 400;
            if (urlInput) urlInput.placeholder = "https://sitengine.rmstudio.app";
        } else if (t === 'vision') {
            titleInput.value = "Vision UGC Video";
            if (priceInput) priceInput.value = 50;
        } else if (t === 'video') {
            titleInput.value = "HomeTour Video";
            if (priceInput) priceInput.value = 59;
        } else if (t === 'voice_ai') {
            titleInput.value = "Voice AI Assistente";
            if (priceInput) priceInput.value = 149;
        } else if (t === 'license') {
            titleInput.value = "Licenza Software";
            if (priceInput) priceInput.value = 290;
        }
    }

    const sheetBox = document.getElementById('experience-sheet-select-box');
    if (sheetBox) sheetBox.classList.toggle('hidden', t !== 'experience');

    const fileBox = document.getElementById('file-upload-box');
    const linkBox = document.getElementById('link-input-box');
    
    // Gestione upload file vs link URL
    const isFileBased = (t === 'video' || t === 'carousel' || t === 'vision');
    if (fileBox) fileBox.classList.toggle('hidden', !isFileBased);
    if (linkBox) linkBox.classList.toggle('hidden', isFileBased);
}

// Helper per calcolare i giorni trascorsi
function getDaysAgo(dateStr) {
    if (!dateStr) return null;
    const past = new Date(dateStr);
    const now = new Date();
    const diffTime = Math.abs(now - past);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return "Oggi";
    if (diffDays === 1) return "1 gg fa";
    return `${diffDays} gg fa`;
}

async function loadMasterData() {
    const data = await fetchSupabaseProjects();
    window.allProjects = data;
    applyFilters();
    return true;
}

// TOGGLE CONTRAZIONE SIDEBAR IN ICON RAIL
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const icon = document.getElementById('sidebar-icon');
    
    sidebar.classList.toggle('sidebar-collapsed');

    if (sidebar.classList.contains('sidebar-collapsed')) {
        if (icon) icon.className = 'fa-solid fa-chevron-right';
        localStorage.setItem('sidebar_collapsed', 'true');
    } else {
        if (icon) icon.className = 'fa-solid fa-chevron-left';
        localStorage.setItem('sidebar_collapsed', 'false');
    }
}

function applyFilters() {
    const fType = document.getElementById('filter-type').value;
    const fName = document.getElementById('filter-name').value.toLowerCase().trim();
    const fPaid = document.getElementById('filter-paid').value;

    const filtered = window.allProjects.filter(p => {
        if (fType !== 'all' && p.portal_type !== fType) return false;
        
        const nameMatch = (p.client_name || '').toLowerCase().includes(fName) || 
                          (p.client_email || '').toLowerCase().includes(fName) || 
                          (p.title || '').toLowerCase().includes(fName);
        if (!nameMatch) return false;

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

    document.getElementById('stat-revenue').innerText = `€${rev.toFixed(2)}`;
    document.getElementById('stat-total').innerText = total;
    document.getElementById('stat-ratio').innerText = `${paidCount} / ${total}`;
    document.getElementById('stat-cr').innerText = total > 0 ? Math.round((paidCount / total) * 100) + '%' : '0%';

    const container = document.getElementById('master-table-body');
    container.innerHTML = '';

    if (data.length === 0) {
        container.innerHTML = `<tr><td colspan="10" class="p-8 text-center text-gray-400 font-semibold text-base">Nessun progetto trovato.</td></tr>`;
        return;
    }

    data.forEach(p => {
        const tr = document.createElement('tr');
        tr.className = "hover:bg-[#101015] transition border-b border-zinc-900/80";

        const isPaid = p.is_paid === true || p.is_paid === "true";
        const views = parseInt(p.views_count || 0);
        
        const isRead = views > 0;
        const emailSent = p.first_email_sent === true || p.first_email_sent === "true";

        const sendDateFormatted = p.sent_at ? new Date(p.sent_at).toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit' }) : null;
        const sendDaysAgo = getDaysAgo(p.sent_at);
        
        const openDateFormatted = p.updated_at ? new Date(p.updated_at).toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit' }) : null;
        const openDaysAgo = getDaysAgo(p.updated_at);

        let typeBadge = `<span class="bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase block w-max mx-auto">${p.portal_type || 'html'}</span>`;

        const portalViewUrl = `https://portale.rmstudio.app/view?id=${p.id}`;

        let closingPitchBtn = '';
        if (isRead && !isPaid) {
            closingPitchBtn = `<button onclick="openClosingPitchModal('${p.id}')" class="bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/40 px-2.5 py-1.5 rounded-lg text-xs font-black transition animate-pulse" title="Pitch Chiusura Jingle"><i class="fa-solid fa-fire"></i> Pitch Jingle</button>`;
        }

        tr.innerHTML = `
            <!-- TIPO E ID -->
            <td class="p-4 text-center">
                ${typeBadge}
                <span class="font-mono text-xs text-gray-400 block mt-1 font-bold">#${p.id ? p.id.substring(0, 4).toUpperCase() : '---'}</span>
            </td>

            <!-- CLIENTE, EMAIL, TELEFONO EDITABILI -->
            <td class="p-4">
                <input type="text" value="${p.client_name || ''}" placeholder="Nome Cliente" onchange="updateSupabaseField('${p.id}', 'client_name', this.value)" class="bg-transparent border-b border-transparent hover:border-zinc-700 focus:border-purple-500 focus:outline-none font-extrabold text-white text-base block w-full mb-1">
                <div class="space-y-1">
                    <input type="email" value="${p.client_email || ''}" placeholder="Inserisci Mail" onchange="updateSupabaseField('${p.id}', 'client_email', this.value)" class="bg-transparent border-b border-transparent hover:border-zinc-700 focus:border-purple-500 focus:outline-none text-xs text-gray-300 w-full block">
                    <input type="text" value="${p.client_phone || ''}" placeholder="Inserisci Telefono" onchange="updateSupabaseField('${p.id}', 'client_phone', this.value)" class="bg-transparent border-b border-transparent hover:border-zinc-700 focus:border-purple-500 focus:outline-none text-xs text-gray-300 w-full block">
                </div>
            </td>

            <!-- TITOLO PROGETTO EDITABILE -->
            <td class="p-4">
                <input type="text" value="${p.title || ''}" placeholder="Titolo Progetto" onchange="updateSupabaseField('${p.id}', 'title', this.value)" class="bg-transparent border-b border-transparent hover:border-zinc-700 focus:border-purple-500 focus:outline-none text-sm text-gray-200 font-bold w-full">
            </td>

            <!-- LINK AL PROGETTO -->
            <td class="p-4">
                <a href="${p.content_url || portalViewUrl}" target="_blank" class="inline-flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 text-purple-400 border border-zinc-800 px-3 py-1.5 rounded-lg text-xs font-bold transition truncate max-w-[130px]">
                    <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i> Apri Link
                </a>
            </td>

            <!-- PREZZO EDITABILE -->
            <td class="p-4">
                <input type="number" value="${p.price_euro || 0}" onchange="updateSupabaseField('${p.id}', 'price_euro', this.value)" class="w-20 bg-[#15151a] border border-zinc-800 rounded-lg p-2 text-center font-black text-purple-400 focus:border-purple-500 focus:outline-none text-sm">
            </td>

            <!-- VISITE EDITABILI -->
            <td class="p-4">
                <input type="number" value="${views}" onchange="updateSupabaseField('${p.id}', 'views_count', this.value)" class="w-16 bg-[#15151a] border border-zinc-800 rounded-lg p-2 text-center font-bold text-blue-400 focus:border-purple-500 focus:outline-none text-sm">
            </td>

            <!-- SPUNTA WA INVIATO EDITABILE -->
            <td class="p-4">
                <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" ${p.is_whatsapp_sent ? 'checked' : ''} onchange="updateSupabaseField('${p.id}', 'is_whatsapp_sent', this.checked)" class="w-4 h-4 text-purple-600 bg-zinc-900 border-zinc-800 rounded focus:ring-purple-500">
                    <span class="ml-2 text-xs text-gray-400">WA</span>
                </label>
            </td>

            <!-- STATO LETTURA, DATE E GIORNI TRANSCORSI -->
            <td class="p-4 text-xs whitespace-nowrap">
                <div class="space-y-1">
                    ${emailSent ? `<div class="text-purple-400 font-bold"><i class="fa-solid fa-paper-plane"></i> Inviata ${sendDateFormatted || ''} <span class="text-gray-500 font-normal">(${sendDaysAgo || ''})</span></div>` : ''}
                    ${isRead 
                        ? `<div class="text-green-400 font-extrabold"><i class="fa-solid fa-eye animate-pulse"></i> Letta (${views}v) ${openDateFormatted ? openDateFormatted : ''} <span class="text-emerald-500 font-bold">(${openDaysAgo || 'Oggi'})</span></div>` 
                        : `<div class="text-zinc-500 font-bold"><i class="fa-solid fa-eye-slash"></i> Non ancora letta</div>`
                    }
                </div>
            </td>

            <!-- PAGAMENTO TOGGLE -->
            <td class="p-4">
                <button onclick="togglePayment('${p.id}', ${isPaid})" class="px-3 py-1.5 rounded-full text-xs font-bold transition ${isPaid ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'}">
                    ${isPaid ? '✓ Pagato' : '● Attesa'}
                </button>
            </td>

            <!-- AZIONI RAPIDE -->
            <td class="p-4 text-right flex items-center justify-end gap-1.5 whitespace-nowrap">
                ${closingPitchBtn}
                <button onclick="sendResendDirectEmail('${p.id}', '${p.client_email || ''}', '${p.client_name || ''}', '${p.title || ''}', '${portalViewUrl}')" class="bg-purple-600/20 text-purple-300 border border-purple-500/30 hover:bg-purple-600/40 px-2.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1" title="Invia Mail con Resend"><i class="fa-solid fa-paper-plane"></i> Mail</button>
                <button onclick="openMessageModal('${p.id}', 'wa')" class="bg-green-600/20 text-green-400 border border-green-500/30 hover:bg-green-600/40 px-2.5 py-1.5 rounded-lg text-xs font-bold transition" title="Copy WA"><i class="fa-brands fa-whatsapp"></i> WA</button>
                <button onclick="handleDelete('${p.id}')" class="text-gray-500 hover:text-red-500 p-1.5 rounded transition" title="Elimina Progetto"><i class="fa-solid fa-trash-can text-sm"></i></button>
            </td>
        `;
        container.appendChild(tr);
    });
}

// INVIO EMAIL DIRETTO VIA RESEND IN 1 CLICK
async function sendResendDirectEmail(projectId, clientEmail, clientName, title, portalUrl) {
    if (!clientEmail || !clientEmail.includes('@')) {
        return alert("Nessuna email valida salvata per questo cliente. Inseriscila nel campo dedicato e riprova.");
    }

    if (!confirm(`Confermi l'invio immediato dell'Email a: ${clientEmail}?`)) return;

    try {
        const res = await fetch('https://n8n.rmstudio.app/webhook/omnia-taste-send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                project_id: projectId,
                client_email: clientEmail,
                client_name: clientName,
                title: title,
                portal_url: portalUrl
            })
        });

        const data = await res.json();
        if (data.success) {
            alert("✨ Email inviata con successo via Resend a " + clientEmail + "!");
            loadMasterData();
        } else {
            throw new Error(data.message || "Errore invio email");
        }
    } catch (err) {
        alert("Impossibile inviare l'email: " + err.message);
    }
}

// GENERATORE PITCH DI CHIUSURA CON LEVA JINGLE (FF EDIZIONI)
function openClosingPitchModal(projectId) {
    const project = window.allProjects.find(p => p.id === projectId);
    if (!project) return;

    const name = project.client_name || 'Titolare';
    const title = project.title || 'il vostro locale';
    const portalUrl = `https://portale.rmstudio.app/view?id=${project.id}`;
    const phone = project.client_phone ? project.client_phone.replace(/\D/g, '') : '';

    const text = `Ciao ${name}! 👋\n\nHo visto che hai avuto modo di esplorare l'anteprima della Smart Experience Page creata per ${title}.\n\nCi tenevo a dirti che, sbloccandola questa settimana per metterla online sul vostro dominio, **includiamo GRATIS nei 390€ un Jingle Audio d'Autore personalizzato (valore 150€)** realizzato dal nostro studio musicale FF Edizioni, pronto da usare per le vostre Stories e Reel Instagram! 🎵🍷\n\nPuoi rivedere l'anteprima e sbloccarla qui:\n${portalUrl}\n\nResto a disposizione!`;

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

// APERTURA MODALE RAPIDA DA SIDEBAR
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

// CANCELLAZIONE DEFINITIVA TRAMITE N8N WEBHOOK
async function handleDelete(id) {
    if (!confirm("Eliminare definitivamente questo progetto e tutte le sue risorse da tutti i server e database?")) return;
    
    try {
        const ok = await triggerN8NDelete(id);
        if (ok) {
            alert("🗑️ Progetto eliminato con successo da tutti i server!");
            await loadMasterData();
        } else {
            throw new Error("Il server non ha confermato la cancellazione.");
        }
    } catch (err) {
        alert("Errore cancellazione: " + err.message);
    }
}

function switchTab(tab) {
    document.getElementById('tab-master').classList.toggle('hidden', tab !== 'master');
    document.getElementById('tab-outreach').classList.toggle('hidden', tab !== 'outreach');
}

function openCreationModal() { 
    document.getElementById('creation-modal').classList.remove('hidden'); 
    document.getElementById('creation-modal').classList.add('flex'); 
    toggleModalFields();
}

function closeCreationModal() { 
    document.getElementById('creation-modal').classList.remove('flex'); 
    document.getElementById('creation-modal').classList.add('hidden'); 
}

async function handleCreateSubmit(e) {
    e.preventDefault();
    const btn = document.getElementById('c-btn');
    const originalText = btn.innerText;
    btn.disabled = true;
    btn.innerText = "Analisi AI del Ristorante in corso (può richiedere 20s)...";

    const type = document.getElementById('c-type').value;

    if (type === 'experience') {
        const siteUrl = document.getElementById('c-url').value;
        if (!siteUrl) {
            alert("Inserisci l'URL del sito del ristorante nel campo Destinazione.");
            btn.disabled = false;
            btn.innerText = originalText;
            return;
        }

        try {
            const res = await fetch('https://n8n.rmstudio.app/webhook/omnia-taste-generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    site_url: siteUrl,
                    phone: document.getElementById('c-phone').value || '',
                    nome_ristorante: document.getElementById('c-name').value || ''
                })
            });

            if (!res.ok) {
                throw new Error(`Il server n8n ha risposto con codice ${res.status}`);
            }

            const text = await res.text();
            let data;
            try {
                data = JSON.parse(text);
            } catch (pErr) {
                throw new Error("Risposta del server non valida. Verifica che il workflow n8n sia ATTIVO.");
            }

            if (data.success) {
                alert("✨ Smart Experience Page generata con successo!");
                closeCreationModal();
                await loadMasterData();
            } else {
                throw new Error(data.message || "Errore sconosciuto durante la generazione.");
            }
        } catch (err) {
            alert("⚠️ " + err.message);
        } finally {
            btn.disabled = false;
            btn.innerText = originalText;
        }
        return;
    }

    const fd = new FormData();
    fd.append('client_name', document.getElementById('c-name').value);
    fd.append('email', document.getElementById('c-email').value || '');
    fd.append('client_phone', document.getElementById('c-phone').value || '');
    fd.append('title', document.getElementById('c-title').value);
    fd.append('price', document.getElementById('c-price').value);
    fd.append('portal_type', type);

    if (type === 'video' || type === 'carousel' || type === 'vision') {
        const fileInput = document.getElementById('c-file');
        for (let i = 0; i < fileInput.files.length; i++) { fd.append(`file_${i}`, fileInput.files[i]); }
    } else {
        fd.append('external_url', document.getElementById('c-url').value);
    }

    const ok = await triggerN8NCreate(fd);
    if (ok) {
        alert("Progetto registrato con successo!");
        closeCreationModal();
        await loadMasterData();
    } else alert("Errore creazione.");
    
    btn.disabled = false;
    btn.innerText = originalText;
}

// RIDIMENSIONAMENTO TRASCINABILE SIDEBAR CON SNAP COMPATTO (<120px)
document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const resizer = document.getElementById('resizer');
    
    if (!sidebar || !resizer) return;

    const isCollapsed = localStorage.getItem('sidebar_collapsed') === 'true';
    if (isCollapsed) {
        sidebar.classList.add('sidebar-collapsed');
    } else {
        const savedWidth = localStorage.getItem('sidebar_width');
        if (savedWidth) {
            sidebar.style.width = `${savedWidth}px`;
        }
    }

    let x = 0;
    let w = 0;

    const mouseDownHandler = (e) => {
        x = e.clientX;
        w = sidebar.getBoundingClientRect().width;

        resizer.classList.add('resizing');
        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    };

    const mouseMoveHandler = (e) => {
        const dx = e.clientX - x;
        let newWidth = w + dx;

        if (newWidth < 120) {
            sidebar.classList.add('sidebar-collapsed');
            localStorage.setItem('sidebar_collapsed', 'true');
        } else {
            sidebar.classList.remove('sidebar-collapsed');
            newWidth = Math.min(Math.max(newWidth, 220), 480);
            sidebar.style.width = `${newWidth}px`;
            localStorage.setItem('sidebar_width', newWidth);
            localStorage.setItem('sidebar_collapsed', 'false');
        }
    };

    const mouseUpHandler = () => {
        resizer.classList.remove('resizing');
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
    };

    resizer.addEventListener('mousedown', mouseDownHandler);
});
