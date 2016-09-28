"use strict";

export default function () {

    let url = 'http://k.img.com.ua/rss/ua/news.xml';

    const x2JS = require('x2js');
    let x2js = new x2JS();

    let promise = new Promise(function (resolve, reject) {
        $.get(url, function (response) {
            let sXML =  new XMLSerializer().serializeToString(response);
            let json = x2js.xml2js(sXML);
            let data = json.rss.channel;
            resolve(data);
            reject('error');
        });
    });

    return promise;
}
