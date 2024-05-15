export function getHourTime(time: Date) {
    const current = new Date(time);

    const hour = current.getHours() < 10 ? "0" + current.getHours() : current.getHours()
    const minute = current.getMinutes() < 10 ? "0" + current.getMinutes() : current.getMinutes()

    return `${hour}:${minute}`
}

export function getTimeNotif(time: number | Date) {
    const now = new Date().getTime();
    const current = new Date(time);
    const week = 1000 * 24 * 60 * 60 * 7;
    const toDay = 1000 * 24 * 60 * 60;
    const weekArray = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

    if (now - current.getTime() >= week) {
        return `${current.getDay()}/${current.getMonth() + 1}/${current.getFullYear()}`
    } else if (now - current.getTime() >= toDay) {
        return weekArray[current.getDay()]
    } else if (now - current.getTime() >= toDay && now - current.getTime() <= toDay * 2) {
        return "kemarin"
    } else {
        return getHourTime(current)
    }
}