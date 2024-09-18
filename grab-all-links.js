javascript:(function(){alert("%27"+Array.from(document.documentElement.outerHTML.matchAll(/\/Confirmation\/\?s=(\S+)"/g)).map(m=>m[1]).join("%27, %27")+"%27")})();
