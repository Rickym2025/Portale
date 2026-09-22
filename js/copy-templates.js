// GENERATORE NEUROMARKETING & CENTRO SPEDIZIONE • RM STUDIO

window.activeDispatchProjectId = null;

// CLAUSOLA ANTI-SPAM & OPT-OUT GDPR UFFICIALE
const GDPR_OPT_OUT_FOOTER = `\n\n---\nComunicazione B2B inviata ai sensi del Regolamento UE 2016/679 (GDPR). Se non desidera ricevere ulteriori aggiornamenti o informative, risponda semplicemente "CANCELLA" a questo messaggio e il Suo recapito verrà rimosso immediatamente.\nRM Studio • Via Roma, Ariano nel Polesine (RO) • riccardo@rmstudio.app`;

function generateWhatsAppCopy(item) {
    const name = item.client_name || 'Titolare';
    const title = item.title || 'Progetto';
    const link = item.portal_type === 'vision' 
        ? `${window.location.origin}/vision-preview?token=${item.token}`
        : (item.portal_type === 'forma_materia' 
            ? (item.content_url || `https://formamateria.rmstudio.app/studio`)
            : (item.content_url || `https://portale.rmstudio.app/view?id=${item.id}`));

    // 🏨 Concierge24 (Hotel & B&B)
    if (item.portal_type === 'concierge') {
        return `Ciao ${name}! 👋\n\nHo visto la vostra struttura ricettiva e vi ho preparato una demo interattiva di *Concierge24*:\n👉 ${link}\n\nÈ l'assistente vocale e multimediale AI ("Giulia") che risponde in lingua nativa agli ospiti H24 (italiano, inglese, tedesco, ecc.), invia sullo smartphone orari di check-in, parcheggio e regole della casa, e consiglia i migliori ristoranti e attrazioni locali entro 35 km con mappe interattive in tempo reale! 🏨✨\n\nDateci un'occhiata e fatemi sapere cosa ne pensate!`;
    }

    // 🦷 Dentis AI (Studi Dentistici)
    if (item.portal_type === 'dentis') {
        return `Ciao ${name}! 👋\n\nHo visto la vostra ricerca per la segreteria e, per non rischiare di perdere visite o urgenze mentre selezionate e formate la nuova figura, vi ho pre-configurato la receptionist AI per lo studio:\n👉 ${link}\n\nSi chiama Serena: risponde in voce naturale al 2° squillo H24, gestisce le urgenze, risponde alle domande su orari e prestazioni e sincronizza gli appuntamenti direttamente in agenda con promemoria automatici via WhatsApp.\n\nPotete provarla dal vivo senza impegno. Fatemi sapere cosa ne pensate! 🦷📞`;
    }

    // ⚖️ Lexis AI (Studi Legali & Avvocati)
    if (item.portal_type === 'lexis') {
        return `Gentile ${name}, buongiorno.\n\nAbbiamo riservato per il Suo studio la dimostrazione operativa della segreteria telefonica vocale AI per professionisti legali:\n👉 ${link}\n\nSi chiama Chiara: adotta un registro rigorosamente formale ("del Lei"), risponde fuori orario e su linea occupata per raccogliere i dettagli delle nuove richieste di consulenza, notificando immediatamente lo studio via email e WhatsApp con trascrizione e sintesi.\n\nResto a disposizione per una prova diretta. Cordiali saluti.`;
    }

    // 🍽️ Locanda Digitale
    if (item.portal_type === 'locanda') {
        return `Ciao ${name}! 👋\n\nStavo ammirando le specialità del vostro locale e vi ho preparato questa demo interattiva del vostro *Living 3D Menu*:\n👉 ${link}\n\nNon è il solito PDF statico: i piatti forti si animano in video 3D a 60 FPS direttamente al tavolo, i clienti inviano le comande su WhatsApp e include la tecnologia automatica che estrae i contatti dei clienti e riempie i tavoli con il *Bancomat dei Compleanni*! 🎂🍷\n\nSi apre all'istante da qualsiasi smartphone senza scaricare app. Dagli un'occhiata e fammi sapere cosa ne pensi! 😊`;
    }

    // 🏛️ Forma & Materia
    if (item.portal_type === 'forma_materia') {
        return `Ciao ${name}! 👋\n\nHo preparato questo spazio di lavoro riservato per il tuo studio su *Forma & Materia*:\n👉 ${link}\n\nÈ una piattaforma neurale che trasforma qualsiasi schizzo a mano libera o disegno CAD in render fotorealistici 4K in 20 secondi. La cosa più comoda è che legge in automatico anche le frecce e le note a penna che scrivi sul foglio!\n\nÈ 100% web, puoi provarlo anche da tablet o smartphone. Fammi sapere cosa ne pensi! 🏛️✨`;
    }

    // 📡 AURA Proximity
    if (item.portal_type === 'aura') {
        return `Ciao ${name}! 👋\n\nHo configurato e attivato la vostra stanza su *AURA Proximity*:\n👉 ${link}\n\nÈ 100% web: basta aprire il link dallo smartphone per essere subito collegati con radar vettoriale, Co-Pilota vocale in vivavoce e rilevatore automatico cadute/urti.\n\nFammi sapere se riuscite a fare una prova sul campo! 📡`;
    }

    // 🍷 Smart Experience Page
    if (item.portal_type === 'experience') {
        return `Ciao ${name}! 👋\n\nHo digitalizzato il menu e la storia del vostro locale nella nuova *Smart Experience Page* con Maître AI e abbinamento vini:\n👉 ${link}\n\nSe vi piace potete usarla per i vostri clienti e per le prenotazioni WhatsApp! Fatemi sapere cosa ne pensate 😊`;
    }

    // Template Standard
    return `Ciao ${name}! 👋\n\nHo appena completato la lavorazione speciale per te: *"${title}"*.\n\nPuoi guardare l'anteprima riservata direttamente qui:\n👉 ${link}\n\nFammi sapere cosa ne pensi! 😊`;
}

function generateEmailCopy(item) {
    const name = item.client_name || 'Gentile Titolare';
    const title = item.title || 'la vostra attività';
    const link = item.portal_type === 'vision' 
        ? `${window.location.origin}/vision-preview?token=${item.token}`
        : (item.portal_type === 'forma_materia' 
            ? (item.content_url || `https://formamateria.rmstudio.app/studio`)
            : (item.content_url || `https://portale.rmstudio.app/view?id=${item.id}`));

    let text = "";

    // 🏨 Concierge24
    if (item.portal_type === 'concierge') {
        text = `OGGETTO: 🏨 Centralino notturno e concierge multimediale multilingua H24 per ${title}\n\nGentile ${name},\n\nAbbiamo allestito una demo personalizzata di Concierge24 per la vostra struttura, accessibile a questo link riservato:\n${link}\n\nConcierge24 ("Giulia") solleva il personale della reception parlando in tempo reale con i turisti nella loro lingua madre:\n- Assistenza vocale H24 su check-in tardivo, parcheggio e regole della struttura;\n- Suggerimenti turistici con invio immediato di mappe GPS e percorsi interattivi sul telefono dell'ospite;\n- Nessun canone mensile obbligatorio: si attiva a consumo con 15 minuti di prova gratuiti.\n\nRestiamo a disposizione per qualsiasi prova dal vivo.\n\nUn cordiale saluto,\nRiccardo Modena | RM Studio`;
    }
    // 🦷 Dentis AI
    else if (item.portal_type === 'dentis') {
        text = `OGGETTO: 🦷 Gestione chiamate e prime visite per ${title} (durante la selezione del personale)\n\nGentile ${name},\n\nAbbiamo configurato per il vostro studio una dimostrazione attiva della receptionist telefonica AI Dentis ("Serena"), consultabile qui:\n${link}\n\nMentre siete alla ricerca della nuova figura di front office, Dentis garantisce che nessuna chiamata e nessuna urgenza vadano perse durante le pause pranzo, la sera o quando la linea è occupata:\n- Risposta vocale immediata e naturale H24 entro il 2° squillo;\n- Triage urgenze e fissaggio prime visite sincrono su Google Calendar;\n- Promemoria WhatsApp automatici ai pazienti per azzerare i buchi in poltrona.\n\nRestiamo a disposizione per qualsiasi test o configurazione personalizzata.\n\nUn cordiale saluto,\nRiccardo Modena | RM Studio`;
    }
    // ⚖️ Lexis AI
    else if (item.portal_type === 'lexis') {
        text = `OGGETTO: ⚖️ Segreteria telefonica vocale H24 e accoglienza prime consulenze - ${title}\n\nGentile ${name},\n\nAbbiamo predisposto una linea dimostrativa dedicata a "${title}" per la segreteria telefonica con intelligenza artificiale Lexis AI ("Chiara"), accessibile qui:\n${link}\n\nLexis AI è progettata su misura per gli studi legali:\n- Registro formale ("del Lei") e rispetto del segreto professionale;\n- Reperibilità attiva fuori orario (notti, weekend, udienze) e su linea occupata;\n- Notifica immediata di ogni contatto qualificato con riassunto del caso e registrazione audio.\n\nRestiamo a Sua completa disposizione per qualsiasi approfondimento.\n\nCordiali saluti,\nRiccardo Modena | RM Studio`;
    }
    // 🍽️ Locanda Digitale
    else if (item.portal_type === 'locanda') {
        text = `OGGETTO: 🍽️ Anteprima Living 3D Menu & Motore Clienti H24 per ${title}\n\nGentile ${name},\n\nAbbiamo elaborato una dimostrazione interattiva su misura per il vostro locale, accessibile direttamente a questo link riservato:\n${link}\n\nLocanda Digitale non è un semplice menu in PDF: trasforma le vostre portate forti in video 3D ad alta fluidità (60 FPS) al tavolo, velocizza le comande su WhatsApp e integra il sistema automatizzato che estrae i contatti dei clienti e riempie i tavoli con promozioni automatiche di compleanno a -10 giorni, proteggendo inoltre le recensioni del locale su Google Maps.\n\nRestiamo a completa disposizione per qualsiasi prova dal vivo o personalizzazione grafica.\n\nUn cordiale saluto,\nRiccardo Modena | RM Studio`;
    }
    // 🏛️ Forma & Materia
    else if (item.portal_type === 'forma_materia') {
        text = `OGGETTO: 🏛️ Studio di Rendering Neurale Attivo - ${title}\n\nGentile ${name},\n\nAbbiamo attivato l'ambiente di lavoro dedicato per "${title}" su Forma & Materia.\n\nPuoi accedere direttamente senza installare alcun software dal link riservato:\n${link}\n\nIl motore consente di caricare schizzi a matita, planimetrie o wireframe CAD e ottenere render fotorealistici in 4K ad alta fedeltà, preservando l'esatta geometria e interpretando automaticamente le annotazioni a penna.\n\nRestiamo a tua disposizione per qualsiasi supporto o prova personalizzata.\n\nUn cordiale saluto,\nRiccardo Modena | RM Studio`;
    }
    // Standard
    else {
        text = `OGGETTO: 🎁 La tua anteprima riservata è pronta - ${title}\n\nGentile ${name},\n\nAbbiamo completato l'elaborazione del tuo progetto "${title}".\n\nPuoi accedere all'anteprima protetta da watermark a questo indirizzo:\n${link}\n\nSiamo a tua disposizione per qualsiasi modifica o chiarimento.\n\nUn cordiale saluto,\nRiccardo Modena | RM Studio`;
    }

    return text + GDPR_OPT_OUT_FOOTER;
}

// 🎯 APERTURA MODALE DISPATCHER (WHATSAPP O RESEND)
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
        // MODALITÀ SPEDIZIONE EMAIL RESEND
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
        // MODALITÀ WHATSAPP
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

        // Aggiorna lo stato sul database del portale
        await updateSupabaseField(item.id, 'first_email_sent', true);

        alert(`✨ Proposta spedita con successo via Resend a: ${toEmail}`);
        closeCopyModal();
        loadMasterData();

    } catch (err) {
        alert("⚠️ Errore invio con Resend: " + err.message + "\nAssicurati che il webhook 'invia-email-proposta' sia attivo su n8n.");
    } finally {
        btn.disabled = false;
        btn.innerHTML = originalText;
    }
}
