// GENERATORE NEUROMARKETING MESSAGGI 1-CLICK • RM STUDIO

function generateWhatsAppCopy(item) {
    const name = item.client_name || 'Architetto';
    const title = item.title || 'Progetto';
    const link = item.portal_type === 'vision' 
        ? `${window.location.origin}/vision-preview?token=${item.token}`
        : (item.portal_type === 'forma_materia' 
            ? (item.content_url || `https://formamateria.rmstudio.app/studio`)
            : `https://portale.rmstudio.app/view?id=${item.id}`);

    // 🏛️ Messaggio personalizzato Forma & Materia (Architettura & Design)
    if (item.portal_type === 'forma_materia') {
        return `Ciao ${name}! 👋\n\nHo preparato questo spazio di lavoro riservato per il tuo studio su *Forma & Materia*:\n👉 ${link}\n\nÈ una piattaforma neurale che trasforma qualsiasi schizzo a mano libera o disegno CAD in render fotorealistici 4K in 20 secondi. La cosa più comoda è che legge in automatico anche le frecce e le note a penna che scrivi sul foglio!\n\nÈ 100% web, puoi provarlo anche da tablet o smartphone. Fammi sapere cosa ne pensi! 🏛️✨`;
    }

    // 📡 Messaggio personalizzato AURA Proximity
    if (item.portal_type === 'aura') {
        return `Ciao ${name}! 👋\n\nHo configurato e attivato la vostra stanza su *AURA Proximity*:\n👉 ${link}\n\nÈ 100% web: basta aprire il link dallo smartphone per essere subito collegati con radar vettoriale, Co-Pilota vocale in vivavoce e rilevatore automatico cadute/urti.\n\nFammi sapere se riuscite a fare una prova sul campo! 📡`;
    }

    // 🍽️ Messaggio per Locanda Digitale / Ristoranti
    if (item.portal_type === 'locanda' || item.portal_type === 'experience') {
        return `Ciao ${name}! 👋\n\nStavo ammirando le specialità del vostro locale e vi ho preparato questo spot video 3D in anteprima per i vostri social:\n👉 ${link}\n\nSe vi piace potete usarlo per i vostri Reel o sul menu! Fatemi sapere cosa ne pensate 😊`;
    }

    // Template Standard
    return `Ciao ${name}! 👋\n\nHo appena completato la lavorazione speciale per te: *"${title}"*.\n\nPuoi guardare l'anteprima riservata direttamente qui:\n👉 ${link}\n\nFammi sapere cosa ne pensi! 😊`;
}

function generateEmailCopy(item) {
    const name = item.client_name || 'Architetto';
    const title = item.title || 'Progetto';
    const link = item.portal_type === 'vision' 
        ? `${window.location.origin}/vision-preview?token=${item.token}`
        : (item.portal_type === 'forma_materia' 
            ? (item.content_url || `https://formamateria.rmstudio.app/studio`)
            : `https://portale.rmstudio.app/view?id=${item.id}`);

    // 🏛️ Email personalizzata Forma & Materia (Architettura & Design)
    if (item.portal_type === 'forma_materia') {
        return `OGGETTO: 🏛️ Studio di Rendering Neurale Attivo - ${title}\n\nGentile ${name},\n\nAbbiamo attivato l'ambiente di lavoro dedicato per "${title}" su Forma & Materia.\n\nPuoi accedere direttamente senza installare alcun software dal link riservato:\n${link}\n\nIl motore consente di caricare schizzi a matita, planimetrie o wireframe CAD e ottenere render fotorealistici in 4K ad alta fedeltà, preservando l'esatta geometria e interpretando automaticamente le annotazioni a penna.\n\nRestiamo a tua disposizione per qualsiasi supporto o prova personalizzata.\n\nUn cordiale saluto,\nRiccardo Modena | RM Studio`;
    }

    // 📡 Email personalizzata AURA Proximity
    if (item.portal_type === 'aura') {
        return `OGGETTO: 📡 La tua stanza radar AURA Proximity è attiva - ${title}\n\nGentile ${name},\n\nAbbiamo attivato la sessione radar mesh per "${title}".\n\nPuoi accedere direttamente senza installare alcuna app dal link dedicato:\n${link}\n\nIl sistema include Co-Pilota Vocale HD, bussola 3D, chat mesh P2P e Man-Down automatico per la sicurezza.\n\nRestiamo a tua disposizione per qualsiasi supporto.\n\nUn cordiale saluto,\nRiccardo Modena | RM Studio`;
    }

    // Email Standard
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
