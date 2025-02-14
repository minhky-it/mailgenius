import axios from "axios";
import { SERVICE } from "../enum/service";

// Add token to headers when creating request
const AttachInfo = () => {
    const access_token = localStorage.getItem("access_token");
    const headers = access_token
	? {
		"Content-Type": "application/json",
		Authorization: `Bearer ${localStorage.getItem("access_token")}`,
		}
	: {
		"Content-Type": "application/json",
		};
	return {access_token, headers}
}

export const GET = async (url) => {
    try{
        const INFO = AttachInfo();
        const RESPONSE = await axios.get(`/api/${url}`, { headers:  INFO.headers});
        // check response is error
        if(RESPONSE.data.error){
            return {
                error: true,
                message: RESPONSE.data.message
            }
        }

        return RESPONSE.data;
    }
    catch(error){
        // get status code
        if(error.status === 428){
            // Access token is expired
            const refresh = await renew_refresh_token(url);
            if(refresh && !refresh.error){
                return GET(url);
            }
        }
        // Handle other errors
        return {
            error: true,
            message: error.response.data.error
        }
    }
}


export const POST = async (url, body) => {
    try{
        const INFO = AttachInfo();
        const RESPONSE = await axios.post(`/api/${url}`, body, { headers:  INFO.headers});
        // check response is error
        if(RESPONSE.data.error){
            return {
                error: true,
                message: RESPONSE.data.message
            }
        }
        return RESPONSE.data;
    }catch(error){
        // get status code
        if(error.status === 428){
            // Access token is expired
            const refresh = await renew_refresh_token(url);
            if(refresh &&!refresh.error){
                return POST(url, body);
            }
        }
        // Handle other errors
        return {
            error: true,
            message: error.response.data.error
        }
    }
}

export const PATCH = async (url, body) => {
    try{
        const INFO = AttachInfo();
        const RESPONSE = await axios.patch(`/api/${url}`, body, { headers:  INFO.headers});
        // check response is error
        if(RESPONSE.data.error){
            return {
                error: true,
                message: RESPONSE.data.message
            }
        }
        return RESPONSE.data;
    }catch(error){
        // get status code
        if(error.status === 428){
            // Access token is expired
            const refresh = await renew_refresh_token(url);
            if(refresh &&!refresh.error){
                return PATCH(url, body);
            }
        }
        // Handle other errors
        return {
            error: true,
            message: error.response.data.error
        }
    }
}

export const PUT = async (url, body) => {
    try {
        const INFO = AttachInfo();
        const RESPONSE = await axios.put(`/api/${url}`, body, { headers:  INFO.headers});
        // check response is error
        if(RESPONSE.data.error){
            return {
                error: true,
                message: RESPONSE.data.message
            }
        }
        return RESPONSE.data;
    }catch(error){
        // get status code
        if(error.status === 428){
            // Access token is expired
            const refresh = await renew_refresh_token(url);
            if(refresh &&!refresh.error){
                return PUT(url, body);
            }
        }
        // Handle other errors
        return {
            error: true,
            message: error.response.data.error
        }
    }
}

export const DELETE = async (url) => {
    try{
        const INFO = AttachInfo();
        const RESPONSE = await axios.delete(`/api/${url}`, { headers:  INFO.headers});
        // check response is error
        if(RESPONSE.data.error){
            return {
                error: true,
                message: RESPONSE.data.message
            }
        }
        return RESPONSE.data;
    }catch(error){
        // get status code
        if(error.status === 428){
            // Access token is expired
            const refresh = await renew_refresh_token(url);
            if(refresh &&!refresh.error){
                return DELETE(url);
            }
        }
        // Handle other errors
        return {
            error: true,
            message: error.response.data.error
        }
    }
}

export const PATCH_FORM = async (url, body) => {
    try{
        const RESPONSE = await axios.patch(`/api/${url}`, body, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            }
        });

        // check response is error
        if(RESPONSE.data.error){
            return {
                error: true,
                message: RESPONSE.data.message
            }
        }
        return RESPONSE.data;
    }catch(error){
        // get status code
        if(error.status === 428){
            // Access token is expired
            const refresh = await renew_refresh_token(url);
            if(refresh &&!refresh.error){
                return DELETE(url);
            }
        }
        // Handle other errors
        return {
            error: true,
            message: error.response.data.error
        }
    }
}


export const POST_FORM = async (url, body) => {
    try{
        const INFO = AttachInfo();
        const RESPONSE = await axios.post(`/api/${url}`, body, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            }
        });

        // check response is error
        if(RESPONSE.data.error){
            return {
                error: true,
                message: RESPONSE.data.message
            }
        }
        return RESPONSE.data;
    }catch(error){
        // get status code
        if(error.status === 428){
            // Access token is expired
            const refresh = await renew_refresh_token(url);
            if(refresh &&!refresh.error){
                return DELETE(url);
            }
        }
        // Handle other errors
        return {
            error: true,
            message: error.response.data.error
        }
    }
}


// Renew the access token 
const renew_refresh_token = async (url) => {
    try{
        // Retrive tokens from local
        const ACCESS_TOKEN = localStorage.getItem("access_token");
        const REFRESH_TOKEN = localStorage.getItem("refresh_token");

        // Exit if tokens are missing
        if(!ACCESS_TOKEN ||!REFRESH_TOKEN){
            return { error: true, message: "Missing tokens"};
        }

        // Send refresh request with tokens
        const RESPONSE = await axios.post(`/api/${SERVICE.AUTH}/authorization/refresh`, {
            ACCESS_TOKEN,
            REFRESH_TOKEN
        });

        // Check response status and update tokens on success
        if(RESPONSE.data.error){
            return {
                error: true,
                message: RESPONSE.data.message
            }
        }
        const {access_token, refresh_token} = RESPONSE.data.data;
        // Update tokens in local storage
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);
        return {
            error: false,
            message: "Tokens renewed successfully"
        }
    }catch(error){

    }
}