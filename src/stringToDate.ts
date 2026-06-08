export default function stringToDate(text: string): Date {
    // console.log(text);
    const [date, time] = text.split(' '); // retorna array
    const [day, mounth, year] = date.split('/').map((item) => Number(item));
    const [hour, min] = time.split(':').map(Number);

    return new Date(year, mounth - 1, day, hour, min);
}
