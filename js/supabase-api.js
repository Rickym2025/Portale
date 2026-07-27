// GESTIONE CHIAMATE SUPABASE (S2 PORTALE DB)
async function fetchSupabaseProjects() {
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
    const payload = {};
    
    // Casting tipi dati per evitare errori di schema su Supabase
    if (field === 'price_euro') {
        payload[field] = parseFloat(value) || 0;
    } else if (field === 'views_count') {
        payload[field] = parseInt(value, 10) || 0;
    } else if (field === 'is_whatsapp_sent' || field === 'is_paid') {
        payload[field] = Boolean(value);
    } else {
        payload[field] = value;
    }

    const { error } = await supabaseClient.from('portal_videos').update(payload).eq('id', id);
    if (error) {
        alert("Errore aggiornamento campo: " + error.message);
    }
}

// Sottoscrizione Realtime Supabase (Aggiorna il pannello in background)
supabaseClient
    .channel('realtime_portal_changes')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'portal_videos' }, () => {
        loadMasterData();
    })
    .subscribe();
