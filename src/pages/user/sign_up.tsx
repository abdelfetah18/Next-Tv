import AlertMessage from "@/components/AlertMessage";
import axios from "axios";
import { FormEvent, useState } from "react";
import { FaFacebook, FaGithub, FaInstagram, FaPlay, FaRegUserCircle, FaTwitter } from "react-icons/fa";

export default function SignUp(){
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [confirm_password,setConfirPassword] = useState("");
    const [email,setEmail] = useState("");
    const [alert_message,setAlertMessage] = useState("");

    function sign_up(ev:FormEvent){
        ev.preventDefault();
        if(password === confirm_password){
            axios.post("/api/user/sign_up",{ username, email, password }).then(response => {
                if(response.data.status == "success"){
                    setAlertMessage("Sign up success!");
                    setTimeout(() => {
                        window.location.href = "/user/sign_in";
                    }, 500);
                }else{
                    setAlertMessage("Error: "+response.data.message);
                    console.log(response.data);
                }
            }).catch(err => {
                // FIXME: hanlde the errors.
                console.log({ err });    
            });
        }else{
            // TODO: show a error message.
            console.log("password not match!");
        }
    }

    return(
        <div className="w-full h-screen background_image bg-black">
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-black via-gray-900/40 to-gray-900">
                <a href="/" className="absolute top-2 left-2 flex flex-row items-center mb-16 py-2 px-4 rounded-lg bg-black/40">
                    <div className="text-3xl text-white font-bold">Next</div>
                    <div className="text-white text-center border-4 border-white rounded-full p-2 mx-2"><FaPlay /></div>
                    <div className="text-3xl text-white font-bold">Tv</div>
                </a>
                <form onSubmit={sign_up} className="w-1/3 flex flex-col items-center bg-gray-900/80 rounded-lg py-12">
                    <div className="text-gray-200 mb-8 flex flex-col items-center">
                        <FaRegUserCircle className="text-5xl" />
                        <div className="text-base pt-2">Create new account</div>
                    </div>
                    <input type="text" className="w-3/4 text-base px-6 py-2 my-2 rounded-lg bg-gray-700/60 text-gray-200" placeholder="Username" onChange={(ev) => setUsername(ev.target.value)} value={username} />
                    <input type="email" className="w-3/4 text-base px-6 py-2 my-2 rounded-lg bg-gray-700/60 text-gray-200" placeholder="Email" onChange={(ev) => setEmail(ev.target.value)} value={email} />
                    <input type="password" className="w-3/4 text-base px-6 py-2 my-2 rounded-lg bg-gray-700/60 text-gray-200" placeholder="Password" onChange={(ev) => setPassword(ev.target.value)} value={password} />
                    <input type="password" className="w-3/4 text-base px-6 py-2 my-2 rounded-lg bg-gray-700/60 text-gray-200" placeholder="Confirm Password" onChange={(ev) => setConfirPassword(ev.target.value)} value={confirm_password} />
                    <input type="submit" className="text-gray-200 text-xs font-semibold px-12 py-2 mt-8 rounded-lg bg-blue-800 cursor-pointer hover:bg-blue-600" value={"Sign Up"} />
                    <div className="flex flex-row items-center mt-4">
                        <div className="text-white text-xs">{"Already have an account ?"}</div>
                        <a href="/user/sign_in" className="ml-2 text-blue-400 hover:text-blue-400 text-xs font-normal cursor-pointer">Sign in</a>
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