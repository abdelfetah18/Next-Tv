import useCookies from "@/hooks/CookiesManager";
import axios from "axios";
import { FormEvent, useState } from "react";
import { FaFacebook, FaGithub, FaInstagram, FaPlay, FaRegUserCircle, FaTwitter } from "react-icons/fa";
import AlertMessage from "@/components/AlertMessage";

export default function SignIn(){
    const [alert_message,setAlertMessage] = useState("");
    const { setCookie } = useCookies();
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    function sign_in(ev:FormEvent){
        ev.preventDefault();
        axios.post("/api/user/sign_in", { username, password }).then(response => {
            if(response.data.status == "success"){
                window.localStorage.setItem("session", response.data.data.session_id);
                setCookie("session", response.data.data.session_id, { Path: "/" } );
                setAlertMessage("Login success!");
                // Redirect to Home.
                setTimeout(() => {
                    window.location.href = "/";                    
                }, 1000);
            }else{
                setAlertMessage("Error: "+response.data.message);
            }
        }).catch(err => {
            console.log(err); // FIXME: handle errors
        });
    }

    return(
        <div className="w-full h-screen background_image bg-black">
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-black via-gray-900/40 to-gray-900">
                <a href="/" className="absolute top-2 left-2 flex flex-row items-center mb-16 py-2 px-4 rounded-lg bg-black/40">
                    <div className="text-3xl text-white font-bold">Next</div>
                    <div className="text-white text-center border-4 border-white rounded-full p-2 mx-2"><FaPlay /></div>
                    <div className="text-3xl text-white font-bold">Tv</div>
                </a>
                <form id="login-form" onSubmit={sign_in} className="w-1/3 flex flex-col items-center bg-gray-900/80 rounded-lg py-8">
                    <div className="text-gray-200 mb-8 flex flex-col items-center">
                        <FaRegUserCircle className="text-5xl" />
                        <div className="text-lg font-mono pt-2">Welcome back</div>
                    </div>
                    <input className="w-3/4 text-base px-6 py-2 my-2 rounded-lg autofill:bg-gray-700/60 bg-gray-700/60 text-gray-200" type="text" placeholder="Username" onChange={(ev) => setUsername(ev.target.value)} value={username} />
                    <input className="w-3/4 text-base px-6 py-2 my-2 rounded-lg bg-gray-700/60 text-gray-200" type="password" placeholder="Password" onChange={(ev) => setPassword(ev.target.value)} value={password} />
                    <input type={"submit"} className="text-gray-200 text-xs font-semibold px-12 py-2 mt-8 rounded-lg bg-blue-800 cursor-pointer hover:bg-blue-600" value={"SIGN IN"} />
                    <div className="flex flex-row items-center mt-4">
                        <div className="text-white text-xs">{"Don't have an account yet ?"}</div>
                        <a href="/user/sign_up" className="ml-2 text-blue-400 hover:text-blue-400 text-xs font-normal cursor-pointer">Create new account</a>
                    </div>
                </form>
                <div className="w-full flex flex-col items-center absolute bottom-0 my-1">
                    <div className="w-11/12 flex flex-row items-center justify-center my-4">
                        <div className="mx-4 w-1/4 text-gray-500 font-mono flex flex-row items-center justify-center py-2 bg-gray-800/40 rounded-lg cursor-pointer duration-500 hover:text-red-500">
                            <FaFacebook className="text-base"/>
                            <a href="https://www.facebook.com/AbdelfetahDev" className="ml-2 text-xs">AbdelfetahDev</a>
                        </div>
                        <div className="mx-4 w-1/4 text-gray-500 font-mono flex flex-row items-center justify-center py-2 bg-gray-800/40 rounded-lg cursor-pointer duration-500 hover:text-red-500">
                            <FaInstagram className="text-base"/>
                            <a href="https://www.instagram.com/abdelfetah_lachenani" className="ml-2 text-xs">abdelfetah_lachenani</a>
                        </div>
                        <div className="mx-4 w-1/4 text-gray-500 font-mono flex flex-row items-center justify-center py-2 bg-gray-800/40 rounded-lg cursor-pointer duration-500 hover:text-red-500">
                            <FaTwitter className="text-base"/>
                            <a href="https://www.twitter.com/AbdelfetahDev" className="ml-2 text-xs">AbdelfetahDev</a>
                        </div>
                        <div className="mx-4 w-1/4 text-gray-500 font-mono flex flex-row items-center justify-center py-2 bg-gray-800/40 rounded-lg cursor-pointer duration-500 hover:text-red-500">
                            <FaGithub className="text-base"/>
                            <a href="https://www.github.com/abdelfetah18" className="ml-2 text-xs">abdelfetah18</a>
                        </div>
                    </div>
                    <div className="text-sky-700 font-mono font-light">This app is created and design by <span className="font-bold">AbdelfetahDev</span></div>
                </div>
            </div>
            <AlertMessage message={alert_message} />
        </div>
    )
}