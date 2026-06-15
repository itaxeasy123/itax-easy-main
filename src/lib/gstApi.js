// lib/gstApi.js
import { getAccessToken } from './authToken';
import { refreshAccessToken } from './setupAuthInterceptors';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const apiFetch = async (method, endpoint, { token, body, params } = {}) => {
    // build query string from params object if provided
    let url = `${API_URL}/gst${endpoint}`;
    if (params && Object.keys(params).length > 0) {
        const query = new URLSearchParams(params).toString();
        url += `?${query}`;
    }

    const doRequest = (bearer) =>
        fetch(url, {
            method,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                ...(bearer ? { Authorization: `Bearer ${bearer}` } : {}),
            },
            body: body ? JSON.stringify(body) : undefined,
        });

    // Use the caller-provided token, else the in-memory access token.
    let res = await doRequest(token || getAccessToken());

    // Auto-refresh once on 401, then retry.
    if (res.status === 401) {
        try {
            const { token: newToken } = await refreshAccessToken();
            if (newToken) res = await doRequest(newToken);
        } catch {
            // fall through to error handling below
        }
    }

    if (!res.ok) {
        let message = 'API error';
        try {
            const errorData = await res.json();
            message = errorData.message || message;
        } catch {
            /* non-JSON error body */
        }
        throw new Error(message);
    }

    return res.json();
};

export { apiFetch };
