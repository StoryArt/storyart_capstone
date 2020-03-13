class DateTimeUtils{
    static getTime(datetime){
        return new Date(datetime).toLocaleDateString();
    }
}

export default DateTimeUtils;