import useCookies from "@/hooks/CookiesManager";
import axios from "axios";
import { useState } from "react";
import { FaFacebook, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";

export default function SignIn(){
    const { setCookie } = useCookies();
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    function sign_in(){
        axios.post("/api/user/sign_in", { username, password }).then(response => {
            if(response.data.status == "success"){
                window.localStorage.setItem("session", response.data.data.session_id);
                setCookie("session", response.data.data.session_id, { Path: "/" } );
                // Redirect to Home.
                window.location.href = "/";
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
            <div className="w-full h-full flex flex-col items-center bg-gradient-to-b from-black via-gray-900/40 to-gray-900">
                <div className="text-3xl text-white font-mono font-bold py-2 my-4">Sign In</div>
                <div className="w-1/3 flex flex-col items-center bg-gray-900/80 rounded-lg py-12 my-16">
                    <input className="w-3/4 text-base font-bold px-4 py-1 my-2 rounded-full" type="text" placeholder="username" onChange={(ev) => setUsername(ev.target.value)} value={username} />
                    <input className="w-3/4 text-base font-bold px-4 py-1 my-2 rounded-full" type="password" placeholder="password" onChange={(ev) => setPassword(ev.target.value)} value={password} />
                    <div onClick={sign_in} className="text-white text-base font-bold px-4 py-1 my-2 rounded-full bg-blue-500 cursor-pointer hover:bg-blue-600">Sign In</div>
                    <div className="text-white text-base font-bold">Or</div>
                    <a href="/user/sign_up" className="text-blue-500 hover:text-blue-400 text-sm font-medium cursor-pointer">Create an account</a>
                </div>
                <div className="text-white font-mono">
                    Watch your favorite movies and series now
                </div>
                <div className="w-full flex flex-col items-center absolute bottom-0 my-1">
                    <div className="w-11/12 flex flex-row items-center justify-center my-4">
                        <div className="mx-4 w-1/6 text-white font-mono flex flex-row items-center px-4 py-1 bg-gray-800 rounded-lg cursor-pointer duration-500 hover:text-red-500">
                            <FaFacebook className="text-base"/>
                            <a href="https://www.facebook.com/AbdelfetahDev" className="ml-2 text-sm">AbdelfetahDev</a>
                        </div>
                        <div className="mx-4 w-1/6 text-white font-mono flex flex-row items-center px-4 py-1 bg-gray-800 rounded-lg cursor-pointer duration-500 hover:text-red-500">
                            <FaInstagram className="text-base"/>
                            <a href="https://www.instagram.com/abdelfetah_lachenani" className="ml-2 text-sm">abdelfetah_lachenani</a>
                        </div>
                        <div className="mx-4 w-1/6 text-white font-mono flex flex-row items-center px-4 py-1 bg-gray-800 rounded-lg cursor-pointer duration-500 hover:text-red-500">
                            <FaTwitter className="text-base"/>
                            <a href="https://www.twitter.com/AbdelfetahDev" className="ml-2 text-sm">AbdelfetahDev</a>
                        </div>
                        <div className="mx-4 w-1/6 text-white font-mono flex flex-row items-center px-4 py-1 bg-gray-800 rounded-lg cursor-pointer duration-500 hover:text-red-500">
                            <FaGithub className="text-base"/>
                            <a href="https://www.github.com/abdelfetah18" className="ml-2 text-sm">abdelfetah18</a>
                        </div>
                    </div>
                    <div className="text-white font-mono">This app is created and design by <b>AbdelfetahDev</b></div>
                </div>
            </div>
        </div>
    )
}