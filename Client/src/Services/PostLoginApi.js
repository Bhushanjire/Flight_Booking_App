import httpMethod from "./httpMethod";

export const getCities=()=>{
    return httpMethod.GET('/list-city')
}
