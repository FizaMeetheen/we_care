import axios from "axios";

const commonAPI = async(httpRequest, url , reqBody , reqHeader)=> {
    const requestConfig = {
        method : httpRequest ,
        url ,
        data : reqBody ,
        headers : reqHeader
    }
    return await axios(requestConfig).then(res=>{
        return res
    }).catch(error=>{
        return error.response; 
    })
}

export default commonAPI