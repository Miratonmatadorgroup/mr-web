function generateReference(): string {
    const date = new Date();
    const formattedDate = date.toISOString().replace(/[-:.TZ]/g, '');
    const randomId = Math.random().toString(36).substring(2, 10).toUpperCase();
    return `TOK-${formattedDate}-${randomId}`;
}

export default generateReference;