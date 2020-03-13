class StringUtils{
    static truncate(str, length){
        if(str.length <= length) return str;
        return str.substring(0, length) + '...';
    }
}

export default StringUtils;