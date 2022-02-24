import * as instance from  "axios";
const axios = instance.create({
    baseURL: "http://localhost:8080/api"  
});

const requestHandler = (request) => {
    request.headers["Accept"] = "application/json";
    request.headers["Content-Type"] = "application/json";

    const session = JSON.parse(localStorage.getItem("user")) || null 
    if (session){
        request.headers["Authorization"] = `Bearer ${session.token}`;
    }
    return request;

}

const errorResponseHandler = (response) => {
    return Promise().reject({...response}) //...response significa que toma todos sus atributos uno por uno y los pasará a un nuevo objeto

}

const succesResponseHandler = (response) => {
    return response.data;
    
}

axios.interceptors.request.use((request) => requestHandler(request));

axios.interceptors.response.use(
    (response) => succesResponseHandler(response),
    (error) => errorResponseHandler(error)
);

export default axios;