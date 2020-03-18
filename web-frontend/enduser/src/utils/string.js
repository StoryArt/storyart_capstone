import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';


class StringUtils{
    static truncate(str, length){
        if(str.length <= length) return str;
        return str.substring(0, length) + '...';
    }

    static parseHtml(html){
        return ReactHtmlParser(html);
    }

    static removeHtml(html) {
        const tmp = document.createElement("div");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    }
}

export default StringUtils;