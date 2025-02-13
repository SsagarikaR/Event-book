import axios from "axios"

 export const makePostRequest=async (route:string,body:object)=>{
    try{
        const response=await axios.post(`http://localhost:3000/${route}`,body)
        console.log(response);
        return response.data
    }
    catch(error){
        console.log(error,"error");
    }
}


export const makeGetRequest=async (route:string)=>{
    try{
        const response=await axios.get(`http://localhost:3000/${route}`)
        console.log(response);
        return response.data;
    }
    catch(error){
        console.log(error,"error");
    }
}

export const makePatchRequest=async(route:string,body:object)=>{
    try{
        const response=await axios.patch(`http://localhost:3000/${route}`,body)
        console.log(body)
        console.log(response);
        return response.data;
    }
    catch(error){
        console.log(error,"error");
    }
}

export const makeDeleteRequest=async(route:string,body:object)=>{
    try{
        console.log(body)
        const response=await axios.delete(`http://localhost:3000/${route}`,{
            data:body
        })
        console.log(response);
        return response.data;
    }
    catch(error){
        console.log(error,"error");
    }
}