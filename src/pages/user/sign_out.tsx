import axios from "axios";
import { useEffect } from "react";


// TODO: show some loading animation.
export default function SignOut(){
    
    useEffect(() => {
        sign_out();
    },[]);

    function sign_out(){
        axios.get("/api/user/sign_out",{ headers: { Authorization: "" } }).then(response => {
            if(response.data.status == "success"){
                window.localStorage.removeItem("session");
                document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                window.location.href = "/user/sign_in";
            }else{
                // TODO: show error message.
                console.log(response.data);
            }
        }).catch(err => {
            console.log(err); // FIXME: handle errors
        });
    }

    return(
        <div className="w-full h-screen background_image bg-black">
            <div className="text-lg font-mono text-white px-8 py-4">Signing out...</div>
        </div>
    )
}