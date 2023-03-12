import axios from "axios";
import { useEffect, useState } from "react";

export default function useAuth(){
    const [is_auth,setIsAuth] = useState(false);

    useEffect(() => {
        let session_id = window.localStorage.getItem("session");
        let base64_session_id = "";
        if(session_id)
            base64_session_id = Buffer.from(session_id).toString('base64');

        axios.get("/api/user/auth", { headers:{ Authorization: session_id }}).then(response => {
            if(response.data.status == "success"){
                setIsAuth(true);
            }else{
                setIsAuth(false);
            }
        }).catch(err => {
            console.log(err);
            setIsAuth(false);
        });
    },[]);

    return is_auth;
}