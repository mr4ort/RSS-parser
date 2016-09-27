"use strict";

export default function () {

    let options = {
        url: 'http://k.img.com.ua/rss/ua/news.xml',
        crossDomain: true
    };

    $.ajax(options).done(function (data) {
        console.log(data);
    });



}
