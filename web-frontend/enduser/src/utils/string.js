import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';


class StringUtils{
    static truncate(str, length){
        if(str.length <= length) return str;
        return str.substring(0, length) + '...';
    }

    static parseHtml(html){
        return ReactHtmlParser(html);
    }
}

export default StringUtils;