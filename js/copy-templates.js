// GENERATORE NEUROMARKETING & CENTRO SPEDIZIONE • RM STUDIO

window.activeDispatchProjectId = null;

// RECAPITO UFFICIALE RICCARDO MODENA
const MY_PHONE_DISPLAY = "+39 349 525 8418";

// CLAUSOLA ANTI-SPAM & OPT-OUT GDPR UFFICIALE
const GDPR_OPT_OUT_FOOTER = `\n\n---\nComunicazione informativa B2B inviata ai sensi del Regolamento UE 2016/679 (GDPR). Se non desidera ricevere ulteriori aggiornamenti o informative su questa tecnologia, risponda semplicemente "CANCELLA" a questo messaggio e il Suo recapito verrà rimosso immediatamente dai nostri archivi.\nRM Studio • Ariano nel Polesine (RO) / Ferrara • Tel. ${MY_PHONE_DISPLAY} • riccardo@rmstudio.app`;

// 🔗 RISOLUZIONE INTELLIGENTE LINK DEMO REALE & TRACCIATO
function resolveDemoLink(item) {
    const slug = (item.client_name || 'demo').toLowerCase()
        .replace(/[^a-z0-9]/g, '_')
        .replace(/_+/g, '_')
        .replace(/^_|_$/g, '');

    // 1. Locanda Digitale (Living 3D Menu al tavolo)
    if (item.portal_type === 'locanda') {
        return `https://locandadigitale.rmstudio.app/menu.html?slug=${slug}`;
    }

    // 2. DriveMotion RADAR (Dashboard sourcing privato)
    if (item.portal_type === 'radar') {
        return `https://drivemotion-radar.rmstudio.app/dashboard.html`;
    }

    // 3. ETERNIA (Hub B2B Agenzie Funebri)
    if (item.portal_type === 'eternia') {
        return `https://eternia.rmstudio.app/agency/${slug}`;
    }

    // 4. LOVE (Hub B2B Wedding Planner)
    if (item.portal_type === 'love') {
        return `https://love.rmstudio.app/agency/${slug}`;
    }

    // 5. NexusAI (Shadow-Proxy sul sito del cliente)
    if (item.portal_type === 'nexus') {
        if (item.content_url && item.content_url.includes('demo.rmstudio.app')) {
            return item.content_url;
        }
        if (item.content_url && item.content_url.startsWith('http') && !item.content_url.includes('view')) {
            return `https://demo.rmstudio.app/?site=${encodeURIComponent(item.content_url)}`;
        }
        return `https://demo.rmstudio.app`;
    }

    // 6. Concierge24 (Chiamata Vocale Giulia)
    if (item.portal_type === 'concierge') {
        if (item.content_url && item.content_url.includes('chat?struttura_id=')) {
            return item.content_url;
        }
        return `https://concierge24.rmstudio.app/chat?struttura_id=${slug}`;
    }

    // 7. Dentis & Lexis (Configurazione Studio su Hetzner)
    if ((item.portal_type === 'dentis' || item.portal_type === 'lexis') && item.content_url && item.content_url.includes('dentis-app.rmstudio.app')) {
        return item.content_url;
    }

    // 8. Forma & Materia
    if (item.portal_type === 'forma_materia') {
        return item.content_url || `https://formamateria.rmstudio.app/studio`;
    }

    // 9. AURA Proximity
    if (item.portal_type === 'aura') {
        return item.content_url || `https://aura.rmstudio.app/radar.html`;
    }

    // 10. Smart Experience
    if (item.portal_type === 'experience') {
        return item.content_url || `https://experience.rmstudio.app`;
    }

    // 11. SiteEngine Pro (Sito Web / Landing Professionale)
    if (item.portal_type === 'html' || item.portal_type === 'siteengine') {
        if (item.content_url && item.content_url.includes('sitengine.rmstudio.app') && !item.content_url.includes('view')) {
            return item.content_url;
        }
        // Se c'è un ID tracciato del Portale con filigrana
        if (item.id) {
            return `https://portale.rmstudio.app/view?id=${item.id}`;
        }
        return `https://sitengine.rmstudio.app/${slug}`;
    }

    // 12. Se punta già a un link valido rmstudio
    if (item.content_url && item.content_url.includes('rmstudio.app') && !item.content_url.includes('view') && !item.content_url.includes('google')) {
        return item.content_url;
    }

    // 13. Link tracciato Portale di default
    if (item.id) {
        return `https://portale.rmstudio.app/view?id=${item.id}`;
    }

    return 'https://rmstudio.app';
}

function generateWhatsAppCopy(item) {
    const name = item.client_name || 'Titolare';
    const title = item.title || 'Progetto';
    const link = resolveDemoLink(item);

    // 🌐 SiteEngine Pro (Sito Web / Landing d'Autore per Professionisti)
    if (item.portal_type === 'html' || item.portal_type === 'siteengine') {
        // Se nel record è presente un hook personalizzato creato per il lead, usalo
        if (item.whatsapp_custom_hook) {
            return `${item.whatsapp_custom_hook}\n\n👉 ${link}\n\nPuoi provarla direttamente dal tuo smartphone. Fammi sapere cosa ne pensi! 😊`;
        }
        return `Ciao ${name}! 👋\n\nStavo analizzando la presenza online del tuo studio/attività e ho notato che i tuoi progetti meritano una cornice visiva di livello superiore rispetto ai soliti siti web lenti o dispersivi.\n\nTi ho preparato questa bozza interattiva navigabile a 60 FPS senza impegno:\n👉 ${link}\n\nÈ ottimizzata al millimetro per smartphone, si carica in 0.3 secondi reali e include il blog gestibile direttamente da cellulare senza password. Inoltre puoi testare diversi layout d'autore al volo!\n\nDagli un'occhiata dal telefono e dimmi che ne pensi! 😊`;
    }

    // 🍽️ Locanda Digitale (Living 3D Menu & Metodo Bounty)
    if (item.portal_type === 'locanda') {
        return `Ciao ${name}! 👋\n\nStavo ammirando le specialità del vostro locale e vi ho preparato questa demo interattiva del vostro *Living 3D Menu*:\n👉 ${link}\n\nNon è il solito PDF statico: i piatti forti si animano in video 3D a 60 FPS direttamente al tavolo, i clienti inviano le comande su WhatsApp e include la tecnologia automatica che estrae i contatti dei clienti e riempie i tavoli con il *Bancomat dei Compleanni*! 🎂🍷\n\nSi apre all'istante da qualsiasi smartphone senza scaricare app. Dagli un'occhiata e fammi sapere cosa ne pensi! 😊`;
    }

    // 🏎️ DriveMotion RADAR
    if (item.portal_type === 'radar') {
        return `Buongiorno ${name}! 👋\n\nVi scrivo da RM Studio (Ferrara/Rovigo): abbiamo attivato *DriveMotion RADAR*, la piattaforma B2B di intelligence per autosaloni che scansiona Subito, Facebook Marketplace e AutoScout24 h24 per isolare le migliori auto da privati prima degli altri commercianti:\n👉 ${link}\n\nPerizia neurale del margine netto reale, filtro difetti occulti e link WhatsApp diretto al privato. Fatemi sapere se volete fare un test sulla vostra provincia! 🏎️`;
    }

    // 🏛️ Forma & Materia (Architettura & Design)
    if (item.portal_type === 'forma_materia') {
        return `Ciao ${name}! 👋\n\nHo preparato questo spazio di lavoro riservato per il tuo studio su *Forma & Materia*:\n👉 ${link}\n\nÈ una piattaforma neurale che trasforma qualsiasi schizzo a mano libera o disegno CAD in render fotorealistici 4K in 20 secondi. La cosa più comoda è che legge in automatico anche le frecce e le note a penna che scrivi sul foglio!\n\nÈ 100% web, puoi provarlo anche da tablet o smartphone. Fammi sapere cosa ne pensi! 🏛️✨`;
    }

    // 📡 AURA Proximity
    if (item.portal_type === 'aura') {
        return `Ciao ${name}! 👋\n\nHo configurato e attivato la vostra stanza su *AURA Proximity*:\n👉 ${link}\n\nÈ 100% web: basta aprire il link dallo smartphone per essere subito collegati con radar vettoriale, Co-Pilota vocale in vivavoce e rilevatore automatico cadute/urti.\n\nFammi sapere se riuscite a fare una prova sul campo! 📡`;
    }

    // 🕊️ ETERNIA (Onoranze Funebri)
    if (item.portal_type === 'eternia') {
        return `Gentile Direzione di ${name}, buongiorno.\n\nAbbiamo attivato per la vostra impresa l'ambiente riservato di *ETERNIA*, la piattaforma digitale d'autore per onoranze funebri:\n👉 ${link}\n\nInclude Memoriali QR perpetui, biografo AI con storia di vita in 3 capitoli e libro dei ricordi digitale per sollevare le famiglie con eleganza. Resto a disposizione per qualsiasi chiarimento.`;
    }

    // 💍 LOVE (Wedding Planner)
    if (item.portal_type === 'love') {
        return `Ciao ${name}! 👋\n\nHo preparato questo spazio di lavoro riservato su *LOVE* per le vostre partecipazioni digitali interattive d'autore:\n👉 ${link}\n\nApertura 3D della busta con ceralacca, modulo RSVP con gestione intolleranze per il catering e Maxischermo live per la sala ricevimenti con giochi e photo-wall. Dagli un'occhiata! 💍`;
    }

    // 🤖 NexusAI
    if (item.portal_type === 'nexus') {
        return `Ciao ${name}! 👋\n\nStavo visitando il vostro sito web: è molto curato, ma statisticamente oltre il 95% dei visitatori esce senza lasciare un contatto.\n\nVi ho preparato una demo live del vostro sito con a bordo il venditore AI di *NexusAI*:\n👉 ${link}\n\nÈ uno Shadow-Proxy: non abbiamo modificato una sola riga del vostro codice. Cliccando dal telefono vedrete il vostro sito con l'assistente già attivo che accoglie i visitatori, risponde alle domande e raccoglie contatti prima che lascino la pagina!\n\nDategli un'occhiata e fatemi sapere cosa ne pensate! 🚀`;
    }

    // 🏨 Concierge24
    if (item.portal_type === 'concierge') {
        return `Buongiorno ${name}! 👋\n\nVi contatto direttamente dal territorio (RM Studio, Ferrara/Rovigo): supportiamo le strutture ricettive nell'azzerare le chiamate perse e alleggerire il carico del ricevimento, soprattutto sui turni notturni (23:00–07:00) e festivi.\n\nAbbiamo sviluppato *Concierge24*, un assistente vocale AI ("Giulia") che risponde al centralino H24 nella lingua nativa dell'ospite (EN, DE, FR, IT), gestisce check-in notturni, regole della casa, colazione e invia mappe interattive dei ristoranti direttamente sullo smartphone del turista.\n\nPotete avviare una chiamata vocale di prova con Giulia cliccando qui:\n👉 ${link}\n\nFunziona a consumo, senza canoni fissi obbligatori. Fatemi sapere se può esservi utile per le notti!`;
    }

    // 🦷 Dentis AI
    if (item.portal_type === 'dentis') {
        return `Buongiorno ${name}! 👋\n\nVi scrivo da Ferrara/Rovigo (RM Studio): supportiamo gli studi medici e odontoiatrici nell'accoglienza telefonica e nella gestione delle prime visite.\n\nPer non rischiare di perdere chiamate e urgenze durante le pause pranzo, fuori orario o mentre la linea è occupata, abbiamo sviluppato *Dentis*, una receptionist AI ("Serena") che risponde in voce naturale al 2° squillo H24, gestisce il triage delle urgenze e sincronizza gli appuntamenti con promemoria WhatsApp.\n\nPotete provarla dal vivo senza impegno qui:\n👉 ${link}\n\nResto a disposizione per qualsiasi prova! 🦷📞`;
    }

    // ⚖️ Lexis AI
    if (item.portal_type === 'lexis') {
        return `Gentile ${name}, buongiorno.\n\nLe scrivo dallo studio software RM Studio (Ferrara/Rovigo): affianchiamo gli studi legali nell'accoglienza telefonica qualificata quando i professionisti sono impegnati in udienza o riunione.\n\nAbbiamo sviluppato *Lexis AI* ("Chiara"), una segreteria vocale che adotta un registro rigorosamente formale ("del Lei"), raccoglie le richieste di nuove consulenze fuori orario e notifica immediatamente lo studio con sintesi e trascrizione.\n\nPuò testare la linea qui:\n👉 ${link}\n\nResto a Sua disposizione. Cordiali saluti.`;
    }

    // 🍷 Smart Experience Page
    if (item.portal_type === 'experience') {
        return `Ciao ${name}! 👋\n\nHo digitalizzato il menu e la storia del vostro locale nella nuova *Smart Experience Page* con Maître AI e abbinamento vini:\n👉 ${link}\n\nSe vi piace potete usarla per i vostri clienti e per le prenotazioni WhatsApp! Fatemi sapere cosa ne pensate 😊`;
    }

    // Template Standard
    return `Ciao ${name}! 👋\n\nHo appena completato la lavorazione speciale per te: *"${title}"*.\n\nPuoi guardare l'anteprima riservata direttamente qui:\n👉 ${link}\n\nFammi sapere cosa ne pensi! 😊`;
}

function generateEmailCopy(item) {
    const name = item.client_name || 'Gentile Professionista';
    const title = item.title || 'il vostro business';
    const link = resolveDemoLink(item);

    let text = "";

    // 🌐 SiteEngine Pro (Email Istituzionale ad Alta Conversione)
    if (item.portal_type === 'html' || item.portal_type === 'siteengine') {
        text = `OGGETTO: 🌐 Anteprima riservata del nuovo portale web d'autore per ${name}\n\nGentile ${name},\n\nLe scrivo da RM Studio (Ferrara / Rovigo): sviluppiamo piattaforme web e landing page professionali basate sulle neuroscienze cognitive, progettate specificamente per valorizzare il posizionamento di studi professionali e imprese.\n\nAnalizzando la presenza online del Suo studio, abbiamo elaborato una bozza di anteprima navigabile ad alte prestazioni, visionabile direttamente a questo link riservato:\n👉 ${link}\n\nA differenza dei tradizionali siti web realizzati su WordPress (spesso appesantiti da decine di plugin, lenti al caricamento e vulnerabili), la nostra architettura proprietaria SiteEngine Pro offre vantaggi concreti immediati:\n\n- Velocità estrema di caricamento (0.3 secondi reali, Core Web Vitals 99/100 certificati da Google);\n- Impaginazione a cannocchiale studiata per azzerare l'attrito cognitivo e guidare il visitatore verso il contatto diretto su WhatsApp o via telefono;\n- Dati strutturati Schema.org integrati per posizionare lo studio al vertice delle ricerche locali su Google Maps;\n- Blog integrato aggiornabile in totale mobilità dallo smartphone tramite Magic Link sicuro, senza necessità di ricordare alcuna password;\n- Nessun abbonamento mensile obbligatorio: licenza una tantum con hosting ultra-veloce, certificato SSL e manutenzione inclusi per il primo anno.\n\nPuò visualizzare liberamente la bozza anche dal Suo smartphone. Se l'impostazione rispecchia l'identità del Suo studio, possiamo collegarla in poche ore al Suo dominio personale definitivo.\n\nResto a Sua completa disposizione per qualsiasi confronto o personalizzazione.\n\nUn cordiale saluto,\nRiccardo Modena\nRM Studio • Soluzioni Software & Sviluppo Web B2B\nTel / WhatsApp: ${MY_PHONE_DISPLAY}`;
    }
    // 🍽️ Locanda Digitale
    else if (item.portal_type === 'locanda') {
        text = `OGGETTO: 🍽️ Anteprima Living 3D Menu & Motore Clienti H24 per ${name}\n\nGentile Direzione di ${name},\n\nAbbiamo elaborato una dimostrazione interattiva su misura per il vostro locale, accessibile direttamente a questo link riservato:\n👉 ${link}\n\nLocanda Digitale non è un semplice menu digitale in PDF: trasforma le vostre portate forti in video 3D ad alta fluidità (60 FPS) visibili direttamente dallo smartphone dei clienti al tavolo, velocizza le comande su WhatsApp e integra il sistema automatizzato che cattura i contatti dei clienti per riempire i coperti con il Bancomat dei Compleanni a -10 giorni, proteggendo inoltre le recensioni del locale su Google Maps.\n\nRestiamo a completa disposizione per qualsiasi prova dal vivo o personalizzazione grafica.\n\nUn cordiale saluto,\nRiccardo Modena\nRM Studio • Tecnologie per la Ristorazione\nTel / WhatsApp: ${MY_PHONE_DISPLAY}`;
    }
    // 🏎️ DriveMotion RADAR
    else if (item.portal_type === 'radar') {
        text = `OGGETTO: 🏎️ Sourcing auto da privati prima degli altri saloni - ${name}\n\nGentile Titolare di ${name},\n\nLe scrivo da RM Studio (Ferrara/Rovigo): supportiamo i commercianti d'auto e gli autosaloni nell'acquisizione delle migliori auto usate da privati prima che finiscano nelle aste o dai concorrenti.\n\nAbbiamo configurato per voi la dashboard di **DriveMotion RADAR**:\n👉 ${link}\n\nIl motore scansiona Subito.it, Facebook Marketplace e AutoScout24 h24 nella vostra provincia, perizia il margine netto reale con AI escludendo difetti occulti e vi invia gli affari istantaneamente su Telegram ed Email con contatto WhatsApp diretto al privato venditore.\n\nNon applichiamo alcuna commissione sulle auto comprate: il servizio opera a canone mensile senza vincoli.\n\nResto volentieri a disposizione per attivarvi una prova gratuita sulla vostra zona.\n\nUn cordiale saluto,\nRiccardo Modena\nRM Studio • Sviluppo Tecnologie B2B Automotive\nTel / WhatsApp: ${MY_PHONE_DISPLAY}`;
    }
    // 🏛️ Forma & Materia
    else if (item.portal_type === 'forma_materia') {
        text = `OGGETTO: 🏛️ Studio di Rendering Neurale Attivo - ${title}\n\nGentile ${name},\n\nAbbiamo attivato l'ambiente di lavoro dedicato per "${title}" su Forma & Materia.\n\nPuoi accedere direttamente senza installare alcun software dal link riservato:\n👉 ${link}\n\nIl motore neurale consente di caricare schizzi a matita, planimetrie o wireframe CAD e ottenere render fotorealistici in 4K in 20 secondi, preservando l'esatta geometria e interpretando automaticamente le annotazioni e le frecce a penna scritte sul foglio.\n\nRestiamo a tua disposizione per qualsiasi supporto o prova personalizzata.\n\nUn cordiale saluto,\nRiccardo Modena\nRM Studio • Tecnologie di Rendering Neurale\nTel / WhatsApp: ${MY_PHONE_DISPLAY}`;
    }
    // 📡 AURA Proximity
    else if (item.portal_type === 'aura') {
        text = `OGGETTO: 📡 La tua stanza radar AURA Proximity è attiva - ${title}\n\nGentile ${name},\n\nAbbiamo attivato la sessione radar mesh per "${title}".\n\nPuoi accedere direttamente senza installare alcuna app dal link dedicato:\n👉 ${link}\n\nIl sistema include Co-Pilota Vocale HD in vivavoce, bussola 3D, chat mesh P2P residente in RAM e rilevamento automatico impatti/Man-Down a norma D.Lgs. 81/08 per la sicurezza sul lavoro.\n\nRestiamo a tua disposizione per qualsiasi supporto.\n\nUn cordiale saluto,\nRiccardo Modena\nRM Studio • Sistemi di Sicurezza & Prossimità\nTel / WhatsApp: ${MY_PHONE_DISPLAY}`;
    }
    // 🕊️ ETERNIA
    else if (item.portal_type === 'eternia') {
        text = `OGGETTO: 🕊️ Hub Digitale d'Autore per Onoranze Funebri - ${name}\n\nGentile Direzione di ${name},\n\nLe scrivo da RM Studio: abbiamo attivato l'ambiente riservato white-label per la vostra impresa su **ETERNIA**:\n👉 ${link}\n\nETERNIA trasforma i tradizionali ricordini cartacei in portali memoriali digitali interattivi con QR Code vettoriale pronto per la tipografia, biografo AI con storia di vita solenne in 3 capitoli e libro dei ricordi digitale stampabile per i familiari, con la firma esclusiva della vostra agenzia nel footer.\n\nNon richiede canoni fissi obbligatori: opera con pacchetti prepagati a consumo.\n\nRestiamo a vostra completa disposizione per una dimostrazione del pannello agenzia.\n\nUn cordiale saluto,\nRiccardo Modena\nRM Studio • Soluzioni Digitali d'Autore\nTel / WhatsApp: ${MY_PHONE_DISPLAY}`;
    }
    // 💍 LOVE
    else if (item.portal_type === 'love') {
        text = `OGGETTO: 💍 Hub Partecipazioni Digitali Interattive - ${name}\n\nGentile ${name},\n\nLe scrivo da RM Studio: abbiamo attivato il vostro studio B2B riservato su **LOVE**:\n👉 ${link}\n\nLa suite permette alle agenzie di creare partecipazioni digitali con apertura 3D della busta in ceralacca, modulo RSVP con tabella intolleranze alimentari scaricabile per il catering, invio WhatsApp 1-tap agli invitati e Maxischermo interattivo per la sala ricevimenti con giochi e photowall live.\n\nResto volentieri a disposizione per mostrarvi le funzionalità dedicate ai Wedding Planner.\n\nUn cordiale saluto,\nRiccardo Modena\nRM Studio • Piattaforme Digitali\nTel / WhatsApp: ${MY_PHONE_DISPLAY}`;
    }
    // 🤖 NexusAI
    else if (item.portal_type === 'nexus') {
        text = `OGGETTO: 🤖 Abbiamo attivato una demo del venditore AI sul vostro sito - ${name}\n\nGentile Direzione di ${name},\n\nLe scrivo da RM Studio (Ferrara/Rovigo): sviluppiamo tecnologie AI per convertire i visitatori passivi dei siti web in contatti commerciali qualificati.\n\nVisitando il vostro portale abbiamo notato una presenza di qualità, ma oggi oltre il 95% degli utenti che navigano su un sito vetrina tende ad abbandonare la pagina senza richiedere informazioni o lasciare un contatto.\n\nPer mostrarvi la soluzione, abbiamo configurato per voi una simulazione interattiva tramite tecnologia Shadow-Proxy direttamente sul vostro sito web, accessibile qui:\n👉 ${link}\n\nNexusAI agisce come un venditore e receptionist virtuale H24:\n- Accoglie proattivamente i visitatori con tono caloroso e professionale;\n- Risponde alle domande frequenti su servizi, orari e prezzi in meno di 2 secondi;\n- Raccoglie nome, cellulare ed email del potenziale cliente e ve li notifica all'istante;\n- Si installa in 2 minuti incollando una singola riga di codice HTML.\n\nI nostri piani partono da 49€/mese senza vincoli contrattuali.\n\nResto a vostra disposizione per qualsiasi personalizzazione.\n\nUn cordiale saluto,\nRiccardo Modena\nRM Studio • Sviluppo Tecnologie B2B\nTel / WhatsApp: ${MY_PHONE_DISPLAY}`;
    }
    // 🏨 Concierge24
    else if (item.portal_type === 'concierge') {
        text = `OGGETTO: 🏨 Centralino notturno e assistenza multilingua H24 per ${name}\n\nGentile Direzione di ${name},\n\nLe scrivo direttamente dal territorio (RM Studio, software house a Ferrara e Rovigo) conoscendo bene la complessità per le strutture ricettive nel garantire una copertura costante del front-desk, in particolare durante la fascia notturna (23:00–07:00), i weekend e i periodi di forte afflusso.\n\nPer sollevare il personale ed evitare che chiamate o richieste di ospiti internazionali restino senza risposta, abbiamo sviluppato **Concierge24**: un assistente vocale AI ("Giulia") pensato specificamente per l'ospitalità alberghiera:\n\n- **Risposta telefonica istantanea H24:** parla nella lingua madre dell'ospite (inglese, tedesco, francese, spagnolo, italiano) con dizione e pause naturali;\n- **Gestione completa dei dubbi ricorrenti:** istruzioni precise su check-in tardivo, orari colazione, parcheggio, deposito bagagli e regole della struttura;\n- **Concierge turistico interattivo:** consiglia ristoranti tipici e luoghi d'interesse entro 35 km, inviando mappe e percorsi stradali sullo smartphone dell'ospite durante la chiamata;\n- **Report e controllo:** l'albergo riceve via email trascrizione, riassunto e audio della conversazione solo se vi sono reali necessità operative in camera.\n\nNon richiediamo alcun canone fisso mensile vincolante: opera a consumo con 15 minuti di prova gratuiti.\n\nPuò avviare una chiamata vocale di prova con Giulia cliccando qui:\n👉 ${link}\n*(Tocchi l'icona del microfono per iniziare a parlare con l'assistente)*\n\nResto volentieri a vostra completa disposizione.\n\nUn cordiale saluto,\nRiccardo Modena\nRM Studio • Sviluppo Tecnologie B2B\nTel / WhatsApp: ${MY_PHONE_DISPLAY}`;
    }
    // 🦷 Dentis AI
    else if (item.portal_type === 'dentis') {
        text = `OGGETTO: 🦷 Gestione chiamate fuori orario e prime visite per ${name}\n\nGentile Direzione di ${name},\n\nLe scrivo da Ferrara/Rovigo (RM Studio, software house specializzata in automazioni per il settore sanitario e professionale).\n\nSappiamo bene che durante le visite alla poltrona, la pausa pranzo o quando la segreteria è impegnata con un paziente al banco, ogni telefonata che trova linea occupata o senza risposta rappresenta una prima visita o un'urgenza che rischia di rivolgersi a un altro studio.\n\nPer risolvere questo collo di bottiglia abbiamo sviluppato **Dentis**, una receptionist telefonica AI ("Serena") addestrata per l'odontoiatria:\n\n- **Risposta immediata al 2° squillo H24:** accoglie i pazienti con tono caloroso ed empatico anche la sera, nei weekend o durante le chiusure;\n- **Triage delle urgenze odontoiatriche:** riconosce il dolore acuto canalizzandolo negli slot prioritari;\n- **Sincronizzazione agenda e no-show azzerati:** fissa le prime visite su Google Calendar e invia promemoria automatici via WhatsApp ai pazienti il giorno prima dell'appuntamento (riducendo le disdette dell'80%).\n\nLa scheda tecnica dell'assistente con le regole del vostro studio è consultabile qui:\n👉 ${link}\n*(Numero di prova sandbox nazionale abilitato: +39 0425 167 5950)*\n\nResto a vostra disposizione per qualsiasi verifica o configurazione personalizzata.\n\nUn cordiale saluto,\nRiccardo Modena\nRM Studio • Tecnologie Mediche B2B\nTel / WhatsApp: ${MY_PHONE_DISPLAY}`;
    }
    // ⚖️ Lexis AI
    else if (item.portal_type === 'lexis') {
        text = `OGGETTO: ⚖️ Reperibilità telefonica qualificata H24 per ${name}\n\nGentile Avvocato / Direzione di ${name},\n\nLe scrivo dallo studio software RM Studio (Ferrara/Rovigo). Conosciamo bene quanto gli impegni in udienza e le riunioni rendano complessa la costante reperibilità telefonica dello studio legale, con il rischio che nuove richieste di patrocinio o consulenze rimangano senza riscontro.\n\nAbbiamo sviluppato **Lexis AI** ("Chiara"), una segreteria vocale avanzata calibrata sulle esigenze dell'avvocatura:\n\n- **Registro rigorosamente formale ("del Lei"):** tutela dell'immagine e del prestigio dello studio con massima riservatezza (GDPR);\n- **Filtro delle richieste e prime consulenze:** raccoglie i dettagli del caso, verifica le disponibilità e notifica immediatamente il professionista via email con trascrizione e sintesi;\n- **Attivazione senza modifiche di linea:** funziona tramite una semplice deviazione di chiamata attiva solo su occupato o fuori orario.\n\nPuò verificare il funzionamento ed effettuare una prova dal vivo qui:\n👉 ${link}\n*(Numero di prova dedicato: +39 0425 167 5950)*\n\nResto a Sua completa disposizione per qualsiasi approfondimento.\n\nCordiali saluti,\nRiccardo Modena\nRM Studio • Sistemi Software per Professionisti\nTel / WhatsApp: ${MY_PHONE_DISPLAY}`;
    }
    // 🍷 Smart Experience
    else if (item.portal_type === 'experience') {
        text = `OGGETTO: 🍷 Anteprima Smart Experience Page & Maître AI per ${name}\n\nGentile ${name},\n\nAbbiamo digitalizzato il menu e la storia del vostro locale nella nuova Smart Experience Page interattiva, accessibile a questo link riservato:\n👉 ${link}\n\nSostituisce i vecchi PDF con un'esperienza dinamica: include il Maître Virtuale AI che consiglia i piatti e gli abbinamenti con i vini della vostra carta, il calcolo della distanza chilometrica in tempo reale e i pulsanti per prenotare il tavolo direttamente su WhatsApp.\n\nRestiamo a disposizione per qualsiasi personalizzazione.\n\nUn cordiale saluto,\nRiccardo Modena\nRM Studio • Hospitality & Taste Engine\nTel / WhatsApp: ${MY_PHONE_DISPLAY}`;
    }
    // Default
    else {
        text = `OGGETTO: 🎁 La tua anteprima riservata è pronta - ${title}\n\nGentile ${name},\n\nAbbiamo completato l'elaborazione del tuo progetto "${title}".\n\nPuoi accedere all'anteprima protetta da watermark a questo indirizzo:\n👉 ${link}\n\nSiamo a tua disposizione per qualsiasi modifica o chiarimento.\n\nUn cordiale saluto,\nRiccardo Modena\nRM Studio • Software per l'Automazione B2B\nTel / WhatsApp: ${MY_PHONE_DISPLAY}`;
    }

    return text + GDPR_OPT_OUT_FOOTER;
}

// 🎯 APERTURA MODALE DISPATCHER
function openMessageModal(id, type) {
    const item = window.allProjects.find(p => p.id === id);
    if (!item) return;

    window.activeDispatchProjectId = id;

    const emailFields = document.getElementById('modal-email-fields');
    const toInput = document.getElementById('modal-to-email');
    const subjectInput = document.getElementById('modal-subject');
    const textarea = document.getElementById('copy-text-area');
    const titleEl = document.getElementById('modal-dispatch-title');
    const resendBtn = document.getElementById('btn-send-resend');
    const waBtn = document.getElementById('copy-wa-direct-link');

    if (type === 'mail') {
        titleEl.innerText = "Spedizione Proposta via Email (Resend)";
        emailFields.classList.remove('hidden');
        resendBtn.classList.remove('hidden');
        waBtn.classList.add('hidden');

        toInput.value = item.client_email || '';

        const fullCopy = generateEmailCopy(item);
        let subject = `Proposta Riservata • ${item.title || 'RM Studio'}`;
        let body = fullCopy;

        if (fullCopy.startsWith("OGGETTO:")) {
            const parts = fullCopy.split("\n\n");
            subject = parts[0].replace("OGGETTO:", "").trim();
            body = parts.slice(1).join("\n\n");
        }

        subjectInput.value = subject;
        textarea.value = body;

    } else {
        titleEl.innerText = "Invio Messaggio Diretto (WhatsApp)";
        emailFields.classList.add('hidden');
        resendBtn.classList.add('hidden');
        waBtn.classList.remove('hidden');

        const waText = generateWhatsAppCopy(item);
        textarea.value = waText;

        const phone = (item.client_phone || '').replace(/[^0-9]/g, '');
        const waUrl = phone 
            ? `https://wa.me/${phone}?text=${encodeURIComponent(waText)}`
            : `https://wa.me/?text=${encodeURIComponent(waText)}`;

        waBtn.href = waUrl;
        waBtn.onclick = () => {
            updateSupabaseField(item.id, 'is_whatsapp_sent', true);
            closeCopyModal();
        };
    }

    const modal = document.getElementById('copy-modal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeCopyModal() {
    const modal = document.getElementById('copy-modal');
    if (modal) {
        modal.classList.remove('flex');
        modal.classList.add('hidden');
    }
    window.activeDispatchProjectId = null;
}

function executeCopyText() {
    const text = document.getElementById('copy-text-area').value;
    navigator.clipboard.writeText(text).then(() => alert("✓ Testo copiato negli appunti!"));
}

// 🚀 SPEDIZIONE DIRETTA CON RESEND VIA WEBHOOK N8N
async function executeResendDirectSend() {
    const item = window.allProjects.find(p => p.id === window.activeDispatchProjectId);
    if (!item) return alert("Nessun progetto selezionato.");

    const toEmail = document.getElementById('modal-to-email').value.trim();
    const subject = document.getElementById('modal-subject').value.trim();
    const bodyText = document.getElementById('copy-text-area').value.trim();

    if (!toEmail || !toEmail.includes('@')) {
        return alert("Inserisci un'email valida per il destinatario.");
    }
    if (!subject) return alert("Inserisci l'oggetto dell'email.");
    if (!bodyText) return alert("Il corpo dell'email non può essere vuoto.");

    const btn = document.getElementById('btn-send-resend');
    const originalText = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = `<i class="fa-solid fa-spinner animate-spin"></i> Spedizione Resend in corso...`;

    try {
        const res = await fetch('https://n8n.rmstudio.app/webhook/invia-email-proposta', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                project_id: item.id,
                to: toEmail,
                subject: subject,
                body: bodyText,
                client_name: item.client_name,
                portal_type: item.portal_type,
                title: item.title
            })
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        await updateSupabaseField(item.id, 'first_email_sent', true);

        alert(`✨ Proposta spedita con successo via Resend a: ${toEmail}`);
        closeCopyModal();
        loadMasterData();

    } catch (err) {
        alert("⚠️ Errore invio con Resend: " + err.message + "\nAssicurati che il workflow 'Invia Email Proposta Resend' sia attivo su n8n.");
    } finally {
        btn.disabled = false;
        btn.innerHTML = originalText;
    }
}
