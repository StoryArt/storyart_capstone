import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import ValidationUtils from './validation';

class StringUtils{
    static truncate(str, length){
        if(str.length <= length) return str;
        return str.substring(0, length) + '...';
    }

    static parseHtml(html){
        return ReactHtmlParser(html);
    }

    static removeHtml(html) {
        // const tmp = document.createElement("div");
        // tmp.innerHTML = html;
        // return tmp.textContent || tmp.innerText || "";
        if(ValidationUtils.isEmpty(html)) return '';
        return html.replace(/<[^>]*>?/gm, '');
    }

    static getObjTitle(obj){
        if(ValidationUtils.isEmpty(obj) || ValidationUtils.isEmpty(obj.title)) return 'Chưa có tiêu đề';
        return obj.title;
    }

    static formatMoney(value){
        if(typeof value !== 'number') value = Number(value);
        if(isNaN(value)) return '';
        let formattedVal = value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        if(Number.isInteger(value)){
            return formattedVal.substring(0, formattedVal.length - 3);
        } else {
            return formattedVal;
        }
    }

    static getByteSize(str){
        // return new Blob([str]).size;
        const size = (new TextEncoder().encode(str)).length / 1024;
        return size.toFixed(2);
    }
}

export default StringUtils;