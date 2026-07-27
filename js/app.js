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
        container.innerHTML = `<tr><td colspan="10" class="p-8 text-center text-gray-500 font-semibold">Nessun progetto trovato.</td></tr>`;
        return;
    }

    data.forEach(p => {
        const tr = document.createElement('tr');
        tr.className = "hover:bg-[#101015] transition border-b border-zinc-900/80";

        const isPaid = p.is_paid === true || p.is_paid === "true";
        const isRead = p.is_opened || (p.views_count || 0) > 0;

        let typeBadge = `<span class="bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[8px] font-bold px-2 py-0.5 rounded-full uppercase block w-max mx-auto">${p.portal_type || 'html'}</span>`;

        tr.innerHTML = `
            <!-- TIPO E ID -->
            <td class="p-4 text-center">
                ${typeBadge}
                <span class="font-mono text-[10px] text-gray-500 block mt-1 font-bold">#${p.id ? p.id.substring(0, 4).toUpperCase() : '---'}</span>
            </td>

            <!-- CLIENTE, EMAIL, TELEFONO EDITABILI -->
            <td class="p-4">
                <input type="text" value="${p.client_name || ''}" placeholder="Nome Cliente" onchange="updateSupabaseField('${p.id}', 'client_name', this.value)" class="bg-transparent border-b border-transparent hover:border-zinc-700 focus:border-purple-500 focus:outline-none font-bold text-white text-sm block w-full mb-1">
                <div class="space-y-0.5">
                    <input type="email" value="${p.client_email || ''}" placeholder="Inserisci Mail" onchange="updateSupabaseField('${p.id}', 'client_email', this.value)" class="bg-transparent border-b border-transparent hover:border-zinc-700 focus:border-purple-500 focus:outline-none text-xs text-gray-400 w-full block">
                    <input type="text" value="${p.client_phone || ''}" placeholder="Inserisci Telefono" onchange="updateSupabaseField('${p.id}', 'client_phone', this.value)" class="bg-transparent border-b border-transparent hover:border-zinc-700 focus:border-purple-500 focus:outline-none text-xs text-gray-400 w-full block">
                </div>
            </td>

            <!-- TITOLO PROGETTO EDITABILE -->
            <td class="p-4">
                <input type="text" value="${p.title || ''}" placeholder="Titolo Progetto" onchange="updateSupabaseField('${p.id}', 'title', this.value)" class="bg-transparent border-b border-transparent hover:border-zinc-700 focus:border-purple-500 focus:outline-none text-xs text-gray-300 font-semibold w-full">
            </td>

            <!-- PREZZO EDITABILE -->
            <td class="p-4">
                <input type="number" value="${p.price_euro || 0}" onchange="updateSupabaseField('${p.id}', 'price_euro', this.value)" class="w-16 bg-[#15151a] border border-zinc-800 rounded-lg p-1.5 text-center font-bold text-purple-400 focus:border-purple-500 focus:outline-none text-xs">
            </td>

            <!-- VISITE EDITABILI -->
            <td class="p-4">
                <input type="number" value="${p.views_count || 0}" onchange="updateSupabaseField('${p.id}', 'views_count', this.value)" class="w-16 bg-[#15151a] border border-zinc-800 rounded-lg p-1.5 text-center font-bold text-blue-400 focus:border-purple-500 focus:outline-none text-xs">
            </td>

            <!-- SPUNTA WA INVIATO EDITABILE -->
            <td class="p-4">
                <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" ${p.is_whatsapp_sent ? 'checked' : ''} onchange="updateSupabaseField('${p.id}', 'is_whatsapp_sent', this.checked)" class="w-4 h-4 text-purple-600 bg-zinc-900 border-zinc-800 rounded focus:ring-purple-500">
                    <span class="ml-2 text-xs text-gray-400">Inviato</span>
                </label>
            </td>

            <!-- STATO LETTURA -->
            <td class="p-4 whitespace-nowrap">
                ${isRead ? '<span class="text-green-400 font-bold text-xs"><i class="fa-solid fa-eye animate-pulse"></i> Letto</span>' : '<span class="text-zinc-500 font-bold text-xs"><i class="fa-solid fa-envelope"></i> No</span>'}
            </td>

            <!-- PAGAMENTO TOGGLE -->
            <td class="p-4">
                <button onclick="togglePayment('${p.id}', ${isPaid})" class="px-2.5 py-1 rounded-full text-[10px] font-bold transition ${isPaid ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'}">
                    ${isPaid ? '✓ Pagato' : '● Attesa'}
                </button>
            </td>

            <!-- NOTE OPERATIVE AUTO-SAVE -->
            <td class="p-4">
                <textarea onchange="updateSupabaseField('${p.id}', 'notes', this.value)" placeholder="Aggiungi note..." class="w-full h-12 bg-transparent text-xs text-zinc-300 placeholder-zinc-700 hover:border-zinc-800 focus:border-purple-500 border border-transparent rounded-lg p-1.5 leading-relaxed focus:outline-none transition-all resize-none">${p.notes || ''}</textarea>
            </td>

            <!-- AZIONI RAPIDE -->
            <td class="p-4 text-right flex items-center justify-end gap-1.5 whitespace-nowrap">
                <button onclick="openMessageModal('${p.id}', 'wa')" class="bg-green-600/20 text-green-400 border border-green-500/30 hover:bg-green-600/40 px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition" title="Copy WA"><i class="fa-brands fa-whatsapp"></i> WA</button>
                <button onclick="openMessageModal('${p.id}', 'email')" class="bg-purple-600/20 text-purple-300 border border-purple-500/30 hover:bg-purple-600/40 px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition" title="Copy Email"><i class="fa-solid fa-envelope"></i> Mail</button>
                <button onclick="handleDelete('${p.id}')" class="text-gray-500 hover:text-red-500 p-1.5 rounded transition" title="Elimina"><i class="fa-solid fa-trash-can text-xs"></i></button>
            </td>
        `;
        container.appendChild(tr);
    });
}

async function togglePayment(id, current) {
    await updateSupabaseField(id, 'is_paid', !current);
    loadMasterData();
}

async function handleDelete(id) {
    if (!confirm("Eliminare definitivamente questo progetto?")) return;
    const ok = await triggerN8NDelete(id);
    if (ok) loadMasterData();
    else alert("Errore eliminazione.");
}

function switchTab(tab) {
    document.getElementById('tab-master').classList.toggle('hidden', tab !== 'master');
    document.getElementById('tab-outreach').classList.toggle('hidden', tab !== 'outreach');
}

function openCreationModal() { document.getElementById('creation-modal').classList.remove('hidden'); document.getElementById('creation-modal').classList.add('flex'); }
function closeCreationModal() { document.getElementById('creation-modal').classList.remove('flex'); document.getElementById('creation-modal').classList.add('hidden'); }
function toggleModalFields() {
    const t = document.getElementById('c-type').value;
    document.getElementById('file-upload-box').classList.toggle('hidden', t === 'html' || t === 'link');
    document.getElementById('link-input-box').classList.toggle('hidden', t !== 'html' && t !== 'link');
}

async function handleCreateSubmit(e) {
    e.preventDefault();
    const btn = document.getElementById('c-btn');
    btn.disabled = true;
    btn.innerText = "Salvataggio in corso...";

    const fd = new FormData();
    fd.append('client_name', document.getElementById('c-name').value);
    fd.append('email', document.getElementById('c-email').value || '');
    fd.append('client_phone', document.getElementById('c-phone').value || '');
    fd.append('title', document.getElementById('c-title').value);
    fd.append('price', document.getElementById('c-price').value);
    const type = document.getElementById('c-type').value;
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
