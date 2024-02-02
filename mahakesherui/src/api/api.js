
import apiConsts from "./ApiConsts";

async function apiFunction(Method, urlRequest, Body = undefined) {
    const header =  { "Content-Type": apiConsts.contentType, 'Authorization': `Bearer ` + sessionStorage.getItem("myToken") } 
    const requestOptions = (Body === undefined) ? { method: Method, headers: header } : { method: Method, headers: header, body: JSON.stringify(Body)};
    const token = await fetch(urlRequest, requestOptions)
        .then(response => {
            return response.status === 200 ? response.text() : response.status;})
        .then(data => {
            return data;})
        .catch(error => {
            console.log('Request failed', error);});
    return token;
}

export default apiFunction;