// GENERATORE NEUROMARKETING & CENTRO SPEDIZIONE • RM STUDIO

window.activeDispatchProjectId = null;

// RECAPITO UFFICIALE RICCARDO MODENA
const MY_PHONE_DISPLAY = "+39 349 525 8418";

// CLAUSOLA ANTI-SPAM & OPT-OUT GDPR UFFICIALE
const GDPR_OPT_OUT_FOOTER = `\n\n---\nComunicazione informativa B2B inviata ai sensi del Regolamento UE 2016/679 (GDPR). Se non desidera ricevere ulteriori aggiornamenti o informative su questa tecnologia, risponda semplicemente "CANCELLA" a questo messaggio e il Suo recapito verrà rimosso immediatamente dai nostri archivi.\nRM Studio • Ariano nel Polesine (RO) / Ferrara • Tel. ${MY_PHONE_DISPLAY} • riccardo@rmstudio.app`;

// 🔗 RISOLUZIONE LINK DEMO REALE & TRACCIATO
function resolveDemoLink(item) {
    // 1. Se è NexusAI: genera il link Shadow-Proxy sul sito del cliente
    if (item.portal_type === 'nexus') {
        if (item.content_url && item.content_url.includes('demo.rmstudio.app')) {
            return item.content_url;
        }
        if (item.content_url && item.content_url.startsWith('http') && !item.content_url.includes('view')) {
            return `https://demo.rmstudio.app/?site=${encodeURIComponent(item.content_url)}`;
        }
        return `https://demo.rmstudio.app`;
    }

    // 2. Se è Concierge24: link diretto alla chiamata vocale di Giulia (chat.html)
    if (item.portal_type === 'concierge') {
        if (item.content_url && item.content_url.includes('chat?struttura_id=')) {
            return item.content_url;
        }
        const slug = (item.client_name || 'hotel_demo').toLowerCase()
            .replace(/[^a-z0-9]/g, '_')
            .replace(/_+/g, '_')
            .replace(/^_|_$/g, '');
        return `https://concierge24.rmstudio.app/chat?struttura_id=${slug}`;
    }

    // 3. Se è Dentis o Lexis con URL applicativo config su Hetzner
    if ((item.portal_type === 'dentis' || item.portal_type === 'lexis') && item.content_url && item.content_url.includes('dentis-app.rmstudio.app')) {
        return item.content_url;
    }

    // 4. Se l'URL nel record punta già a un sottodominio rmstudio.app valido
    if (item.content_url && item.content_url.includes('rmstudio.app') && !item.content_url.includes('view') && !item.content_url.includes('google')) {
        return item.content_url;
    }

    // 5. Link tracciato ufficiale del Portale
    if (item.id) {
        return `https://portale.rmstudio.app/view?id=${item.id}`;
    }

    return 'https://rmstudio.app';
}

function generateWhatsAppCopy(item) {
    const name = item.client_name || 'Titolare';
    const link = resolveDemoLink(item);

    // 🤖 NexusAI (Shadow-Proxy per qualsiasi sito web)
    if (item.portal_type === 'nexus') {
        return `Ciao ${name}! 👋\n\nStavo visitando il vostro sito web: è molto curato, ma statisticamente oltre il 95% dei visitatori esce senza lasciare un contatto.\n\nVi ho preparato una demo live del vostro sito con a bordo il venditore AI di *NexusAI*:\n👉 ${link}\n\nÈ uno Shadow-Proxy: non abbiamo modificato una sola riga del vostro codice. Cliccando dal telefono vedrete il vostro sito con l'assistente virtuale già attivo che accoglie i visitatori, risponde alle domande e raccoglie contatti qualificati prima che abbandonino la pagina!\n\nDategli un'occhiata e fatemi sapere cosa ne pensate! 🚀`;
    }

    // 🏨 Concierge24
    if (item.portal_type === 'concierge') {
        return `Buongiorno ${name}! 👋\n\nVi contatto direttamente dal territorio (RM Studio, Ferrara/Rovigo): supportiamo le strutture ricettive nell'azzerare le chiamate perse e alleggerire il carico del ricevimento, soprattutto sui turni notturni (23:00–07:00) e festivi.\n\nAbbiamo sviluppato *Concierge24*, un assistente vocale AI ("Giulia") che risponde al centralino H24 nella lingua nativa dell'ospite (EN, DE, FR, IT), gestisce check-in notturni, regole della casa, colazione e invia mappe interattive dei ristoranti direttamente sullo smartphone del turista.\n\nPotete avviare una chiamata vocale di prova con Giulia cliccando qui:\n👉 ${link}\n\nFunziona a consumo, senza canoni fissi obbligatori. Fatemi sapere se può esservi utile per le notti!`;
    }

    // 🦷 Dentis AI
    if (item.portal_type === 'dentis') {
        return `Buongiorno ${name}! 👋\n\nVi scrivo da Ferrara/Rovigo (RM Studio): supportiamo gli studi medici e odontoiatrici nell'accoglienza telefonica e nella gestione delle prime visite.\n\nPer non rischiare di perdere chiamate e urgenze durante le pause pranzo, fuori orario o mentre la linea è occupata, abbiamo sviluppato *Dentis*, una receptionist AI ("Serena") che risponde in voce naturale al 2° squillo H24, gestisce il triage delle urgenze e sincronizza gli appuntamenti con promemoria WhatsApp.\n\nPotete provarla dal vivo senza impegno qui:\n👉 ${link}\n\nResto a disposizione per qualsiasi prova!`;
    }

    // ⚖️ Lexis AI
    if (item.portal_type === 'lexis') {
        return `Gentile ${name}, buongiorno.\n\nLe scrivo dallo studio software RM Studio (Ferrara/Rovigo): affianchiamo gli studi legali nell'accoglienza telefonica qualificata quando i professionisti sono impegnati in udienza o riunione.\n\nAbbiamo sviluppato *Lexis AI* ("Chiara"), una segreteria vocale che adotta un registro rigorosamente formale ("del Lei"), raccoglie le richieste di nuove consulenze fuori orario e notifica immediatamente lo studio con sintesi e trascrizione.\n\nPuò testare la linea qui:\n👉 ${link}\n\nResto a Sua disposizione. Cordiali saluti.`;
    }

    // Default WhatsApp
    return `Ciao ${name}! 👋\n\nTi contatto da RM Studio: ho preparato questa anteprima tecnologica per la vostra attività:\n👉 ${link}\n\nDagli un'occhiata e fammi sapere cosa ne pensi!`;
}

function generateEmailCopy(item) {
    const name = item.client_name || 'Gentile Direzione';
    const title = item.title || 'il vostro business';
    const link = resolveDemoLink(item);

    let text = "";

    // 🤖 NexusAI
    if (item.portal_type === 'nexus') {
        text = `OGGETTO: 🤖 Abbiamo attivato una demo del venditore AI sul vostro sito - ${name}\n\nGentile Direzione di ${name},\n\nLe scrivo da RM Studio (software house attiva a Ferrara e Rovigo): sviluppiamo tecnologie di intelligenza artificiale orientate alla conversione commerciale per le attività del nostro territorio.\n\nVisitando il vostro portale web abbiamo notato una presenza di qualità, ma oggi oltre il 95% degli utenti che navigano su un sito vetrina tende ad abbandonare la pagina senza intraprendere alcuna azione o richiedere informazioni, semplicemente per mancanza di un contatto tempestivo.\n\nPer mostrarvi concretamente come risolvere questo problema, abbiamo configurato per voi una simulazione interattiva tramite tecnologia Shadow-Proxy direttamente sul vostro sito web, accessibile da questo link:\n👉 ${link}\n\nNexusAI agisce come un venditore e receptionist virtuale H24:\n\n- **Accoglienza proattiva non invasiva:** intercetta l'utente al momento giusto con tono professionale, invitandolo all'interazione;\n- **Risposte istantanee su servizi, corsi e orari:** chiarisce dubbi e supera le obiezioni dei visitatori in meno di 2 secondi;\n- **Acquisizione autonoma di contatti:** raccoglie nome, cellulare ed email del potenziale cliente e li inoltra all'istante al vostro team commerciale prima che abbandoni il sito;\n- **Zero complicazioni tecniche:** la demo sopra funziona senza aver toccato il vostro server; per metterlo online definitivamente basta incollare una singola riga di codice HTML.\n\nI nostri piani operativi partono da 49€/mese senza alcun contratto vincolante a lungo termine.\n\nResto volentieri a vostra disposizione qualora desideraste personalizzare l'assistente o ricevere maggiori dettagli.\n\nUn cordiale saluto,\nRiccardo Modena\nRM Studio • Sviluppo Tecnologie B2B\nTel / WhatsApp: ${MY_PHONE_DISPLAY}`;
    }
    // 🏨 Concierge24
    else if (item.portal_type === 'concierge') {
        text = `OGGETTO: 🏨 Centralino notturno e assistenza multilingua H24 per ${name}\n\nGentile Direzione di ${name},\n\nLe scrivo direttamente dal territorio (RM Studio, software house attiva a Ferrara e Rovigo) conoscendo bene quanto sia oggi complesso per le strutture ricettive garantire una copertura costante e qualificata del front-desk, in particolare durante la fascia notturna (23:00–07:00), i weekend e i periodi di forte afflusso.\n\nPer sollevare il personale ed evitare che telefonate o richieste di ospiti internazionali restino senza risposta, abbiamo sviluppato **Concierge24**: un assistente vocale e multimediale basato su intelligenza artificiale ("Giulia") pensato specificamente per l'ospitalità alberghiera:\n\n- **Risposta telefonica istantanea H24:** parla in tempo reale nella lingua madre dell'ospite (inglese, tedesco, francese, spagnolo, italiano) con dizione e pause naturali;\n- **Gestione completa dei dubbi ricorrenti:** fornisce istruzioni precise su check-in tardivo, orari colazione, parcheggio, deposito bagagli e regole della struttura;\n- **Concierge turistico interattivo:** suggerisce ristoranti tipici e luoghi d'interesse del territorio entro 35 km, inviando mappe e percorsi stradali direttamente sullo schermo dello smartphone dell'ospite durante la chiamata;\n- **Controllo e trasparenza totale:** il responsabile dell'hotel riceve via email la trascrizione, il riassunto e la registrazione audio della conversazione solo se vi sono reali necessità operative o segnalazioni in camera.\n\nNon richiediamo alcun canone fisso mensile vincolante: il servizio opera a consumo con 15 minuti di prova gratuiti per consentirvi di testare la tecnologia dal vivo.\n\nPuò avviare una chiamata di prova vocale con Giulia direttamente da smartphone o PC da questo link dedicato:\n👉 ${link}\n*(Tocchi l'icona del microfono per iniziare a parlare con l'assistente)*\n\nQualora desideraste effettuare una breve simulazione di 5 minuti sul centralino o ricevere maggiori dettagli, resto volentieri a vostra completa disposizione.\n\nUn cordiale saluto,\nRiccardo Modena\nRM Studio • Sviluppo Tecnologie B2B\nTel / WhatsApp: ${MY_PHONE_DISPLAY}`;
    }
    // 🦷 Dentis AI
    else if (item.portal_type === 'dentis') {
        text = `OGGETTO: 🦷 Gestione chiamate fuori orario e prime visite per ${name}\n\nGentile Direzione di ${name},\n\nLe scrivo direttamente da Ferrara/Rovigo (RM Studio, software house specializzata in automazioni per il settore sanitario e professionale).\n\nSappiamo bene che durante le visite alla poltrona, la pausa pranzo o nei momenti in cui la segreteria è impegnata al banco con un paziente, ogni telefonata che trova linea occupata o senza risposta rappresenta una prima visita o un trattamento urgente che rischia di rivolgersi a un'altra struttura.\n\nPer risolvere questo collo di bottiglia abbiamo sviluppato **Dentis**, una receptionist telefonica AI ("Serena") addestrata specificamente sulle dinamiche odontoiatriche:\n\n- **Risposta immediata al 2° squillo H24:** accoglie i pazienti con tono caloroso ed empatico anche la sera, nei weekend o durante le chiusure;\n- **Triage delle urgenze odontoiatriche:** riconosce il dolore acuto o i traumi canalizzandoli negli slot prioritari;\n- **Sincronizzazione agenda e no-show azzerati:** fissa le prime visite su Google Calendar d'appoggio e invia promemoria automatici via WhatsApp ai pazienti il giorno prima dell'appuntamento (riducendo le disdette dell'80%).\n\nLa scheda tecnica dell'assistente con le regole del vostro studio è consultabile qui:\n👉 ${link}\n*(Numero di prova sandbox nazionale abilitato: +39 0425 167 5950)*\n\nResto a vostra disposizione per qualsiasi verifica o configurazione personalizzata.\n\nUn cordiale saluto,\nRiccardo Modena\nRM Studio • Tecnologie Mediche B2B\nTel / WhatsApp: ${MY_PHONE_DISPLAY}`;
    }
    // ⚖️ Lexis AI
    else if (item.portal_type === 'lexis') {
        text = `OGGETTO: ⚖️ Reperibilità telefonica qualificata H24 per ${name}\n\nGentile Avvocato / Direzione di ${name},\n\nLe scrivo dallo studio software RM Studio (Ferrara/Rovigo). Conosciamo bene quanto gli impegni in udienza, le trasferte e le riunioni con i clienti rendano complessa la costante reperibilità telefonica dello studio legale, con il rischio che nuove richieste di patrocinio o consulenze urgenti rimangano senza riscontro.\n\nAbbiamo sviluppato **Lexis AI** ("Chiara"), una segreteria telefonica vocale avanzata calibrata sulle esigenze dell'avvocatura:\n\n- **Registro rigorosamente formale ("del Lei"):** tutela dell'immagine e del prestigio dello studio con massima riservatezza (GDPR);\n- **Filtro delle richieste e prime consulenze:** raccoglie i dettagli del caso, verifica le disponibilità e notifica immediatamente il professionista via email con trascrizione e sintesi;\n- **Attivazione senza modifiche di linea:** funziona tramite una semplice deviazione di chiamata attiva solo su occupato o fuori orario.\n\nPuò verificare il funzionamento ed effettuare una prova dal vivo qui:\n👉 ${link}\n*(Numero di prova dedicato: +39 0425 167 5950)*\n\nResto a Sua completa disposizione per qualsiasi approfondimento.\n\nCordiali saluti,\nRiccardo Modena\nRM Studio • Sistemi Software per Professionisti\nTel / WhatsApp: ${MY_PHONE_DISPLAY}`;
    }
    // Default
    else {
        text = `OGGETTO: 💡 Proposta di innovazione digitale per ${name}\n\nGentile ${name},\n\nLe scrivo da RM Studio (Ferrara/Rovigo): sviluppiamo soluzioni software e intelligenze artificiali volte a ottimizzare il flusso di lavoro e la conversione delle attività del nostro territorio.\n\nAbbiamo predisposto una dimostrazione tecnica riservata alla vostra attività, consultabile qui:\n👉 ${link}\n\nRestiamo a disposizione per qualsiasi prova dal vivo o chiarimento.\n\nUn cordiale saluto,\nRiccardo Modena\nRM Studio • Sviluppo Tecnologie B2B\nTel / WhatsApp: ${MY_PHONE_DISPLAY}`;
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
