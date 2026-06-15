// ---------- helpers/date.js ----------
export const formatDate = (ts) => {
    if (!ts) return '-';
    const date = new Date(ts);
    return isNaN(date.getTime())
        ? '-'
        : date.toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
};
