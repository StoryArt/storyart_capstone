class DateTimeUtils{
    static getDate(datetime){
        return new Date(datetime).toLocaleDateString();
    }

    static getDateTime(datetime){
        const d = new Date(datetime);
        return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
    }
}

export default DateTimeUtils;