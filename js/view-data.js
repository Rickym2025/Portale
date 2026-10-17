// js/view-data.js - Modulo Dati, Risoluzione URL 23 SaaS & Voice, Matrice Settoriale & Offerte Neuromarketing

// 🎯 MATRICE DEI 3 FORMAT CURATI PER SETTORE (SITEENGINE)
window.SECTOR_TRIO_TEMPLATES = {
    psicologia: [
        { id: 7, label: "🌿 07. L'Empatico", desc: "Toni Caldi Salvia & Accoglienza" },
        { id: 8, label: "🕊️ 08. La Sorgente", desc: "Nordic Zen Split-Screen" },
        { id: 9, label: "🌲 09. Il Sentiero", desc: "Timeline Clinica a Tappe" }
    ],
    architettura: [
        { id: 5, label: "🏛️ 05. Bento Studio", desc: "Interni & Materia Asimmetrica" },
        { id: 10, label: "🏰 10. Dimore d'Autore", desc: "Ville di Pregio a Piena Larghezza" },
        { id: 2, label: "✨ 02. Atelier d'Autore", desc: "Sartoriale Scuro con Accenti Oro" }
    ],
    legale: [
        { id: 4, label: "⚖️ 04. L'Autorità", desc: "Forense Istituzionale & Deontologia" },
        { id: 8, label: "🕊️ 08. La Sorgente", desc: "Minimale Riservato" },
        { id: 1, label: "🛡️ 01. Il Guardiano", desc: "Presidio Normativo e Tutela" }
    ],
    medicina: [
        { id: 3, label: "🩺 03. Il Chirurgo", desc: "Rigore Clinico & Triage" },
        { id: 7, label: "🌿 07. L'Empatico", desc: "Accoglienza Paziente" },
        { id: 1, label: "🛡️ 01. Il Guardiano", desc: "Presidio Struttura e Tecnologie" }
    ],
    sicurezza: [
        { id: 1, label: "🛡️ 01. Il Guardiano", desc: "Presidio H24 & Pattuglie" },
        { id: 4, label: "⚖️ 04. L'Autorità", desc: "Certificazioni Appalti" },
        { id: 6, label: "🎬 06. Il Regista", desc: "Video 4K Cantieri e Mezzi" }
    ],
    default: [
        { id: 5, label: "🏛️ 05. Bento Studio", desc: "Design Visivo" },
        { id: 10, label: "🏰 10. Dimore d'Autore", desc: "Spazi di Pregio" },
        { id: 7, label: "🌿 07. L'Empatico", desc: "Accogliente" }
    ]
};

// 🧠 RICONOSCIMENTO AUTOMATICO SETTORE CON PRIORITÀ GERARCHICA
window.detectSectorGroup = function(data) {
    if (!data) return 'default';
    const textToScan = `${data.client_name || ''} ${data.title || ''} ${data.notes || ''} ${data.content_url || ''}`.toLowerCase();

    // 1. Odontoiatria, Chirurgia & Medicina Specialistica
    if (textToScan.includes('dentist') || textToScan.includes('odontoiatr') || textToScan.includes('chirurg') || textToScan.includes('sanadent')) {
        return 'medicina';
    }

    // 2. Architettura, Progettazione, Interior & Design
    if (textToScan.includes('arch') || textToScan.includes('design') || textToScan.includes('interior') || textToScan.includes('geometr') || textToScan.includes('arredo') || textToScan.includes('arillotta')) {
        return 'architettura';
    }

    // 3. Studi Legali, Avvocati, Commercialisti & Notai
    if (textToScan.includes('avvocat') || textToScan.includes('legale') || textToScan.includes('studio leg') || textToScan.includes('notaio') || textToScan.includes('commercialist') || textToScan.includes('tributar')) {
        return 'legale';
    }

    // 4. Vigilanza, Sicurezza & Cantieri
    if (textToScan.includes('vigilanza') || textToScan.includes('sicurezza') || textToScan.includes('cantiere') || textToScan.includes('guardi')) {
        return 'sicurezza';
    }

    // 5. Psicologia, Psicoterapia, Terapie & Dottori/Dottoresse
    if (textToScan.includes('psicolog') || textToScan.includes('terap') || textToScan.includes('counsel') || textToScan.includes('mente') || textToScan.includes('dott') || textToScan.includes('dr.')) {
        return 'psicologia';
    }

    return 'default';
};

// 🔗 RISOLUZIONE UNIVERSALE LINK DEMO PER TUTTI I 23 SAAS E MODULI VOCALI
window.resolveLiveDemoUrl = function(data) {
    if (!data) return "https://rmstudio.app";
    const type = data.portal_type || 'html';
    const name = data.client_name || 'demo';
    const slug = name.toLowerCase().replace(/[^a-z0-9]/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '');

    if (data.content_url && data.content_url.startsWith('http') && !data.content_url.includes('view?id=') && !data.content_url.includes('view.html')) {
        // 🛡️ Paracadute: se è Elena o Vittoria ma il link nel DB era config.html, lo instrada alla pagina corretta
        if (data.portal_type === 'elena' && data.content_url.includes('/config.html')) {
            return data.content_url.replace('/config.html', '/elena-config.html');
        }
        if (data.portal_type === 'vittoria' && data.content_url.includes('/config.html')) {
            return data.content_url.replace('/config.html', '/vittoria-config.html');
        }
        return data.content_url;
    }

    const map = {
        concierge: `https://concierge24.rmstudio.app/chat?struttura_id=${slug}`,
        elena: `https://dentis-app.rmstudio.app/elena-config.html?studio_id=${slug}`,
        vittoria: `https://dentis-app.rmstudio.app/vittoria-config.html?studio_id=${slug}`,
        dentis: `https://dentis-app.rmstudio.app/config.html?studio_id=${slug}`,
        lexis: `https://dentis-app.rmstudio.app/lexis-config.html?studio_id=${slug}`,
        locanda: `https://locandadigitale.rmstudio.app/menu.html?slug=${slug}`,
        radar: `https://drivemotion-radar.rmstudio.app/dashboard.html`,
        forma_materia: `https://formamateria.rmstudio.app/studio.html`,
        aura: `https://aura.rmstudio.app/radar.html`,
        eternia: `https://eternia.rmstudio.app/agency/${slug}`,
        love: `https://love.rmstudio.app/agency/${slug}`,
        experience: `https://experience.rmstudio.app/${slug}`,
        sitengine: `https://sitengine.rmstudio.app/${slug.replace(/_/g, '-')}`,
        html: `https://sitengine.rmstudio.app/${slug.replace(/_/g, '-')}`,
        ares: `https://ares.rmstudio.app/atleta.html`,
        free_energy: `https://free-energy.rmstudio.app/dashboard`,
        velomotion: `https://velomotion.rmstudio.app/dashboard`,
        omniastudio: `https://omniastudio.rmstudio.app`,
        social: `https://social.rmstudio.app`,
        hometour: `https://hometour.rmstudio.app`,
        drivemotion: `https://drivemotion.rmstudio.app`,
        vision: `https://vision.rmstudio.app`,
        ff_edizioni: `https://ff-edizioni.rmstudio.app`,
        ff: `https://ff-edizioni.rmstudio.app`
    };

    return map[type] || `https://sitengine.rmstudio.app/${slug.replace(/_/g, '-')}`;
};

// 📋 METADATI ICONE E SCHEDE PREVIEW PER TUTTI I 23 SAAS E MODULI VOCALI
window.SAAS_APP_PROFILES = {
    concierge: { icon: "fa-hotel text-orange-400", title: "Concierge24 • Giulia Voice Assistant", desc: "Assistente vocale AI H24 e concierge turistico multilingua per hotel e B&B." },
    dentis: { icon: "fa-tooth text-cyan-400", title: "Dentis AI • Serena Voice Receptionist", desc: "Centralino vocale H24 e triage delle urgenze odontoiatriche su linea dedicata." },
    lexis: { icon: "fa-scale-balanced text-yellow-400", title: "Lexis AI • Chiara Voice Assistant", desc: "Segreteria telefonica formale con trascrizione e sintesi automatica delle prime consulenze." },
    elena: { icon: "fa-phone-volume text-emerald-400", title: "Elena AI • Hostess Ristoranti H24", desc: "Ricevimento telefonico H24 per prenotazioni tavoli, gestione orari, coperti e intolleranze." },
    vittoria: { icon: "fa-headset text-blue-400", title: "Vittoria AI • Centralino Agenzie B2B", desc: "Segreteria telefonica inbound H24 per qualificare lead, raccogliere richieste e fissare call strategiche." },
    locanda: { icon: "fa-utensils text-amber-400", title: "Locanda Digitale • Living 3D Menu", desc: "Menu 3D a 60 FPS con comande 1-click su WhatsApp e Bancomat dei Compleanni." },
    radar: { icon: "fa-car-side text-cyan-300", title: "DriveMotion RADAR • Arbitraggio Auto", desc: "Sourcing predittivo di auto da privati con perizia AI del margine lordo." },
    forma_materia: { icon: "fa-monument text-amber-300", title: "Forma & Materia • Studio 4K", desc: "Motore neurale di conversione da schizzo o CAD a render fotorealistico 4K." },
    aura: { icon: "fa-crosshairs text-cyan-400", title: "AURA Proximity • Virtual Radar", desc: "Radar di prossimità vettoriale e chat tattica mesh P2P senza installazione app." },
    eternia: { icon: "fa-dove text-amber-300", title: "ETERNIA • Memoriali QR d'Autore", desc: "Portali memoriali eterni per onoranze funebri con biografo AI e libro ricordi." },
    love: { icon: "fa-ring text-pink-400", title: "LOVE • Partecipazioni Digitali", desc: "Partecipazioni con apertura 3D della busta, RSVP intolleranze e Maxischermo live." },
    experience: { icon: "fa-wine-glass text-amber-400", title: "Smart Experience Page • Ristorazione", desc: "E-menu interattivo con Maître Virtuale e abbinamento vini d'autore." },
    html: { icon: "fa-compass-drafting text-purple-400", title: "SiteEngine Pro • Sito Web d'Autore", desc: "Landing page e blog monolitico ad altissima conversione per professionisti." },
    siteengine: { icon: "fa-compass-drafting text-purple-400", title: "SiteEngine Pro • Sito Web d'Autore", desc: "Landing page e blog monolitico ad altissima conversione per professionisti." },
    ares: { icon: "fa-dumbbell text-purple-400", title: "AresAI • Personal Trainer RPG", desc: "Voice coach vocale per sala pesi, XP in tempo reale e dieta fotografica." },
    free_energy: { icon: "fa-solar-panel text-amber-400", title: "Free Energy • CRM Fotovoltaico", desc: "Piattaforma di progettazione CAD satellitare e gestione trattative impianti solari." },
    velomotion: { icon: "fa-bicycle text-yellow-400", title: "VeloMotion • Sblocco BES3", desc: "Piattaforma officina di sblocco software a 32 km/h per motori Bosch Smart System." },
    omniastudio: { icon: "fa-shield-halved text-purple-400", title: "OmniaStudio • AI Offline Privata", desc: "Intelligenza Artificiale locale 100% offline per avvocati, commercialisti e consulenti." },
    social: { icon: "fa-images text-indigo-400", title: "Carousel Creator • SocialEngine", desc: "Generatore autonomo di caroselli e post kit grafici persuasivi per LinkedIn e Instagram." },
    hometour: { icon: "fa-house text-emerald-400", title: "HomeTour • Video Reel Immobiliari", desc: "Regia AI cinematografica che trasforma foto piatte in video tour 3D." },
    drivemotion: { icon: "fa-car text-cyan-300", title: "DriveMotion • Video Automotive", desc: "Video commerciali cinematografici con sostituzione automatica dello sfondo piazzale." },
    vision: { icon: "fa-video text-pink-400", title: "Vision UGC • Influencer Virtuali", desc: "Generazione video promozionali con testimonial iper-realistici per campagne social." },
    ff_edizioni: { icon: "fa-music text-purple-400", title: "FF Edizioni • Servizi Musicali SIAE", desc: "Brani musicali e jingle promozionali composti su misura con il Maestro Fausto Fusetti." },
    nexus: { icon: "fa-robot text-cyan-400", title: "NexusAI • Shadow-Proxy Sales Overlay", desc: "Assistente virtuale iniettato direttamente sul sito web del cliente." }
};

// 🎁 DIZIONARIO DETTAGLI OFFERTA POLIMORFICO PER TUTTI I SAAS E MODULI VOCALI
window.SAAS_OFFER_DETAILS = {
    // 🤖 NEXUSAI: CHATBOT SU SITI ESISTENTI
    nexus: {
        badge: "NexusAI • Agente Venditore & Receptionist H24",
        title: "Cosa Comprende l'Attivazione di NexusAI Pro",
        desc: "L'assistente AI autonomo che accoglie i visitatori del tuo sito web esistente e converte il traffico passivo in prenotazioni e contatti reali.",
        anchorPrice: 350,
        discountText: "Abbonamento Mensile Senza Vincoli",
        isRecurring: true,
        periodText: "al mese • disdici quando vuoi",
        cadenceLabel: "/mese",
        defaultPrice: 99,
        items: [
            { icon: "fa-robot", color: "text-cyan-400", title: "Chatbot AI Addestrato sul Tuo Menu e Servizi", desc: "Accoglie i visitatori h24, risponde a domande su orari, specialità, allergeni e prezzi in 1 secondo.", val: "€ 150" },
            { icon: "fa-calendar-check", color: "text-emerald-400", title: "Modulo Raccolta Prenotazioni Tavoli e Contatti", desc: "Intercetta chi sta per uscire dalla pagina e registra nome, telefono ed email del cliente.", val: "€ 100" },
            { icon: "fa-code", color: "text-purple-400", title: "Integrazione Invisibile (1 Sola Riga di Codice)", desc: "Funziona su qualsiasi sito esistente (WordPress, Wix, custom) senza modificare il codice o il layout grafico.", val: "€ 50" },
            { icon: "fa-envelope-open-text", color: "text-blue-400", title: "Report Immediati & Notifiche Trascrizioni via Email", desc: "Ricevi i contatti e il riepilogo delle richieste dei clienti direttamente nella tua casella di posta.", val: "€ 50" }
        ],
        ctaText: "Attiva NexusAI Pro per il Tuo Sito"
    },

    // 🍽️ ELENA AI: HOSTESS VOCALE RISTORANTI
    elena: {
        badge: "Presidio Telefonico Sala & Ricevimento Tavoli",
        title: "Cosa Comprende Elena AI PRO",
        desc: "L'assistente vocale H24 che risponde al secondo squillo, gestisce le prenotazioni dei tavoli a sala piena o fuori orario e azzera i no-show.",
        anchorPrice: 650,
        discountText: "Abbonamento Mensile Senza Vincoli",
        isRecurring: true,
        periodText: "al mese • disdici quando vuoi",
        cadenceLabel: "/mese",
        defaultPrice: 149,
        items: [
            { icon: "fa-phone-volume", color: "text-emerald-400", title: "Hostess Vocale H24 Elena (Subentro a Linea Occupata)", desc: "Risponde al secondo squillo anche durante il servizio di punta o nei giorni di chiusura.", val: "€ 300" },
            { icon: "fa-utensils", color: "text-amber-400", title: "Gestione Coperti, Orari, Intolleranze & Seggioloni", desc: "Raccoglie i dettagli dell'ospite, verifica disponibilità tavoli e annota allergie o celiachia.", val: "€ 150" },
            { icon: "fa-calendar-check", color: "text-cyan-400", title: "Sincronizzazione Automatica Google Calendar", desc: "Fissa i tavoli in tempo reale sull'agenda senza sovrapposizioni con il personale di sala.", val: "€ 100" },
            { icon: "fa-brands fa-whatsapp", color: "text-green-400", title: "Promemoria WhatsApp Automatici (-70% No-Show)", desc: "Invia promemoria di conferma agli ospiti il giorno prima abbattendo i tavoli lasciati vuoti.", val: "€ 100" }
        ],
        ctaText: "Attiva Elena PRO per il Ristorante"
    },

    // 🚀 VITTORIA AI: CENTRALINO AGENZIE B2B
    vittoria: {
        badge: "Centralino Esecutivo & Qualifica Lead B2B",
        title: "Cosa Comprende Vittoria AI PRO",
        desc: "La segreteria inbound che accoglie i prospect che chiamano l'agenzia, comprende gli obiettivi di marketing e fissa la discovery call.",
        anchorPrice: 650,
        discountText: "Abbonamento Mensile Senza Vincoli",
        isRecurring: true,
        periodText: "al mese • disdici quando vuoi",
        cadenceLabel: "/mese",
        defaultPrice: 149,
        items: [
            { icon: "fa-headset", color: "text-blue-400", title: "Segreteria Vocale Esecutiva Vittoria H24", desc: "Accoglie con tono autorevole e dinamico le richieste inbound di potenziali clienti dell'agenzia.", val: "€ 300" },
            { icon: "fa-filter", color: "text-purple-400", title: "Triage & Qualifica Obiettivo di Business", desc: "Inquadra subito se cercano campagne ads, restyling sito o gestione social e stima l'interesse.", val: "€ 150" },
            { icon: "fa-video", color: "text-emerald-400", title: "Fissaggio Automatico Discovery Call (Meet/Calendar)", desc: "Verifica gli slot dei consulenti strategici e riserva la call da 20 minuti senza scambi di email.", val: "€ 100" },
            { icon: "fa-envelope-open-text", color: "text-cyan-400", title: "Report Istantaneo con Sintesi Trascrizione via Email", desc: "Il team riceve notifica immediata con punti chiave e registrazione prima di entrare in call.", val: "€ 100" }
        ],
        ctaText: "Attiva Vittoria PRO per l'Agenzia"
    },

    // 🌐 SITEENGINE PRO (SITI WEB COMPLETI)
    html: {
        badge: "Pacchetto Sito Web d'Autore",
        title: "Cosa Comprende la Licenza Definitiva",
        desc: "Tutto ciò che serve per la presenza online d'autore del tuo studio, senza complicazioni tecniche.",
        anchorPrice: 1500,
        discountText: "Risparmi € 1.100 (-73%)",
        items: [
            { icon: "fa-compass-drafting", color: "text-purple-400", title: "Progettazione Sito & 3 Varianti di Stile", desc: "Scegli liberamente quale stile preferisci: carichiamo i tuoi progetti e pubblichiamo la versione finale.", val: "€ 750" },
            { icon: "fa-globe", color: "text-blue-400", title: "Indirizzo Web Personale & Spazio Cloud per 1 Anno", desc: "Registrazione del nome esclusivo dello studio (es: www.tuostudio.it). Zero pratiche a tuo carico.", val: "€ 250" },
            { icon: "fa-pen-nib", color: "text-emerald-400", title: "Blog Diretto da Cellulare (Zero Password)", desc: "Tocchi 'Area Studio' dal telefono, inserisci solo il tuo numero e il PIN per pubblicare in 30 secondi.", val: "€ 300" },
            { icon: "fa-map-location-dot", color: "text-amber-400", title: "Mappa Interattiva & Dati per Ricerche Google", desc: "I clienti trovano lo studio e avviano il navigatore. Codice ottimizzato per farti trovare nelle ricerche locali.", val: "€ 200" }
        ],
        ctaText: "Attiva e Metti Online il Sito"
    },
    siteengine: {
        badge: "Pacchetto Sito Web d'Autore",
        title: "Cosa Comprende la Licenza Definitiva",
        desc: "Tutto ciò che serve per la presenza online d'autore del tuo studio, senza complicazioni tecniche.",
        anchorPrice: 1500,
        discountText: "Risparmi € 1.100 (-73%)",
        items: [
            { icon: "fa-compass-drafting", color: "text-purple-400", title: "Progettazione Sito & 3 Varianti di Stile", desc: "Scegli liberamente quale stile preferisci: carichiamo i tuoi progetti e pubblichiamo la versione finale.", val: "€ 750" },
            { icon: "fa-globe", color: "text-blue-400", title: "Indirizzo Web Personale & Spazio Cloud per 1 Anno", desc: "Registrazione del nome esclusivo dello studio (es: www.tuostudio.it). Zero pratiche a tuo carico.", val: "€ 250" },
            { icon: "fa-pen-nib", color: "text-emerald-400", title: "Blog Diretto da Cellulare (Zero Password)", desc: "Tocchi 'Area Studio' dal telefono, inserisci solo il tuo numero e il PIN per pubblicare in 30 secondi.", val: "€ 300" },
            { icon: "fa-map-location-dot", color: "text-amber-400", title: "Mappa Interattiva & Dati per Ricerche Google", desc: "I clienti trovano lo studio e avviano il navigatore. Codice ottimizzato per farti trovare nelle ricerche locali.", val: "€ 200" }
        ],
        ctaText: "Attiva e Metti Online il Sito"
    },

    // 🏨 CONCIERGE24
    concierge: {
        badge: "Suite Accoglienza Notturna & Turistica",
        title: "Cosa Comprende Concierge24",
        desc: "La receptionist AI che azzera le chiamate perse e gestisce il ricevimento h24 nella lingua nativa dell'ospite.",
        anchorPrice: 750,
        discountText: "Offerta Attivazione Riservata",
        items: [
            { icon: "fa-phone-volume", color: "text-orange-400", title: "Centralino Vocale AI H24 Multilingua (Giulia)", desc: "Risponde in voce naturale a qualsiasi ora in inglese, tedesco, francese, spagnolo e italiano.", val: "€ 350" },
            { icon: "fa-clock", color: "text-blue-400", title: "Gestione Check-in Notturni e Regole Casa", desc: "Istruzioni automatiche su chiavi, parcheggio, orari colazione e deposito bagagli.", val: "€ 150" },
            { icon: "fa-map", color: "text-emerald-400", title: "Concierge Turistico Territoriale (35 km)", desc: "Consiglia ristoranti e mete d'interesse inviando mappe interattive sullo smartphone dell'ospite.", val: "€ 150" },
            { icon: "fa-envelope-open-text", color: "text-purple-400", title: "Report Istantaneo Trascrizione & Audio", desc: "L'albergo riceve notifica email con trascrizione e sintesi solo se ci sono urgenze operative.", val: "€ 100" }
        ],
        ctaText: "Attiva Concierge24 per la Struttura"
    },

    // 🦷 DENTIS AI
    dentis: {
        badge: "Presidio Telefonico & Prime Visite",
        title: "Cosa Comprende Dentis AI",
        desc: "La segreteria vocale per studi dentistici che risponde al secondo squillo e azzera i no-show.",
        anchorPrice: 650,
        discountText: "Promo Dedicata Studi Medici",
        isRecurring: true,
        periodText: "al mese • disdici quando vuoi",
        cadenceLabel: "/mese",
        defaultPrice: 149,
        items: [
            { icon: "fa-tooth", color: "text-cyan-400", title: "Receptionist Vocale H24 Serena (Subentro su Occupato)", desc: "Accoglie con calore ed empatia anche a linee occupate, durante le visite o a studio chiuso.", val: "€ 300" },
            { icon: "fa-hospital", color: "text-red-400", title: "Triage Urgenze Odontoiatriche", desc: "Riconosce il dolore acuto canalizzandolo con priorità negli slot dell'agenda clinica.", val: "€ 150" },
            { icon: "fa-calendar-check", color: "text-emerald-400", title: "Sincronizzazione Google Calendar", desc: "Fissa gli appuntamenti in tempo reale senza sovrapposizioni con la segreteria interna.", val: "€ 100" },
            { icon: "fa-brands fa-whatsapp", color: "text-green-400", title: "Promemoria WhatsApp Automatici (-72% No-Show)", desc: "Invia promemoria ai pazienti il giorno prima abbattendo drasticamente le disdette a vuoto.", val: "€ 100" }
        ],
        ctaText: "Attiva Serena per il Tuo Studio"
    },

    // ⚖️ LEXIS AI
    lexis: {
        badge: "Reperibilità Formale Studio Legale",
        title: "Cosa Comprende Lexis AI",
        desc: "La segreteria vocale qualificata che tutela l'immagine dello studio durante udienze e riunioni.",
        anchorPrice: 650,
        discountText: "Configurazione Istituzionale Riservata",
        isRecurring: true,
        periodText: "al mese • disdici quando vuoi",
        cadenceLabel: "/mese",
        defaultPrice: 149,
        items: [
            { icon: "fa-scale-balanced", color: "text-yellow-400", title: "Segreteria Vocale Formale Chiara ('del Lei')", desc: "Registro deontologico rigoroso con massima tutela del prestigio e della riservatezza (GDPR).", val: "€ 300" },
            { icon: "fa-file-lines", color: "text-blue-400", title: "Filtro Qualificato Prime Consulenze", desc: "Raccoglie i dettagli del caso, verifica le disponibilità e genera una sintesi per l'avvocato.", val: "€ 150" },
            { icon: "fa-phone-flip", color: "text-emerald-400", title: "Attivazione Istantanea Senza Cambio Numero", desc: "Funziona con una semplice deviazione di chiamata su occupato o fuori orario, senza costi di linea.", val: "€ 100" },
            { icon: "fa-shield-halved", color: "text-purple-400", title: "Trascrizione Crittografata via Email", desc: "Notifica immediata con riassunto giuridico per richiamare solo i clienti in target.", val: "€ 100" }
        ],
        ctaText: "Attiva Chiara per lo Studio Legale"
    },

    // 🍕 LOCANDA DIGITALE
    locanda: {
        badge: "Marketing della Ristorazione & Tavoli",
        title: "Cosa Comprende Locanda Digitale",
        desc: "La suite che trasforma i piatti in video 3D a 60 FPS e fidelizza i clienti al tavolo in automatico.",
        anchorPrice: 690,
        discountText: "Offerta Ristorazione Riservata",
        items: [
            { icon: "fa-utensils", color: "text-amber-400", title: "Living 3D Menu al Tavolo a 60 FPS", desc: "I piatti forti e le bottiglie si animano in video 3D dallo smartphone del cliente senza scaricare app.", val: "€ 300" },
            { icon: "fa-cake-candles", color: "text-pink-400", title: "Bancomat dei Compleanni Automatico WhatsApp", desc: "Invia promozioni esclusive a -10 giorni dal compleanno per riempire i tavoli a inizio settimana.", val: "€ 200" },
            { icon: "fa-shield-heart", color: "text-emerald-400", title: "Review Shield per Google Maps", desc: "Indirizza i clienti entusiasti a lasciare 5 stelle su Google intercettando i reclami in privato.", val: "€ 100" },
            { icon: "fa-qrcode", color: "text-purple-400", title: "Grafiche QR Code Alta Risoluzione per i Tavoli", desc: "File pronti per la stampa con comande dirette inviate via WhatsApp alla cucina.", val: "€ 90" }
        ],
        ctaText: "Attiva Locanda Digitale per il Locale"
    },

    // 🍷 SMART EXPERIENCE
    experience: {
        badge: "E-Menu Sensoriale con Sommelier AI",
        title: "Cosa Comprende Smart Experience",
        desc: "La carta digitale interattiva che valorizza la cucina e aumenta gli ordini delle bottiglie in cantina.",
        anchorPrice: 650,
        discountText: "Offerta Signature Riservata",
        items: [
            { icon: "fa-wine-glass", color: "text-purple-400", title: "Sommelier AI & Wine Pairing per Piatto", desc: "Consiglia la bottiglia o il calice ideale per ogni portata aumentando lo scontrino medio.", val: "€ 250" },
            { icon: "fa-wheat-awn", color: "text-amber-400", title: "Storytelling delle Materie Prime a Km 0", desc: "Schede emozionali con origine degli ingredienti, frollature ed eccellenze territoriali.", val: "€ 150" },
            { icon: "fa-robot", color: "text-cyan-400", title: "Maître Virtuale Nexus H24", desc: "Risponde ai clienti su intolleranze, celiachia e guida alla prenotazione del tavolo.", val: "€ 150" },
            { icon: "fa-map-pin", color: "text-emerald-400", title: "Navigatore GPS & Distanza Stradale in Tempo Reale", desc: "Calcola i tempi di percorrenza per i turisti e facilita l'arrivo al ristorante.", val: "€ 100" }
        ],
        ctaText: "Attiva Smart Experience per il Ristorante"
    },

    // 🏎️ DRIVEMOTION RADAR
    radar: {
        badge: "Intelligence B2B Sourcing Auto da Privati",
        title: "Cosa Comprende DriveMotion RADAR",
        desc: "La piattaforma che intercetta le migliori auto da privati prima degli altri concessionari.",
        anchorPrice: 490,
        discountText: "Abbonamento Concessionario Dedicato",
        isRecurring: true,
        periodText: "al mese • disdici quando vuoi",
        cadenceLabel: "/mese",
        defaultPrice: 99,
        items: [
            { icon: "fa-radar", color: "text-cyan-400", title: "Scansione Continua H24 (Subito + FB + AutoScout)", desc: "Isola gli annunci di privati autentici nella tua provincia entro pochi minuti dalla pubblicazione.", val: "€ 200" },
            { icon: "fa-brain", color: "text-purple-400", title: "Perizia Neurale del Margine Netto Reale", desc: "L'AI stima il valore di rivendita ed esclude difetti occulti evidenziando solo i veri affari.", val: "€ 150" },
            { icon: "fa-paper-plane", color: "text-blue-400", title: "Alert Istantanei Telegram & Email con Contatto Diretto", desc: "Ricevi scheda con foto, difetti stimati e link WhatsApp diretto al privato venditore.", val: "€ 100" },
            { icon: "fa-handshake", color: "text-emerald-400", title: "Zero Commissioni d'Asta sui Veicoli", desc: "Tratti direttamente con il privato senza intermediari o percentuali d'acquisto.", val: "€ 40" }
        ],
        ctaText: "Attiva RADAR per la Concessionaria"
    },

    // 🏛️ FORMA & MATERIA
    forma_materia: {
        badge: "Rendering Neurale 4K per Progettisti",
        title: "Cosa Comprende Forma & Materia",
        desc: "La tecnologia neurale che converte schizzi a mano libera e piante CAD in render 4K in 20 secondi.",
        anchorPrice: 790,
        discountText: "Licenza Studio Riservata",
        items: [
            { icon: "fa-wand-magic-sparkles", color: "text-amber-400", title: "Motore Neurale Schizzo-to-Render 4K in 20s", desc: "Carichi una foto del disegno o un wireframe e ottieni render fotorealistici istantanei.", val: "€ 350" },
            { icon: "fa-pen-ruler", color: "text-purple-400", title: "Interprete Intelligente di Note & Frecce a Mano", desc: "Legge le annotazioni scritte a penna sul foglio applicando i materiali esatti indicati.", val: "€ 200" },
            { icon: "fa-layer-group", color: "text-blue-400", title: "Depth Map 3D Senza Artefatti", desc: "Elimina le scritte e i tratti della matita restituendo superfici tridimensionali pulite.", val: "€ 140" },
            { icon: "fa-image", color: "text-emerald-400", title: "Tavole Comparative con Logo Studio per Cantiere", desc: "Esportazione in alta definizione pronte per le presentazioni ai committenti.", val: "€ 100" }
        ],
        ctaText: "Attiva Forma & Materia per lo Studio"
    },

    // 📡 AURA PROXIMITY
    aura: {
        badge: "Radar di Prossimità & Sicurezza Lavoratori",
        title: "Cosa Comprende AURA Proximity",
        desc: "Il radar vettoriale e chat mesh P2P 100% web senza installazione di app.",
        anchorPrice: 350,
        discountText: "Promo Sicurezza Dedicata",
        isRecurring: true,
        periodText: "al mese • disdici quando vuoi",
        cadenceLabel: "/mese",
        defaultPrice: 19,
        items: [
            { icon: "fa-crosshairs", color: "text-cyan-400", title: "Radar Vettoriale 3D & Co-Pilota Vocale HD", desc: "Indicazioni audio in vivavoce e bussola per orientarsi nei gruppi in movimento.", val: "€ 150" },
            { icon: "fa-person-falling", color: "text-red-400", title: "Rilevamento Uomo a Terra & Impatti (D.Lgs. 81/08)", desc: "Invio automatico di allarme e coordinate GPS via WhatsApp in caso di caduta o immobilità.", val: "€ 100" },
            { icon: "fa-comments", color: "text-purple-400", title: "Chat Mesh P2P Privata Residente in RAM", desc: "Scambio dati sicuro a zero tracciamento su server per squadre operative.", val: "€ 100" }
        ],
        ctaText: "Attiva Stanza AURA Proximity"
    },

    // 🕊️ ETERNIA
    eternia: {
        badge: "Memoriali Digitali d'Autore & Agenzia",
        title: "Cosa Comprende ETERNIA",
        desc: "Portali memoriali interattivi ed eterni con QR Code per sollevare le famiglie con eleganza.",
        anchorPrice: 850,
        discountText: "Pacchetto Impresa Riservato",
        items: [
            { icon: "fa-qrcode", color: "text-amber-400", title: "Memoriale QR Perpetuo Stampabile in Tipografia", desc: "Pronto per ricordini cartacei, epigrafi e urne, navigabile da smartphone per sempre.", val: "€ 350" },
            { icon: "fa-book-open", color: "text-purple-400", title: "Biografo AI con Storia di Vita in 3 Capitoli", desc: "Trasforma gli appunti della famiglia in una memoria solenne e toccante.", val: "€ 250" },
            { icon: "fa-heart", color: "text-pink-400", title: "Libro dei Ricordi & Gesti Simbolici Interattivi", desc: "Condoglianze, lumini e pensieri dei conoscenti esportabili in PDF per i familiari.", val: "€ 150" },
            { icon: "fa-building", color: "text-emerald-400", title: "Firma White-Label dell'Impresa Funebre", desc: "Il marchio della tua agenzia compare con prestigio nel footer di ogni memoriale.", val: "€ 100" }
        ],
        ctaText: "Attiva ETERNIA per l'Impresa"
    },

    // 💍 LOVE
    love: {
        badge: "Partecipazioni Nozze Interattive 3D",
        title: "Cosa Comprende LOVE",
        desc: "La suite digitale per partecipazioni nuziali d'autore con gestione lista invitati e maxischermo.",
        anchorPrice: 650,
        discountText: "Pacchetto Nozze Dedicato",
        items: [
            { icon: "fa-envelope", color: "text-pink-400", title: "Apertura 3D della Busta con Sigillo in Ceralacca", desc: "Esperienza cinematografica all'apertura da smartphone per stupire gli invitati.", val: "€ 250" },
            { icon: "fa-utensils", color: "text-amber-400", title: "Modulo RSVP con Tabella Intolleranze Catering", desc: "Raccoglie adesioni e diete particolari esportando il file Excel pronto per lo chef.", val: "€ 150" },
            { icon: "fa-brands fa-whatsapp", color: "text-green-400", title: "Spedizione WhatsApp 1-Tap alla Rubrica", desc: "Invio rapido e sicuro delle partecipazioni con link personalizzato.", val: "€ 100" },
            { icon: "fa-tv", color: "text-purple-400", title: "Maxischermo Live & Photowall per la Sala Ricevimenti", desc: "Foto e messaggi degli invitati proiettati in diretta durante la festa.", val: "€ 150" }
        ],
        ctaText: "Attiva LOVE per il Matrimonio"
    }
};
