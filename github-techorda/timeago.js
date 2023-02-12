export function timeAgo(dateString) {
    const pastDate = new Date(dateString);
    const currentDate = new Date();
    const timePassed = currentDate - pastDate;

    const rtf = new Intl.RelativeTimeFormat('en', { style: 'long' });
    return rtf.format(-(timePassed / 1000 / 60 / 60 / 24));
}