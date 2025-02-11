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