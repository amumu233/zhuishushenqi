import queryString from 'query-string';
import fetch from 'isomorphic-fetch';
// import config from '../config';

var request = {};

request.get = (url, params, successCallBack, failCallBack) => {
    if(params){
        url += '?' + queryString.stringify(params);
    }
    console.log('httpUtil---GET---URL : ' + url);
    return fetch(url)
        .then((response)=>response.json())
        .then((response) => {
            successCallBack(response)
        })
        .catch((error) => {
            
            failCallBack(error)
        })
};


// request.post = (url, body, successCallBack, failCallBack ) => {
//     var options = _.extend(config.header, {
//         body: JSON.stringify(body)
//     });
//     console.log('httpUtil---POST---URL: ' + url + '--- BODY :' + body);
//     return fetch(url,options)
//         .then((response) => response.json())
//         .then((response) => {
//             successCallBack(response)
//         })
//         .catch((error) => {
//             console.log(error);
//             failCallBack(error)
//         })
// }


export default request;