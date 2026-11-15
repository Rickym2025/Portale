// js/supabase-api.js - GESTIONE CHIAMATE SUPABASE (S2 PORTALE DB)

async function fetchSupabaseProjects() {
    if (typeof supabaseClient === 'undefined' || !supabaseClient) {
        console.error("supabaseClient non inizializzato.");
        return [];
    }

    const { data, error } = await supabaseClient
        .from('portal_videos')
        .select('*')
        .order('sent_at', { ascending: false });

    if (error) {
        console.error("Errore caricamento Supabase:", error);
        return [];
    }
    return data || [];
}

// SALVATAGGIO AUTOMATICO IN TEMPO REALE AL CAMBIO CAMPO
async function updateSupabaseField(id, field, value) {
    if (typeof supabaseClient === 'undefined' || !supabaseClient || !id) return;

    const payload = {};
    const booleanFields = ['is_whatsapp_sent', 'is_paid', 'is_opened', 'first_email_sent', 'followup_sent'];

    // Casting tipi dati e normalizzazione per evitare errori di schema o spazi sporchi su Supabase
    if (field === 'price_euro') {
        payload[field] = parseFloat(value) || 0;
    } else if (field === 'views_count') {
        payload[field] = parseInt(value, 10) || 0;
    } else if (booleanFields.includes(field)) {
        payload[field] = (value === true || value === 'true');
    } else if (field === 'client_email' && typeof value === 'string') {
        payload[field] = value.trim().toLowerCase();
    } else if (typeof value === 'string') {
        payload[field] = value.trim();
    } else {
        payload[field] = value;
    }

    const { error } = await supabaseClient
        .from('portal_videos')
        .update(payload)
        .eq('id', id);

    if (error) {
        console.error(`Errore aggiornamento campo ${field}:`, error);
        alert("Errore aggiornamento campo: " + error.message);
    }
}

// LETTURA LISTINO PREZZI CENTRALIZZATO (SAAS_PRICING)
async function fetchSaasPricing(saasFilter = null) {
    if (typeof supabaseClient === 'undefined' || !supabaseClient) return [];

    let query = supabaseClient.from('saas_pricing').select('*');
    if (saasFilter) {
        query = query.eq('saas', saasFilter);
    }

    const { data, error } = await query;
    if (error) {
        console.error("Errore lettura saas_pricing:", error);
        return [];
    }
    return data || [];
}

// Sottoscrizione Realtime Supabase con Debounce (Aggiorna il pannello in background senza doppi refresh)
let _realtimeReloadTimer = null;

if (typeof supabaseClient !== 'undefined' && supabaseClient) {
    supabaseClient
        .channel('realtime_portal_changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'portal_videos' }, () => {
            clearTimeout(_realtimeReloadTimer);
            _realtimeReloadTimer = setTimeout(() => {
                if (typeof loadMasterData === 'function') {
                    loadMasterData();
                }
            }, 350);
        })
        .subscribe();
}
