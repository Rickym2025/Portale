// js/view-ui.js - Logica di Interfaccia, Tracciamento, Switcher 3 Format & Stripe

const supabaseUrl = 'https://jhijfulhntlhcytbhcly.supabase.co'; 
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpoaWpmdWxobnRsaGN5dGJoY2x5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI3MzcxODcsImV4cCI6MjA5ODMxMzE4N30.z062NW4ApClll-XWHH2ufmcCleBRNHUUdKO6FiLa0TQ'; 
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

let videoData = null;
let currentSlideIdx = 0;
let imagesArray = [];
let currentActiveTemplate = null;
let isAdminViewer = false;

// 🔒 GENERATORE FILIGRANA IBRIDA (9% OPACITÀ - CHIARO & SCURO)
function generateWatermarks(containerId, count) {
    const layer = document.getElementById(containerId);
    if (layer) {
        layer.innerHTML = ""; 
        for (let i = 0; i < count; i++) {
            const item = document.createElement('div');
            item.className = "watermark-logo-item select-none";
            item.setAttribute('oncontextmenu', 'return false;');
            item.innerHTML = `
                <img src="https://raw.githubusercontent.com/Rickym2025/mrstudio/main/public/loghi/logo_rm.png" alt="RM Studio">
                <span class="watermark-label">Bozza Riservata • RM Studio</span>
            `;
            layer.appendChild(item);
        }
    }
}

// 🌌 CARICAMENTO DINAMICO SISTEMA ORBITALE DA GITHUB
async function loadOrbitalEcosystem() {
    try {
        const url = 'https://raw.githubusercontent.com/Rickym2025/mrstudio/main/public/orbit-template.html';
        const res = await fetch(url);
        if (!res.ok) throw new Error("Errore fetch GitHub");
        let html = await res.text();
        const container = document.getElementById('ecosystem-orbit-container');
        if (container) container.innerHTML = html;
    } catch (err) {
        console.warn("Impossibile caricare l'ecosistema orbitale dinamicamente:", err);
    }
}

// 🔄 SWITCHER TEMPLATE AL VOLO TRA I 3 FORMAT SETTORIALI
function switchTemplate(templateId) {
    if (!videoData || !videoData.content_url) return;
    currentActiveTemplate = templateId;
    const iframe = document.getElementById('fullscreen-iframe');
    const cleanUrl = window.resolveLiveDemoUrl(videoData).split('?')[0];

    iframe.src = `${cleanUrl}?template_id=${templateId}&_t=${Date.now()}`;

    const sectorGroup = window.detectSectorGroup(videoData);
    const trio = window.SECTOR_TRIO_TEMPLATES[sectorGroup] || window.SECTOR_TRIO_TEMPLATES.default;

    trio.forEach(t => {
        const btn = document.getElementById(`btn-trio-${t.id}`);
        if (btn) {
            btn.className = t.id === templateId
                ? "px-3 py-1.5 rounded-lg text-xs font-black bg-purple-600 text-white transition shadow-md cursor-pointer whitespace-nowrap"
                : "px-3 py-1.5 rounded-lg text-xs font-bold text-zinc-400 hover:text-white transition cursor-pointer whitespace-nowrap";
        }
    });
}

// 🍷 SELETTORE DUAL VISTA RISTORANTI (EXPERIENCE VS SITO NATIVO)
function switchPreviewMode(mode) {
    if (!videoData) return;
    const iframe = document.getElementById('fullscreen-iframe');
    const btnExp = document.getElementById('btn-view-experience');
    const btnWeb = document.getElementById('btn-view-website');
    const demoUrl = window.resolveLiveDemoUrl(videoData);

    if (mode === 'experience') {
        iframe.src = `${demoUrl}?_t=${Date.now()}`;
        if (btnExp) btnExp.className = "px-3 py-1.5 rounded-lg text-xs font-bold bg-purple-600 text-white transition whitespace-nowrap";
        if (btnWeb) btnWeb.className = "px-3 py-1.5 rounded-lg text-xs font-bold text-zinc-400 hover:text-white transition whitespace-nowrap";
    } else {
        const originalSite = videoData.client_phone || 'https://www.tenutacastelvenezze.it';
        iframe.src = `https://demo.rmstudio.app/?site=${encodeURIComponent(originalSite)}&bot_id=${videoData.client_email || 'nexus_bot'}`;
        if (btnWeb) btnWeb.className = "px-3 py-1.5 rounded-lg text-xs font-bold bg-purple-600 text-white transition whitespace-nowrap";
        if (btnExp) btnExp.className = "px-3 py-1.5 rounded-lg text-xs font-bold text-zinc-400 hover:text-white transition whitespace-nowrap";
    }
}

// 🎁 MODALE COSA COMPRENDE L'OFFERTA
function openOfferModal() {
    const modal = document.getElementById('offer-modal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}

function closeOfferModal() {
    const modal = document.getElementById('offer-modal');
    if (modal) {
        modal.classList.remove('flex');
        modal.classList.add('hidden');
    }
}

// 🚀 APERTURA SCHERMO INTERO: CREA FISICAMENTE I 3 PULSANTI SETTORIALI
function openFullscreenWebsite() {
    if (!videoData) return;
    const overlay = document.getElementById('fullscreen-iframe-overlay');
    const iframe = document.getElementById('fullscreen-iframe');
    
    const siteEngineSwitcher = document.getElementById('siteengine-template-switcher');
    const experienceSwitcher = document.getElementById('view-mode-selector');
    const contextBadge = document.getElementById('contextual-saas-badge');
    const contextIcon = document.getElementById('context-saas-icon');
    const contextLabel = document.getElementById('context-saas-label');

    const type = videoData.portal_type || 'html';
    const demoUrl = window.resolveLiveDemoUrl(videoData);

    if (siteEngineSwitcher) siteEngineSwitcher.classList.add('hidden');
    if (experienceSwitcher) experienceSwitcher.classList.add('hidden');
    if (contextBadge) contextBadge.classList.add('hidden');

    if (type === 'html' || type === 'siteengine') {
        if (siteEngineSwitcher) {
            siteEngineSwitcher.classList.remove('hidden');
            siteEngineSwitcher.classList.add('flex');
        }

        // 🎯 RILEVA IL SETTORE E GENERA I 3 PULSANTI PERTINENTI
        const sectorGroup = window.detectSectorGroup(videoData);
        const trio = window.SECTOR_TRIO_TEMPLATES[sectorGroup] || window.SECTOR_TRIO_TEMPLATES.default;
        const container = document.getElementById('sector-templates-container');

        if (container) {
            container.innerHTML = "";
            trio.forEach((t, idx) => {
                const btn = document.createElement('button');
                btn.id = `btn-trio-${t.id}`;
                btn.onclick = () => switchTemplate(t.id);
                btn.className = idx === 0 
                    ? "px-3 py-1.5 rounded-lg text-xs font-black bg-purple-600 text-white transition shadow-md cursor-pointer whitespace-nowrap"
                    : "px-3 py-1.5 rounded-lg text-xs font-bold text-zinc-400 hover:text-white transition cursor-pointer whitespace-nowrap";
                btn.innerText = t.label;
                container.appendChild(btn);
            });
        }

        // Carica il primo template del trio pertinente
        currentActiveTemplate = trio[0].id;
        const cleanUrl = demoUrl.split('?')[0];
        iframe.src = `${cleanUrl}?template_id=${currentActiveTemplate}&_t=${Date.now()}`;

    } else if (type === 'experience') {
        if (experienceSwitcher) {
            experienceSwitcher.classList.remove('hidden');
            experienceSwitcher.classList.add('flex');
        }
        iframe.src = `${demoUrl}?_t=${Date.now()}`;
    } else {
        if (contextBadge) {
            contextBadge.classList.remove('hidden');
            contextBadge.classList.add('flex');
            
            const icons = { concierge: "🏨", dentis: "🦷", lexis: "⚖️", locanda: "🍽️", radar: "🏎️", forma_materia: "🏛️", aura: "📡", eternia: "🕊️", love: "💍", ares: "🏋️", nexus: "🤖" };
            if (contextIcon) contextIcon.innerText = icons[type] || "⚡";
            if (contextLabel) contextLabel.innerText = `${videoData.client_name || 'Demo'} (${type})`;
        }
        iframe.src = `${demoUrl}${demoUrl.includes('?') ? '&' : '?'}_t=${Date.now()}`;
    }

    overlay.classList.remove('hidden');
    updatePriceButtons();
}

function closeFullscreenWebsite() {
    document.getElementById('fullscreen-iframe-overlay').classList.add('hidden');
    document.getElementById('fullscreen-iframe').src = "";
}

function nextSlide() {
    if (imagesArray.length === 0) return;
    currentSlideIdx = (currentSlideIdx + 1) % imagesArray.length;
    document.getElementById('carousel-img').src = imagesArray[currentSlideIdx];
}

function prevSlide() {
    if (imagesArray.length === 0) return;
    currentSlideIdx = (currentSlideIdx - 1 + imagesArray.length) % imagesArray.length;
    document.getElementById('carousel-img').src = imagesArray[currentSlideIdx];
}

function updatePriceButtons() {
    if (!videoData) return;
    const priceVal = parseFloat(videoData.price_euro || 400);
    const formattedPrice = priceVal % 1 === 0 ? parseInt(priceVal) : priceVal.toFixed(2);
    const isPaid = videoData.is_paid === true || videoData.is_paid === "true";

    const btn = document.getElementById('actionBtn');
    const overlayBtn = document.getElementById('overlayActionBtn');

    if (isPaid) {
        document.getElementById('watermark-layer').classList.add('hidden'); 
        document.getElementById('overlay-watermark').classList.add('hidden'); 
        
        const paidText = `<i class="fa-solid fa-check"></i> Progetto Sbloccato • Visita Live`;
        if (btn) {
            btn.innerHTML = paidText;
            btn.className = "w-full sm:w-auto bg-green-600 hover:bg-green-500 text-white font-black px-12 py-5 rounded-2xl text-base uppercase tracking-wider transition-all shadow-[0_0_30px_rgba(34,197,94,0.3)] flex items-center justify-center gap-3 cursor-pointer";
            btn.classList.remove('animate-pulse');
        }
        if (overlayBtn) {
            overlayBtn.innerHTML = `<i class="fa-solid fa-check"></i> Sbloccato`;
            overlayBtn.className = "bg-green-600 text-white font-extrabold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider cursor-pointer";
        }
    } else {
        if (btn) {
            btn.innerHTML = `
                <div class="flex items-center gap-3">
                    <span class="line-through text-emerald-200/50 font-mono text-sm font-bold">€ 1.500</span>
                    <span class="text-white font-black">Sblocca Offerta a € ${formattedPrice}</span>
                </div>
            `;
        }
        if (overlayBtn) {
            overlayBtn.innerHTML = `
                <div class="flex items-center gap-2">
                    <span class="line-through text-emerald-200/50 font-mono text-[10px]">€1.500</span>
                    <span>Sblocca a € ${formattedPrice}</span>
                </div>
            `;
        }
    }
}

async function handleAction() {
    if (videoData.is_paid === true || videoData.is_paid === "true") {
        if (videoData.portal_type === 'carousel') {
            alert("Download delle immagini in corso...");
            imagesArray.forEach((url, i) => {
                const a = document.createElement('a'); a.href = url; a.download = `slide_${i + 1}.jpg`; a.click();
            });
        } else {
            window.open(window.resolveLiveDemoUrl(videoData), '_blank');
        }
    } else {
        const btn = document.getElementById('actionBtn');
        const overlayBtn = document.getElementById('overlayActionBtn');
        const originalText = btn.innerHTML;
        
        btn.disabled = true;
        if (overlayBtn) overlayBtn.disabled = true;
        btn.innerHTML = `<i class="fa-solid fa-spinner animate-spin"></i> Connessione Stripe...`;
        if (overlayBtn) overlayBtn.innerHTML = `<i class="fa-solid fa-spinner animate-spin"></i> Attendi...`;

        try {
            const res = await fetch('https://n8n.rmstudio.app/webhook/crea-sessione-stripe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    project_id: videoData.id,
                    email: videoData.client_email || "cliente@rmstudio.app",
                    title: videoData.title || "Sblocco Servizio Definitivo",
                    price: parseFloat(videoData.price_euro || 400),
                    origin: window.location.origin,
                    portal_type: videoData.portal_type || 'siteengine'
                })
            });

            if (!res.ok) throw new Error("Errore del server n8n");
            const data = await res.json();
            
            if (data.url) {
                window.location.href = data.url;
            } else {
                throw new Error("URL di pagamento non ricevuto");
            }
        } catch (err) {
            alert("Impossibile avviare il pagamento. Apertura diretta WhatsApp con Riccardo...");
            window.open("https://wa.me/393478951801?text=Vorrei%20sbloccare%20la%20proposta%20ID%20" + (videoData.id || ''), "_blank");
            btn.disabled = false;
            if (overlayBtn) overlayBtn.disabled = false;
            btn.innerHTML = originalText;
        }
    }
}

// 🎬 INIZIALIZZAZIONE AL CARICAMENTO DOM
window.addEventListener('DOMContentLoaded', async () => {
    generateWatermarks('watermark-layer', 16);
    generateWatermarks('overlay-watermark', 24);
    await loadOrbitalEcosystem();

    // Calcolo Scadenza 10 Giorni da oggi
    const deadlineDate = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000);
    const deadlineFormatted = deadlineDate.toLocaleDateString('it-IT', { day: 'numeric', month: 'long' });
    const scarcityEl = document.getElementById('modal-scarcity-text');
    if (scarcityEl) {
        scarcityEl.innerText = `Offerta riservata valida fino al ${deadlineFormatted}`;
    }

    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    isAdminViewer = params.get('admin') === 'true' || localStorage.getItem('rm_admin') === 'true';

    if (!id) return alert("ID progetto non valido");

    // 👑 SE È L'ADMIN, MOSTRA IL BADGE E DISATTIVA IL TRACCIAMENTO VISITE
    if (isAdminViewer) {
        const indicator = document.getElementById('admin-indicator-bar');
        if (indicator) {
            indicator.classList.remove('hidden');
            indicator.classList.add('flex');
        }
    } else {
        const { data: currentData } = await supabaseClient
            .from('portal_videos')
            .select('views_count')
            .eq('id', id)
            .single();

        if (currentData) {
            const newCount = (currentData.views_count || 0) + 1;
            await supabaseClient
                .from('portal_videos')
                .update({ views_count: newCount, is_opened: true })
                .eq('id', id);
        }
    }

    const { data, error } = await supabaseClient.from('portal_videos').select('*').eq('id', id).single();
    if (error || !data) return alert("Proposta o progetto non trovato");
    videoData = data;

    document.getElementById('title').innerText = data.title || "Il tuo Progetto";
    document.getElementById('badge').innerText = data.portal_type || "Progetto";
    document.getElementById('client-name').innerText = data.client_name || "Cliente";
    
    if (data.sent_at) {
        const dateObj = new Date(data.sent_at);
        document.getElementById('sent-date').innerText = dateObj.toLocaleDateString('it-IT') + ' alle ' + dateObj.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });
    } else {
        document.getElementById('sent-date').innerText = "Non ancora inviato";
    }

    const priceVal = parseFloat(data.price_euro || 400);
    const formattedPrice = priceVal % 1 === 0 ? parseInt(priceVal) : priceVal.toFixed(2);
    document.getElementById('header-price-display').innerText = `€ ${formattedPrice}`;
    
    const isDirectVideo = data.content_url && (data.content_url.endsWith('.mp4') || data.content_url.includes('.r2.dev') || data.content_url.includes('/video_'));

    if (data.portal_type === 'video' || (data.portal_type === 'locanda' && isDirectVideo)) {
        const p = document.getElementById('player-video');
        p.src = data.content_url;
        p.classList.remove('hidden');
    } 
    else if (data.portal_type === 'carousel') {
        imagesArray = typeof data.carousel_images === 'string' ? JSON.parse(data.carousel_images) : data.carousel_images;
        if (imagesArray.length > 0) {
            document.getElementById('carousel-img').src = imagesArray[0];
            document.getElementById('player-carousel').classList.remove('hidden');
        }
    } 
    else {
        const profile = window.SAAS_APP_PROFILES[data.portal_type] || { icon: "fa-laptop-code text-purple-400", title: "Applicazione Web Pronta", desc: "Applicazione interattiva configurata per il cliente." };
        const iconBox = document.getElementById('html-preview-icon');
        const titleEl = document.getElementById('html-preview-title');
        const descEl = document.getElementById('html-preview-desc');

        if (iconBox) iconBox.innerHTML = `<i class="fa-solid ${profile.icon} text-2xl"></i>`;
        if (titleEl) titleEl.innerText = profile.title;
        if (descEl) descEl.innerText = profile.desc;

        document.getElementById('html-preview-container').classList.remove('hidden');
        openFullscreenWebsite();
    }

    updatePriceButtons();
});
