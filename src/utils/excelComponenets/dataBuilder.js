/* ---------- Data Builder ---------- */
export const buildItems = (salesInvoices = []) =>
    Array.isArray(salesInvoices) && salesInvoices.length
        ? salesInvoices.map((inv) => ({
            description: inv?.partyName
                ? `${inv.partyName} — ${(inv.invoiceNumber || '').trim()}`
                : inv?.invoiceNumber || 'Item',
            price: Number(inv?.totalAmount) || 0,
            qty: 1,
        }))
        : [
            { description: 'Product A', price: 500, qty: 2 },
            { description: 'Product B', price: 300, qty: 1 },
            { description: 'Product C', price: 200, qty: 5 },
        ];
