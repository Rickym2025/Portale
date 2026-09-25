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
        // Se non è ancora pagato, invia SEMPRE il link protetto da filigrana del Portale!
        if ((item.is_paid === false || item.is_paid === "false") && item.id) {
            return `https://portale.rmstudio.app/view?id=${item.id}`;
        }
        return item.content_url || `https://sitengine.rmstudio.app/${slug}`;
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

// 💬 WHATSAPP COPY: BREVI, ESSENZIALI E FORMALI ("DEL LEI")
function generateWhatsAppCopy(item) {
    const name = item.client_name || 'Gentile Professionista';
    const title = item.title || 'Progetto';
    const link = resolveDemoLink(item);

    // 🌐 SiteEngine Pro (Sito Web Professionale d'Autore)
    if (item.portal_type === 'html' || item.portal_type === 'siteengine') {
        if (item.whatsapp_custom_hook) {
            return `${item.whatsapp_custom_hook}\n\n👉 ${link}\n\nPuò visionare la bozza dal Suo smartphone. Resto a disposizione per qualsiasi chiarimento.`;
        }
        return `Buongiorno ${name}. Le scrivo da RM Studio (Ferrara/Rovigo): seguendo i professionisti del territorio, Le ho preparato senza impegno una bozza dimostrativa per il nuovo sito web del Suo studio, ottimizzata a 60 FPS per smartphone:\n\n👉 ${link}\n\nPuò visionarla direttamente dal telefono e testare le varianti di stile. Mi farebbe piacere avere un Suo riscontro!`;
    }

    // 🍽️ Locanda Digitale (Living 3D Menu & Compleanni)
    if (item.portal_type === 'locanda') {
        return `Buongiorno ${name}. Complimenti per la cucina del vostro locale! Vi ho preparato una dimostrazione del Living 3D Menu al tavolo con comande WhatsApp e programma compleanni:\n\n👉 ${link}\n\nSi apre al volo da smartphone senza installare app. Dategli un'occhiata, mi farebbe molto piacere un vostro parere!`;
    }

    // 🏎️ DriveMotion RADAR (Sourcing Privati)
    if (item.portal_type === 'radar') {
        return `Buongiorno ${name}. Da RM Studio supportiamo i commercianti d'auto nell'acquisizione delle migliori occasioni da privati prima delle aste (scansione Subito/AutoScout h24 con perizia AI del margine):\n\n👉 ${link}\n\nSe desidera fare una prova senza impegno sul territorio, resto a Sua completa disposizione.`;
    }

    // 🏛️ Forma & Materia (Render 4K da Schizzo)
    if (item.portal_type === 'forma_materia') {
        return `Buongiorno ${name}. Per il Suo studio di progettazione ho configurato questa stanza su Forma & Materia: converte schizzi a mano libera o file CAD in render fotorealistici 4K in 20 secondi, interpretando anche le Sue note a penna:\n\n👉 ${link}\n\nÈ 100% web senza installare software. Mi dica cosa ne pensa!`;
    }

    // 📡 AURA Proximity (Radar Mesh & Sicurezza)
    if (item.portal_type === 'aura') {
        return `Buongiorno ${name}. Ho attivato la stanza dimostrativa su AURA Proximity: radar mesh P2P da browser, Co-Pilota vocale in vivavoce e rilevamento uomo a terra D.Lgs. 81/08:\n\n👉 ${link}\n\nFunziona direttamente da smartphone senza installare app. Fatemi sapere se riuscite a testarlo sul campo!`;
    }

    // 🕊️ ETERNIA (Memoriali QR d'Autore)
    if (item.portal_type === 'eternia') {
        return `Gentile Direzione di ${name}, buongiorno. Abbiamo attivato per la Sua impresa l'ambiente riservato di ETERNIA: portali memoriali digitali con QR d'autore, biografo AI e libro ricordi per sollevare le famiglie con eleganza:\n\n👉 ${link}\n\nRestiamo a completa disposizione per qualsiasi chiarimento.`;
    }

    // 💍 LOVE (Partecipazioni Digitali)
    if (item.portal_type === 'love') {
        return `Buongiorno ${name}. Ho configurato per la Vostra agenzia lo studio riservato su LOVE per le partecipazioni digitali d'autore (busta 3D con ceralacca, RSVP intolleranze catering e maxischermo per la sala ricevimenti):\n\n👉 ${link}\n\nDategli un'occhiata da smartphone, spero sia di vostro gradimento!`;
    }

    // 🤖 NexusAI (Chatbot Shadow-Proxy)
    if (item.portal_type === 'nexus') {
        return `Buongiorno ${name}. Analizzando il vostro sito web abbiamo preparato una simulazione di NexusAI: un assistente virtuale che accoglie i visitatori e raccoglie contatti commerciali h24 prima che escano dalla pagina:\n\n👉 ${link}\n\nNon modifica il vostro codice. Dategli un'occhiata dal telefono e fatemi sapere!`;
    }

    // 🏨 Concierge24 (Assistente Vocale Notturno)
    if (item.portal_type === 'concierge') {
        return `Buongiorno Direzione di ${name}. Da Ferrara/Rovigo supportiamo le strutture ricettive con Concierge24: l'assistente vocale AI che risponde al centralino H24 nella lingua dell'ospite e gestisce check-in notturni e info:\n\n👉 ${link}\n\n(Toccando il microfono può fare una chiamata di prova con Giulia). Resto a disposizione!`;
    }

    // 🦷 Dentis AI (Receptionist Odontoiatrica)
    if (item.portal_type === 'dentis') {
        return `Buongiorno Direzione di ${name}. Per evitare chiamate perse fuori orario o a linee occupate, abbiamo configurato per lo studio Serena, la segreteria telefonica AI che gestisce triage e promemoria WhatsApp:\n\n👉 ${link}\n\nPuò testare la linea di prova dal link. Resto a disposizione per qualsiasi chiarimento!`;
    }

    // ⚖️ Lexis AI (Segreteria Legale Formale)
    if (item.portal_type === 'lexis') {
        return `Gentile Avvocato / Direzione di ${name}, buongiorno. Per garantire una reperibilità qualificata durante udienze e riunioni, abbiamo configurato per il Suo studio Chiara, la segreteria vocale con registro formale del "Lei":\n\n👉 ${link}\n\nPuò verificare il funzionamento ed effettuare una prova dal link. Cordiali saluti.`;
    }

    // 🍷 Smart Experience (E-Menu e Maître AI)
    if (item.portal_type === 'experience') {
        return `Buongiorno ${name}. Ho digitalizzato la carta del vostro locale nella nuova Smart Experience Page con Maître AI, calcolo distanza e prenotazioni tavolo dirette su WhatsApp:\n\n👉 ${link}\n\nDategli un'occhiata da smartphone, spero sia di vostro gradimento!`;
    }

    // Template Standard
    return `Buongiorno ${name}. Ho completato l'elaborazione riservata per la Sua attività: *"${title}"*.\n\nPuò visionare l'anteprima protetta direttamente qui:\n👉 ${link}\n\nResto a completa disposizione per qualsiasi chiarimento.`;
}

// 📧 EMAIL COPY: FORMALI ("DEL LEI"), STRUTTURATE E CON OGGETTI ISTITUZIONALI
function generateEmailCopy(item) {
    const name = item.client_name || 'Gentile Professionista';
    const title = item.title || 'la Sua attività';
    const link = resolveDemoLink(item);

    let text = "";

    // 🌐 SiteEngine Pro (Sito Web Professionale d'Autore)
    if (item.portal_type === 'html' || item.portal_type === 'siteengine') {
        text = `OGGETTO: Proposta riservata per la presenza online dello studio - ${name}\n\nGentile ${name},\n\nLe scrivo da RM Studio (Ferrara / Rovigo): affianchiamo professionisti e studi del territorio nello sviluppo di portali web d'autore progettati sulle neuroscienze cognitive, con l'obiettivo di valorizzare la reputazione dello studio e facilitare il contatto diretto con i pazienti e i clienti.\n\nAnalizzando la presenza online del Suo studio, abbiamo elaborato una bozza dimostrativa ad alte prestazioni, consultabile a questo indirizzo riservato:\n👉 ${link}\n\nA differenza dei tradizionali siti web realizzati su WordPress (spesso lenti, vulnerabili e bisognosi di continua manutenzione), la nostra architettura monolitica offre vantaggi concreti immediati:\n\n- Velocità estrema di caricamento (0.3 secondi reali, Core Web Vitals 99/100 certificati da Google);\n- Impaginazione studiata per azzerare l'attrito cognitivo e guidare il visitatore verso il contatto diretto su WhatsApp o via telefono;\n- Dati strutturati integrati per posizionare lo studio nelle ricerche locali di Google e Google Maps;\n- Blog privato aggiornabile in totale mobilità dallo smartphone senza password complesse da ricordare;\n- Nessun abbonamento mensile obbligatorio: licenza una tantum con dominio esclusivo, certificato SSL e manutenzione inclusi per il primo anno.\n\nPuò visionare liberamente l'anteprima anche dal Suo smartphone. Se l'impostazione rispecchia l'identità del Suo studio, possiamo collegarla in poche ore al Suo dominio personale definitivo.\n\nResto a Sua completa disposizione per qualsiasi confronto.\n\nUn cordiale saluto,\nRiccardo Modena\nRM Studio • Sviluppo Software B2B\nTel / WhatsApp: ${MY_PHONE_DISPLAY}`;
    }
    // 🍽️ Locanda Digitale
    else if (item.portal_type === 'locanda') {
        text = `OGGETTO: Proposta operativa per la carta e la clientela di ${name}\n\nGentile Direzione di ${name},\n\nAbbiamo elaborato una dimostrazione interattiva su misura per il vostro locale, accessibile direttamente a questo link riservato:\n👉 ${link}\n\nLocanda Digitale non è un semplice PDF: trasforma i vostri piatti forti in video 3D ad alta fluidità (60 FPS) visibili direttamente dallo smartphone dei clienti al tavolo, velocizza le comande su WhatsApp e integra il sistema automatizzato che fidelizza la clientela con il Bancomat dei Compleanni a -10 giorni, tutelando inoltre la reputazione del locale su Google Maps.\n\nRestiamo a completa disposizione per qualsiasi prova dal vivo o personalizzazione.\n\nUn cordiale saluto,\nRiccardo Modena\nRM Studio • Tecnologie per la Ristorazione\nTel / WhatsApp: ${MY_PHONE_DISPLAY}`;
    }
    // 🏎️ DriveMotion RADAR
    else if (item.portal_type === 'radar') {
        text = `OGGETTO: Monitoraggio opportunità auto da privati per ${name}\n\nGentile Titolare di ${name},\n\nLe scrivo da RM Studio (Ferrara/Rovigo): supportiamo i commercianti d'auto nell'acquisizione delle migliori vetture usate da privati prima che finiscano nelle aste o presso altri saloni.\n\nAbbiamo configurato per voi la dashboard di **DriveMotion RADAR**:\n👉 ${link}\n\nIl motore scansiona Subito.it, Facebook Marketplace e AutoScout24 h24 nella vostra provincia, perizia il margine netto reale con AI escludendo difetti occulti e vi inoltra le opportunità in tempo reale su Telegram ed Email con contatto WhatsApp diretto al privato.\n\nNon applichiamo alcuna commissione sulle auto acquistate: il servizio opera a canone mensile senza vincoli.\n\nResto a disposizione per attivarvi una prova gratuita sulla vostra zona.\n\nUn cordiale saluto,\nRiccardo Modena\nRM Studio • B2B Automotive\nTel / WhatsApp: ${MY_PHONE_DISPLAY}`;
    }
    // 🏛️ Forma & Materia
    else if (item.portal_type === 'forma_materia') {
        text = `OGGETTO: Ambiente di lavoro per rendering neurale 4K - Studio ${name}\n\nGentile ${name},\n\nAbbiamo attivato l'ambiente di lavoro dedicato per "${title}" su Forma & Materia.\n\nPuò accedere direttamente senza installare alcun software dal link riservato:\n👉 ${link}\n\nIl motore neurale consente di caricare schizzi a matita, planimetrie o wireframe CAD e ottenere render fotorealistici in 4K in 20 secondi, preservando l'esatta geometria e interpretando automaticamente le annotazioni e le frecce a penna scritte sul foglio.\n\nRestiamo a Sua disposizione per qualsiasi supporto o prova personalizzata.\n\nUn cordiale saluto,\nRiccardo Modena\nRM Studio • Rendering Neurale\nTel / WhatsApp: ${MY_PHONE_DISPLAY}`;
    }
    // 📡 AURA Proximity
    else if (item.portal_type === 'aura') {
        text = `OGGETTO: Configurazione stanza radar di sicurezza per ${name}\n\nGentile ${name},\n\nAbbiamo attivato la sessione radar mesh per "${title}".\n\nPuò accedere direttamente senza installare alcuna applicazione dal link dedicato:\n👉 ${link}\n\nIl sistema include Co-Pilota Vocale HD in vivavoce, bussola 3D, chat mesh P2P residente in RAM e rilevamento automatico impatti/Man-Down a norma D.Lgs. 81/08 per la sicurezza sul lavoro.\n\nRestiamo a Sua disposizione per qualsiasi supporto.\n\nUn cordiale saluto,\nRiccardo Modena\nRM Studio • Sistemi di Sicurezza & Prossimità\nTel / WhatsApp: ${MY_PHONE_DISPLAY}`;
    }
    // 🕊️ ETERNIA
    else if (item.portal_type === 'eternia') {
        text = `OGGETTO: Soluzioni digitali d'autore per le famiglie - ${name}\n\nGentile Direzione di ${name},\n\nLe scrivo da RM Studio: abbiamo attivato l'ambiente riservato white-label per la vostra impresa su **ETERNIA**:\n👉 ${link}\n\nETERNIA trasforma i tradizionali ricordini cartacei in portali memoriali digitali interattivi con QR Code vettoriale pronto per la tipografia, biografo AI con storia di vita in 3 capitoli e libro dei ricordi digitale per i familiari, con la firma esclusiva della vostra agenzia nel footer.\n\nNon richiede canoni fissi obbligatori: opera con pacchetti prepagati a consumo.\n\nRestiamo a vostra completa disposizione per una dimostrazione del pannello agenzia.\n\nUn cordiale saluto,\nRiccardo Modena\nRM Studio • Soluzioni Digitali d'Autore\nTel / WhatsApp: ${MY_PHONE_DISPLAY}`;
    }
    // 💍 LOVE
    else if (item.portal_type === 'love') {
        text = `OGGETTO: Suite partecipazioni digitali interattive per ${name}\n\nGentile ${name},\n\nLe scrivo da RM Studio: abbiamo attivato il vostro studio B2B riservato su **LOVE**:\n👉 ${link}\n\nLa suite permette alle agenzie di creare partecipazioni digitali con apertura 3D della busta in ceralacca, modulo RSVP con tabella intolleranze alimentari scaricabile per il catering, invio WhatsApp 1-tap agli invitati e Maxischermo interattivo per la sala ricevimenti con giochi e photowall live.\n\nResto volentieri a disposizione per mostrarvi le funzionalità dedicate ai Wedding Planner.\n\nUn cordiale saluto,\nRiccardo Modena\nRM Studio • Piattaforme Digitali\nTel / WhatsApp: ${MY_PHONE_DISPLAY}`;
    }
    // 🤖 NexusAI
    else if (item.portal_type === 'nexus') {
        text = `OGGETTO: Simulazione assistente virtuale per il sito web di ${name}\n\nGentile Direzione di ${name},\n\nLe scrivo da RM Studio (Ferrara/Rovigo): sviluppiamo tecnologie per convertire i visitatori passivi dei siti web in contatti commerciali qualificati.\n\nVisitando il vostro portale abbiamo notato una presenza di qualità, ma oggi oltre il 95% degli utenti che navigano su un sito vetrina tende ad abbandonare la pagina senza richiedere informazioni o lasciare un recapito.\n\nPer mostrarvi la soluzione, abbiamo configurato per voi una simulazione interattiva tramite tecnologia Shadow-Proxy direttamente sul vostro sito web, accessibile qui:\n👉 ${link}\n\nNexusAI agisce come un venditore e receptionist virtuale H24:\n- Accoglie proattivamente i visitatori con tono caloroso e professionale;\n- Risponde alle domande frequenti su servizi, orari e prezzi in meno di 2 secondi;\n- Raccoglie nome, cellulare ed email del potenziale cliente e ve li notifica all'istante;\n- Si installa in 2 minuti incollando una singola riga di codice HTML.\n\nResto a vostra disposizione per qualsiasi personalizzazione.\n\nUn cordiale saluto,\nRiccardo Modena\nRM Studio • Sviluppo Tecnologie B2B\nTel / WhatsApp: ${MY_PHONE_DISPLAY}`;
    }
    // 🏨 Concierge24
    else if (item.portal_type === 'concierge') {
        text = `OGGETTO: Informazione operativa per il ricevimento notturno - ${name}\n\nGentile Direzione di ${name},\n\nLe scrivo direttamente dal territorio (RM Studio, software house a Ferrara e Rovigo) conoscendo bene la complessità per le strutture ricettive nel garantire una copertura costante del front-desk, in particolare durante la fascia notturna (23:00–07:00), i weekend e i periodi di forte afflusso.\n\nPer sollevare il personale ed evitare che chiamate o richieste di ospiti internazionali restino senza risposta, abbiamo sviluppato **Concierge24**: un assistente vocale AI ("Giulia") pensato specificamente per l'ospitalità alberghiera:\n\n- **Risposta telefonica istantanea H24:** parla nella lingua madre dell'ospite (inglese, tedesco, francese, spagnolo, italiano) con dizione e pause naturali;\n- **Gestione completa dei dubbi ricorrenti:** istruzioni precise su check-in tardivo, orari colazione, parcheggio, deposito bagagli e regole della struttura;\n- **Concierge turistico interattivo:** consiglia ristoranti tipici e luoghi d'interesse entro 35 km, inviando mappe e percorsi stradali sullo smartphone dell'ospite durante la chiamata;\n- **Report e controllo:** l'albergo riceve via email trascrizione, riassunto e audio della conversazione solo se vi sono reali necessità operative in camera.\n\nNon richiediamo alcun canone fisso mensile vincolante: opera a consumo con 15 minuti di prova gratuiti.\n\nPuò avviare una chiamata vocale di prova con Giulia cliccando qui:\n👉 ${link}\n*(Tocchi l'icona del microfono per iniziare a parlare con l'assistente)*\n\nResto a vostra completa disposizione.\n\nUn cordiale saluto,\nRiccardo Modena\nRM Studio • B2B Hospitality\nTel / WhatsApp: ${MY_PHONE_DISPLAY}`;
    }
    // 🦷 Dentis AI
    else if (item.portal_type === 'dentis') {
        text = `OGGETTO: Verifica reperibilità telefonica e prime visite per ${name}\n\nGentile Direzione di ${name},\n\nLe scrivo da Ferrara/Rovigo (RM Studio, software house specializzata in automazioni per il settore sanitario e professionale).\n\nSappiamo bene che durante le visite alla poltrona, la pausa pranzo o quando la segreteria è impegnata con un paziente al banco, ogni telefonata che trova linea occupata o senza risposta rappresenta una prima visita o un'urgenza che rischia di rivolgersi a un altro studio.\n\nPer risolvere questo collo di bottiglia abbiamo sviluppato **Dentis**, una receptionist telefonica AI ("Serena") addestrata per l'odontoiatria:\n\n- **Risposta immediata al 2° squillo H24:** accoglie i pazienti con tono caloroso ed empatico anche la sera, nei weekend o durante le chiusure;\n- **Triage delle urgenze odontoiatriche:** riconosce il dolore acuto canalizzandolo negli slot prioritari;\n- **Sincronizzazione agenda e no-show azzerati:** fissa le prime visite su Google Calendar e invia promemoria automatici via WhatsApp ai pazienti il giorno prima dell'appuntamento (riducendo le disdette dell'80%).\n\nLa scheda tecnica dell'assistente con le regole del vostro studio è consultabile qui:\n👉 ${link}\n*(Numero di prova sandbox nazionale abilitato: +39 0425 167 5950)*\n\nResto a vostra disposizione per qualsiasi verifica o configurazione personalizzata.\n\nUn cordiale saluto,\nRiccardo Modena\nRM Studio • Tecnologie Mediche B2B\nTel / WhatsApp: ${MY_PHONE_DISPLAY}`;
    }
    // ⚖️ Lexis AI
    else if (item.portal_type === 'lexis') {
        text = `OGGETTO: Reperibilità qualificata e filtro prime consulenze per ${name}\n\nGentile Avvocato / Direzione di ${name},\n\nLe scrivo dallo studio software RM Studio (Ferrara/Rovigo). Conosciamo bene quanto gli impegni in udienza e le riunioni rendano complessa la costante reperibilità telefonica dello studio legale, con il rischio che nuove richieste di patrocinio o consulenze rimangano senza riscontro.\n\nAbbiamo sviluppato **Lexis AI** ("Chiara"), una segreteria vocale avanzata calibrata sulle esigenze dell'avvocatura:\n\n- **Registro rigorosamente formale ("del Lei"):** tutela dell'immagine e del prestigio dello studio con massima riservatezza (GDPR);\n- **Filtro delle richieste e prime consulenze:** raccoglie i dettagli del caso, verifica le disponibilità e notifica immediatamente il professionista via email con trascrizione e sintesi;\n- **Attivazione senza modifiche di linea:** funziona tramite una semplice deviazione di chiamata attiva solo su occupato o fuori orario.\n\nPuò verificare il funzionamento ed effettuare una prova dal link. Cordiali saluti.`;
    }
    // 🍷 Smart Experience
    else if (item.portal_type === 'experience') {
        text = `OGGETTO: Digitalizzazione esperienziale della carta per ${name}\n\nGentile ${name},\n\nAbbiamo digitalizzato il menu e la storia del vostro locale nella nuova Smart Experience Page interattiva, accessibile a questo link riservato:\n👉 ${link}\n\nSostituisce i vecchi PDF con un'esperienza dinamica: include il Maître Virtuale AI che consiglia i piatti e gli abbinamenti con i vini della vostra carta, il calcolo della distanza chilometrica in tempo reale e i pulsanti per prenotare il tavolo direttamente su WhatsApp.\n\nRestiamo a disposizione per qualsiasi personalizzazione.\n\nUn cordiale saluto,\nRiccardo Modena\nRM Studio • Hospitality & Taste Engine\nTel / WhatsApp: ${MY_PHONE_DISPLAY}`;
    }
    // Default
    else {
        text = `OGGETTO: Proposta riservata e anteprima per ${title}\n\nGentile ${name},\n\nAbbiamo completato l'elaborazione del progetto "${title}".\n\nPuò accedere all'anteprima protetta da watermark a questo indirizzo:\n👉 ${link}\n\nRestiamo a Sua completa disposizione per qualsiasi modifica o chiarimento.\n\nUn cordiale saluto,\nRiccardo Modena\nRM Studio • Software per l'Automazione B2B\nTel / WhatsApp: ${MY_PHONE_DISPLAY}`;
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
        
        // 🔍 CHECK PREVENTIVO DI ESISTENZA WHATSAPP
        waBtn.onclick = async (e) => {
            e.preventDefault();
            waBtn.innerHTML = `<i class="fa-solid fa-spinner animate-spin"></i> Verifica...`;
            
            try {
                const checkRes = await fetch(`https://n8n.rmstudio.app/webhook/check-whatsapp?phone=${phone}`);
                const checkData = await checkRes.json();
                
                if (checkData.exists === false) {
                    alert(`⚠️ Il numero ${phone} NON risulta registrato su WhatsApp (potrebbe essere un numero fisso).\n\nTi consigliamo di procedere con l'invio tramite Email (Resend).`);
                    openMessageModal(item.id, 'mail');
                    return;
                }
            } catch (err) {
                console.warn("Check WhatsApp offline, procedo con apertura:", err);
            } finally {
                waBtn.innerHTML = `<i class="fa-brands fa-whatsapp text-sm"></i> Apri WhatsApp`;
            }

            const waUrl = phone 
                ? `https://wa.me/${phone}?text=${encodeURIComponent(waText)}`
                : `https://wa.me/?text=${encodeURIComponent(waText)}`;
            
            updateSupabaseField(item.id, 'is_whatsapp_sent', true);
            window.open(waUrl, '_blank');
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
