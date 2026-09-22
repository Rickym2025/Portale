// GENERATORE NEUROMARKETING MESSAGGI 1-CLICK • RM STUDIO

function generateWhatsAppCopy(item) {
    const name = item.client_name || 'Titolare';
    const title = item.title || 'Progetto';
    const link = item.portal_type === 'vision' 
        ? `${window.location.origin}/vision-preview?token=${item.token}`
        : (item.portal_type === 'forma_materia' 
            ? (item.content_url || `https://formamateria.rmstudio.app/studio`)
            : (item.content_url || `https://portale.rmstudio.app/view?id=${item.id}`));

    // 🦷 Messaggio Dentis AI (Studi Dentistici)
    if (item.portal_type === 'dentis') {
        return `Ciao ${name}! 👋\n\nHo visto la vostra ricerca per la segreteria e, per non rischiare di perdere visite o urgenze mentre selezionate e formate la nuova figura, vi ho pre-configurato la receptionist AI per lo studio:\n👉 ${link}\n\nSi chiama Serena: risponde in voce naturale al 2° squillo H24, gestisce le urgenze, risponde alle domande su orari e prestazioni e sincronizza gli appuntamenti direttamente in agenda con promemoria automatici via WhatsApp.\n\nPotete provarla dal vivo senza impegno. Fatemi sapere cosa ne pensate! 🦷📞`;
    }

    // ⚖️ Messaggio Lexis AI (Studi Legali & Avvocati)
    if (item.portal_type === 'lexis') {
        return `Gentile ${name}, buongiorno.\n\nAbbiamo riservato per il Suo studio la dimostrazione operativa della segreteria telefonica vocale AI per professionisti legali:\n👉 ${link}\n\nSi chiama Chiara: adotta un registro rigorosamente formale (\"del Lei\"), risponde fuori orario e su linea occupata per raccogliere i dettagli delle nuove richieste di consulenza, notificando immediatamente lo studio via email e WhatsApp con trascrizione e sintesi.\n\nResto a disposizione per una prova diretta. Cordiali saluti.`;
    }

    // 🏨 Messaggio Concierge24 (Hotel & Strutture Ricettive)
    if (item.portal_type === 'concierge') {
        return `Ciao ${name}! 👋\n\nHo visto la vostra struttura ricettiva e vi ho preparato una demo interattiva di *Concierge24*:\n👉 ${link}\n\nÈ l'assistente vocale e multimediale AI (\"Giulia\") che risponde in lingua nativa agli ospiti H24 (italiano, inglese, tedesco, ecc.), invia sullo smartphone orari di check-in, parcheggio e regole della casa, e consiglia i migliori ristoranti e attrazioni locali entro 35 km con mappe interattive in tempo reale! 🏨✨\n\nDateci un'occhiata e fatemi sapere cosa ne pensate!`;
    }

    // 🍽️ Messaggio personalizzato Locanda Digitale (Living 3D Menu & Metodo Bounty)
    if (item.portal_type === 'locanda') {
        return `Ciao ${name}! 👋\n\nStavo ammirando le specialità del vostro locale e vi ho preparato questa demo interattiva del vostro *Living 3D Menu*:\n👉 ${link}\n\nNon è il solito PDF statico: i piatti forti si animano in video 3D a 60 FPS direttamente al tavolo, i clienti inviano le comande su WhatsApp e include la tecnologia automatica che estrae i contatti dei clienti e riempie i tavoli con il *Bancomat dei Compleanni*! 🎂🍷\n\nSi apre all'istante da qualsiasi smartphone senza scaricare app. Dagli un'occhiata e fammi sapere cosa ne pensi! 😊`;
    }

    // 🏛️ Messaggio personalizzato Forma & Materia (Architettura & Design)
    if (item.portal_type === 'forma_materia') {
        return `Ciao ${name}! 👋\n\nHo preparato questo spazio di lavoro riservato per il tuo studio su *Forma & Materia*:\n👉 ${link}\n\nÈ una piattaforma neurale che trasforma qualsiasi schizzo a mano libera o disegno CAD in render fotorealistici 4K in 20 secondi. La cosa più comoda è che legge in automatico anche le frecce e le note a penna che scrivi sul foglio!\n\nÈ 100% web, puoi provarlo anche da tablet o smartphone. Fammi sapere cosa ne pensi! 🏛️✨`;
    }

    // 📡 Messaggio personalizzato AURA Proximity
    if (item.portal_type === 'aura') {
        return `Ciao ${name}! 👋\n\nHo configurato e attivato la vostra stanza su *AURA Proximity*:\n👉 ${link}\n\nÈ 100% web: basta aprire il link dallo smartphone per essere subito collegati con radar vettoriale, Co-Pilota vocale in vivavoce e rilevatore automatico cadute/urti.\n\nFammi sapere se riuscite a fare una prova sul campo! 📡`;
    }

    // 🍷 Messaggio per Smart Experience Page (Maître AI & Wine Pairing)
    if (item.portal_type === 'experience') {
        return `Ciao ${name}! 👋\n\nHo digitalizzato il menu e la storia del vostro locale nella nuova *Smart Experience Page* con Maître AI e abbinamento vini:\n👉 ${link}\n\nSe vi piace potete usarla per i vostri clienti e per le prenotazioni WhatsApp! Fatemi sapere cosa ne pensate 😊`;
    }

    // Template Standard
    return `Ciao ${name}! 👋\n\nHo appena completato la lavorazione speciale per te: *"${title}"*.\n\nPuoi guardare l'anteprima riservata direttamente qui:\n👉 ${link}\n\nFammi sapere cosa ne pensi! 😊`;
}

function generateEmailCopy(item) {
    const name = item.client_name || 'Gentile Titolare';
    const title = item.title || 'il vostro studio';
    const link = item.portal_type === 'vision' 
        ? `${window.location.origin}/vision-preview?token=${item.token}`
        : (item.portal_type === 'forma_materia' 
            ? (item.content_url || `https://formamateria.rmstudio.app/studio`)
            : (item.content_url || `https://portale.rmstudio.app/view?id=${item.id}`));

    // 🦷 Email Dentis AI
    if (item.portal_type === 'dentis') {
        return `OGGETTO: 🦷 Gestione chiamate e prime visite per ${title} (durante la selezione del personale)\n\nGentile ${name},\n\nAbbiamo configurato per il vostro studio una dimostrazione attiva della receptionist telefonica AI Dentis ("Serena"), consultabile a questo indirizzo riservato:\n${link}\n\nMentre siete alla ricerca della nuova figura di front office, Dentis garantisce che nessuna chiamata e nessuna urgenza vadano perse durante le pause pranzo, la sera o quando la linea è occupata:\n- Risposta vocale immediata e naturale H24 entro il 2° squillo;\n- Triage urgenze e fissaggio prime visite;\n- Promemoria WhatsApp automatici ai pazienti per azzerare i buchi in poltrona.\n\nRestiamo a disposizione per qualsiasi test o configurazione personalizzata.\n\nUn cordiale saluto,\nRiccardo Modena | RM Studio`;
    }

    // ⚖️ Email Lexis AI
    if (item.portal_type === 'lexis') {
        return `OGGETTO: ⚖️ Segreteria telefonica vocale H24 e accoglienza prime consulenze - ${title}\n\nGentile ${name},\n\nAbbiamo predisposto una linea dimostrativa dedicata a "${title}" per la segreteria telefonica con intelligenza artificiale Lexis AI ("Chiara"), accessibile qui:\n${link}\n\nLexis AI è progettata su misura per gli studi legali:\n- Registro formale ("del Lei") e rispetto del segreto professionale;\n- Reperibilità attiva fuori orario (notti, weekend, udienze) e su linea occupata;\n- Notifica immediata di ogni contatto qualificato con riassunto del caso e registrazione audio.\n\nRestiamo a Sua completa disposizione per qualsiasi approfondimento.\n\nCordiali saluti,\nRiccardo Modena | RM Studio`;
    }

    // 🏨 Email Concierge24
    if (item.portal_type === 'concierge') {
        return `OGGETTO: 🏨 Centralino notturno e concierge multimediale multilingua H24 per ${title}\n\nGentile ${name},\n\nAbbiamo allestito una demo personalizzata di Concierge24 per la vostra struttura, accessibile a questo link:\n${link}\n\nConcierge24 ("Giulia") solleva il personale della reception parlando in tempo reale con i turisti nella loro lingua madre:\n- Assistenza vocale H24 su check-in tardivo, parcheggio e regole della struttura;\n- Suggerimenti turistici con invio immediato di mappe GPS e schede sul telefono dell'ospite;\n- Nessun canone mensile obbligatorio (modello pay-as-you-go flessibile).\n\nRestiamo a disposizione per qualsiasi prova dal vivo.\n\nUn cordiale saluto,\nRiccardo Modena | RM Studio`;
    }

    // 🍽️ Email personalizzata Locanda Digitale
    if (item.portal_type === 'locanda') {
        return `OGGETTO: 🍽️ Anteprima Living 3D Menu & Motore Clienti H24 per ${title}\n\nGentile ${name},\n\nAbbiamo elaborato una dimostrazione interattiva su misura per il vostro locale, accessibile direttamente a questo link riservato:\n${link}\n\nLocanda Digitale non è un semplice menu digitale in PDF: trasforma le vostre portate forti in video 3D ad alta fluidità (60 FPS) al tavolo, velocizza le comande su WhatsApp e integra il sistema automatizzato che estrae i contatti dei clienti e riempie i tavoli con promozioni automatiche di compleanno a -10 giorni, proteggendo inoltre le recensioni del locale su Google Maps.\n\nRestiamo a completa disposizione per qualsiasi prova dal vivo o personalizzazione grafica.\n\nUn cordiale saluto,\nRiccardo Modena | RM Studio`;
    }

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
