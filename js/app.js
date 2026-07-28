window.allProjects = [];

async function loadMasterData() {
    const data = await fetchSupabaseProjects();
    window.allProjects = data;
    applyFilters();
    return true;
}

// TOGGLE COLLAPSE SIDEBAR
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const icon = document.getElementById('sidebar-icon');
    
    sidebar.classList.toggle('sidebar-collapsed');

    if (sidebar.classList.contains('sidebar-collapsed')) {
        icon.className = 'fa-solid fa-chevron-right';
    } else {
        icon.className = 'fa-solid fa-chevron-left';
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
        // ⚡ CORREZIONE RIGIDA: È "Letto" SOLTANTO SE LE VISITE SONO MAGGIORI DI 0
        const views = parseInt(p.views_count || 0);
        const isRead = views > 0;
        const emailSent = p.first_email_sent === true || p.first_email_sent === "true";

        let typeBadge = `<span class="bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase block w-max mx-auto">${p.portal_type || 'html'}</span>`;

        const portalViewUrl = `https://portale.rmstudio.app/view?id=${p.id}`;

        // Pulsante Pitch Jingle SOLTANTO se letto (visite > 0) e non ancora pagato
        let closingPitchBtn = '';
        if (isRead && !isPaid) {
            closingPitchBtn = `<button onclick="openClosingPitchModal('${p.id}')" class="bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/40 px-3 py-1.5 rounded-lg text-xs font-black transition animate-pulse" title="Pitch Chiusura Jingle"><i class="fa-solid fa-fire"></i> Pitch Jingle</button>`;
        }

        tr.innerHTML = `
            <!-- TIPO E ID -->
            <td class="p-4 text-center">
                ${typeBadge}
                <span class="font-mono text-xs text-gray-400 block mt-1 font-bold">#${p.id ? p.id.substring(0, 4).toUpperCase() : '---'}</span>
            </td>

            <!-- CLIENTE, EMAIL, TELEFONO EDITABILI (FONT 16PX BASE) -->
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

            <!-- STATO LETTURA / EMAIL INVIATA -->
            <td class="p-4 whitespace-nowrap">
                <div class="space-y-1">
                    ${isRead ? '<span class="text-green-400 font-extrabold text-xs block"><i class="fa-solid fa-eye animate-pulse"></i> Letto ('+views+')</span>' : '<span class="text-zinc-500 font-bold text-xs block"><i class="fa-solid fa-eye-slash"></i> Non letto</span>'}
                    ${emailSent ? '<span class="text-purple-400 text-xs font-bold block"><i class="fa-solid fa-paper-plane"></i> Mail Inviata</span>' : ''}
                </div>
            </td>

            <!-- PAGAMENTO TOGGLE -->
            <td class="p-4">
                <button onclick="togglePayment('${p.id}', ${isPaid})" class="px-3 py-1.5 rounded-full text-xs font-bold transition ${isPaid ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'}">
                    ${isPaid ? '✓ Pagato' : '● Attesa'}
                </button>
            </td>

            <!-- NOTE OPERATIVE AUTO-SAVE -->
            <td class="p-4">
                <textarea onchange="updateSupabaseField('${p.id}', 'notes', this.value)" placeholder="Aggiungi note..." class="w-full h-12 bg-transparent text-xs text-zinc-300 placeholder-zinc-700 hover:border-zinc-800 focus:border-purple-500 border border-transparent rounded-lg p-1.5 leading-relaxed focus:outline-none transition-all resize-none">${p.notes || ''}</textarea>
            </td>

            <!-- AZIONI RAPIDE -->
            <td class="p-4 text-right flex items-center justify-end gap-2 whitespace-nowrap">
                ${closingPitchBtn}
                <button onclick="sendResendDirectEmail('${p.id}', '${p.client_email || ''}', '${p.client_name || ''}', '${p.title || ''}', '${portalViewUrl}')" class="bg-purple-600/20 text-purple-300 border border-purple-500/30 hover:bg-purple-600/40 px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1" title="Invia Mail con Resend"><i class="fa-solid fa-paper-plane"></i> Mail</button>
                <button onclick="openMessageModal('${p.id}', 'wa')" class="bg-green-600/20 text-green-400 border border-green-500/30 hover:bg-green-600/40 px-3 py-1.5 rounded-lg text-xs font-bold transition" title="Copy WA"><i class="fa-brands fa-whatsapp"></i> WA</button>
                <button onclick="handleDelete('${p.id}')" class="text-gray-500 hover:text-red-500 p-1.5 rounded transition" title="Elimina"><i class="fa-solid fa-trash-can text-sm"></i></button>
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

async function togglePayment(id, current) {
    await updateSupabaseField(id, 'is_paid', !current);
    loadMasterData();
}

async function handleDelete(id) {
    if (!confirm("Eliminare definitivamente questo progetto e tutte le sue risorse da tutti i database?")) return;
    
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

function openCreationModal() { document.getElementById('creation-modal').classList.remove('hidden'); document.getElementById('creation-modal').classList.add('flex'); }
function closeCreationModal() { document.getElementById('creation-modal').classList.remove('flex'); document.getElementById('creation-modal').classList.add('hidden'); }

function toggleModalFields() {
    const t = document.getElementById('c-type').value;
    document.getElementById('file-upload-box').classList.toggle('hidden', t === 'html' || t === 'link' || t === 'experience');
    document.getElementById('link-input-box').classList.toggle('hidden', t !== 'html' && t !== 'link' && t !== 'experience');
}

async function handleCreateSubmit(e) {
    e.preventDefault();
    const btn = document.getElementById('c-btn');
    btn.disabled = true;
    btn.innerText = "Salvataggio in corso...";

    const type = document.getElementById('c-type').value;

    if (type === 'experience') {
        const siteUrl = document.getElementById('c-url').value;
        if (!siteUrl) {
            alert("Inserisci l'URL del sito del ristorante nel campo Destinazione.");
            btn.disabled = false;
            btn.innerText = "Salva e Registra Progetto";
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

            const data = await res.json();
            if (data.success) {
                alert("✨ Smart Experience Page generata con successo!");
                closeCreationModal();
                loadMasterData();
            } else {
                throw new Error("Errore durante la generazione n8n.");
            }
        } catch (err) {
            alert("Errore generazione: " + err.message);
        } finally {
            btn.disabled = false;
            btn.innerText = "Salva e Registra Progetto";
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
        loadMasterData();
    } else alert("Errore creazione.");
    btn.disabled = false;
    btn.innerText = "Salva e Registra Progetto";
}
