"use strict";

import getData from './_getContentData';


setTimeout(function () {
 getData().then(function (data) {
  console.log(data);
 })
}, 10000);

