import http from  "http";

let antiSleep = ()=>setInterval(function() {
    http.get("http://olegpalchyk.herokuapp.com");
}, 300000);
export default antiSleep;