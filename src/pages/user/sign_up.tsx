import AlertMessage from "@/components/AlertMessage";
import axios from "axios";
import { FormEvent, useState } from "react";
import { FaFacebook, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";

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
                <div className="text-3xl text-white font-mono font-bold py-2 my-2">Sign Up</div>
                <form onSubmit={sign_up} className="w-1/3 flex flex-col items-center bg-gray-900/80 rounded-lg py-12 mt-4">
                    <input type="text" className="w-3/4 text-sm px-4 py-1 my-2 rounded-lg" placeholder="username" onChange={(ev) => setUsername(ev.target.value)} value={username} />
                    <input type="email" className="w-3/4 text-sm px-4 py-1 my-2 rounded-lg" placeholder="email" onChange={(ev) => setEmail(ev.target.value)} value={email} />
                    <input type="password" className="w-3/4 text-sm px-4 py-1 my-2 rounded-lg" placeholder="password" onChange={(ev) => setPassword(ev.target.value)} value={password} />
                    <input type="password" className="w-3/4 text-sm px-4 py-1 my-2 rounded-lg" placeholder="confirm password" onChange={(ev) => setConfirPassword(ev.target.value)} value={confirm_password} />
                    <input type="submit" className="text-white text-sm font-bold px-8 py-1 my-2 rounded-full bg-blue-500 cursor-pointer hover:bg-blue-600" value={"Sign Up"} />
                </form>
                <div className="w-1/3 flex flex-col items-center mb-16">
                    <div className="text-white text-base font-bold my-4">Or</div>
                    <a href="/user/sign_in" className="text-blue-500 hover:text-blue-400 text-sm font-medium cursor-pointer">Already have an account</a>
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
            <AlertMessage message={alert_message} />
        </div>
    )
}