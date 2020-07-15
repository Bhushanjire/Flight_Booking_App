import api from "../Services/Api";
const httpMethod ={
    POST(url,data){
        return  api.post(url,data)
    },
    GET(url){
        return api.get(url)

    },
    PUT(url,data){
        return api.put(url,data)
    },
    DELETE(url,id){

        // return api.delete(url)

    }
}
export default httpMethod;