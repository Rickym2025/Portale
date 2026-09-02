// GENERATORE NEUROMARKETING MESSAGGI 1-CLICK
function generateWhatsAppCopy(item) {
    const name = item.client_name || 'Titolare';
    const title = item.title || 'Progetto';
    const link = item.portal_type === 'vision' 
        ? `${window.location.origin}/vision-preview?token=${item.token}`
        : `https://portale.rmstudio.app/view?id=${item.id}`;

    // Messaggio personalizzato per Locanda Digitale / Ristoranti
    if (item.portal_type === 'locanda' || item.portal_type === 'experience') {
        return `Ciao ${name}! 👋\n\nStavo ammirando le specialità del vostro locale e vi ho preparato questo spot video 3D in anteprima per i vostri social:\n👉 ${link}\n\nSe vi piace potete usarlo per i vostri Reel o sul menu! Fatemi sapere cosa ne pensate 😊`;
    }

    return `Ciao ${name}! 👋\n\nHo appena completato la lavorazione speciale per te: *"${title}"*.\n\nPuoi guardare l'anteprima riservata direttamente qui:\n👉 ${link}\n\nFammi sapere cosa ne pensi! 😊`;
}

function generateEmailCopy(item) {
    const name = item.client_name || 'Cliente';
    const title = item.title || 'Progetto';
    const link = item.portal_type === 'vision' 
        ? `${window.location.origin}/vision-preview?token=${item.token}`
        : `https://portale.rmstudio.app/view?id=${item.id}`;

    return `OGGETTO: 🎁 La tua anteprima riservata è pronta - ${title}\n\nGentile ${name},\n\nAbbiamo completato l'elaborazione del tuo progetto "${title}".\n\nPuoi accedere all'anteprima protetta da watermark a questo indirizzo:\n${link}\n\nSiamo a tua disposizione per qualsiasi modifica o chiarimento.\n\nUn cordiale saluto,\nRiccardo Modena | RM Studio`;
}

function openMessageModal(id, type) {
    const item = window.allProjects.find(p => p.id === id);
    if (!item) return;

    const copyText = type === 'wa' ? generateWhatsAppCopy(item) : generateEmailCopy(item);
    document.getElementById('copy-text-area').value = copyText;

    const phone = (item.client_phone || '').replace(/[^0-9]/g, '');
    const waUrl = phone 
        ? `https://wa.me/${phone}?text=${encodeURIComponent(copyText)}`
        : `https://wa.me/?text=${encodeURIComponent(copyText)}`;

    document.getElementById('copy-wa-direct-link').href = waUrl;
    document.getElementById('copy-modal').classList.remove('hidden');
    document.getElementById('copy-modal').classList.add('flex');
}

function closeCopyModal() {
    document.getElementById('copy-modal').classList.remove('flex');
    document.getElementById('copy-modal').classList.add('hidden');
}

function executeCopyText() {
    const text = document.getElementById('copy-text-area').value;
    navigator.clipboard.writeText(text).then(() => alert("Copy copiato negli appunti!"));
}
