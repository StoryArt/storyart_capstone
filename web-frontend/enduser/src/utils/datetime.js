class DateTimeUtils{
    static getDate(datetime){
        try {
            return new Date(datetime).toLocaleDateString();
        } catch (error) {
            return 'Chưa xác định';
        }
    }

    static getDateTime(datetime){
        try {
            const d = new Date(datetime);
            return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
        } catch (error) {
            return 'Chưa xác định';
        }
    }

    static ten = val => (val >= 10) ? val : '0' + val;

    static formatStatisticDate(str){

        try {
            const d = new Date(str);
            console.log(d);
            console.log(d.getMonth());
            return d.getFullYear() + '-' + DateTimeUtils.ten(d.getMonth() + 1) + '-' + DateTimeUtils.ten(d.getDate());
        } catch (error) {
            return '';
        }
    }
}

export default DateTimeUtils;