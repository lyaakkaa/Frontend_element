export function formatDate(date) {
    const formatter = new Intl.DateTimeFormat(navigator.language, {
        formatMatcher: 'best fit'
    });
    return formatter.format(new Date(date));
}