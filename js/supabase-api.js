// GESTIONE CHIAMATE SUPABASE (S2 PORTALE DB)
async function fetchSupabaseProjects() {
    const { data, error } = await supabaseClient
        .from('portal_videos')
        .select('*')
        .order('sent_at', { ascending: false });

    if (error) {
        console.error("Errore Supabase:", error);
        return [];
    }
    return data || [];
}

async function updateSupabaseField(id, field, value) {
    const payload = {};
    payload[field] = value;
    const { error } = await supabaseClient.from('portal_videos').update(payload).eq('id', id);
    if (error) alert("Errore aggiornamento: " + error.message);
}

// Sottoscrizione Realtime
supabaseClient
    .channel('realtime_portal_changes')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'portal_videos' }, () => {
        loadMasterData();
    })
    .subscribe();
