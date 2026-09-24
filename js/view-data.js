// js/view-data.js - Modulo Dati, Risoluzione URL 21 SaaS & Riconoscimento Settori

// 🎯 MATRICE DEI 3 FORMAT CURATI PER SETTORE
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

// 🧠 RICONOSCIMENTO AUTOMATICO SETTORE CON SUPPORTO TITOLI ACCADEMICI
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

// 🔗 RISOLUZIONE UNIVERSALE LINK DEMO PER TUTTI I 21 SAAS
window.resolveLiveDemoUrl = function(data) {
    if (!data) return "https://rmstudio.app";
    const type = data.portal_type || 'html';
    const name = data.client_name || 'demo';
    const slug = name.toLowerCase().replace(/[^a-z0-9]/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '');

    // Se ha già un link valido diretto e completo
    if (data.content_url && data.content_url.startsWith('http') && !data.content_url.includes('view?id=') && !data.content_url.includes('view.html')) {
        return data.content_url;
    }

    const map = {
        concierge: `https://concierge24.rmstudio.app/chat?struttura_id=${slug}`,
        dentis: `https://dentis-app.rmstudio.app/config.html`,
        lexis: `https://dentis-app.rmstudio.app/lexis-config.html`,
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

// 📋 METADATI ICONE E SCHEDE PREVIEW PER TUTTI I 21 SAAS
window.SAAS_APP_PROFILES = {
    concierge: { icon: "fa-hotel text-orange-400", title: "Concierge24 • Giulia Voice Assistant", desc: "Assistente vocale AI H24 e concierge turistico multilingua per hotel e B&B." },
    dentis: { icon: "fa-tooth text-cyan-400", title: "Dentis AI • Serena Voice Receptionist", desc: "Centralino vocale H24 e triage delle urgenze odontoiatriche su linea dedicata." },
    lexis: { icon: "fa-scale-balanced text-yellow-400", title: "Lexis AI • Chiara Voice Assistant", desc: "Segreteria telefonica formale con trascrizione e sintesi automatica delle prime consulenze." },
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
