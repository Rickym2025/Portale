// CONFIGURAZIONE GLOBALE RM STUDIO
const CONFIG = {
    SUPABASE_URL: 'https://jhijfulhntlhcytbhcly.supabase.co',
    SUPABASE_S2_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpoaWpmdWxobnRsaGN5dGJoY2x5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI3MzcxODcsImV4cCI6MjA5ODMxMzE4N30.z062NW4ApClll-XWHH2ufmcCleBRNHUUdKO6FiLa0TQ',
    
    ENDPOINTS: {
        CREATE_PORTAL: 'https://n8n.rmstudio.app/webhook/admin-create-portal',
        DELETE_PORTAL: 'https://n8n.rmstudio.app/webhook/delete-portal-video',
        FIRST_INVITE: 'https://n8n.rmstudio.app/webhook/invia-primo-invito',
        REMINDER: 'https://n8n.rmstudio.app/webhook/polite-reminder',
        VISION_ADMIN: 'https://n8n.rmstudio.app/webhook/vision-admin'
    }
};

// Inizializzazione Client Supabase
const supabaseClient = supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_S2_KEY);
