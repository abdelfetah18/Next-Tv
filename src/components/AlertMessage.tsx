import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

interface Props {
    message: string,
};

export function alert_msg(message:string){
    
}

export default function AlertMessage({ message }:Props){
    const fadeInOut = useAnimation();

    useEffect(() => {
        fadeInOut.start({
            display: "flex",
            opacity: 1,
            transition: { duration: 0.5 }
        }).then(r => {
            setTimeout(() => {
                fadeInOut.start({
                    opacity: 0,
                    transition: { duration: 0.5 }
                }).then(r => {
                    fadeInOut.set({ display: "none" });
                }).catch(err => {
                    // FIXME: error handler.
                });
            },500);
        }).catch(err => {
            // FIXME: error handler.
        });
    },[message]);

    return(
        <motion.div animate={fadeInOut} className="absolute top-0 left-0 hidden opacity-0 w-full flex-col items-center">
            <div className="bg-gray-900/60 text-sm text-white font-bold px-16 py-2 rounded-lg my-8">{message}</div>
        </motion.div>
    )
}