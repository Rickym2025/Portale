// CHIAMATE AI WEBHOOK N8N
async function triggerN8NCreate(formData) {
    const response = await fetch(CONFIG.ENDPOINTS.CREATE_PORTAL, {
        method: 'POST',
        body: formData
    });
    return response.ok;
}

async function triggerN8NDelete(id) {
    const response = await fetch(CONFIG.ENDPOINTS.DELETE_PORTAL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
    });
    return response.ok;
}

async function triggerN8NFirstInvite(id, email, title) {
    const response = await fetch(CONFIG.ENDPOINTS.FIRST_INVITE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, email, title })
    });
    return response.ok;
}

async function triggerN8NReminder(id, email, title, price) {
    const response = await fetch(CONFIG.ENDPOINTS.REMINDER, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, email, title, price })
    });
    return response.ok;
}
