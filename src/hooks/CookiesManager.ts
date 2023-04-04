import { useEffect, useState } from "react";

interface cookie_options {
    Expires?: string,
    MaxAge?: string,
    Path?: string,
    Secure?: boolean,
};

interface cookie {
    name: string,
    value: string,
    options?: cookie_options
};

// TODO: implement a SameSite attribute.
export default function useCookies(){
    const [cookies,setCookies] = useState<cookie[]>([]);

    useEffect(() => {
        parseCookies();
    },[]);

    function parseCookies(){
        let cookies_data = document.cookie.match(/(\w+)=(\w+)/g);
        if(cookies_data){
            let cs:cookie[] = [];
            for(let c of cookies_data){
                let parsed_cookie = c.match(/(\w+)/g);
                if(parsed_cookie){
                    let [name,value] = parsed_cookie;
                    cs.push({ name, value });
                }
            }
            setCookies(cs);
        }
    }

    function getCookie(name:string){
        for(let i = 0; i < cookies.length; i++)
            if(cookies[i].name == name)
                return cookies[i];
        return null;
    }

    function setCookie(name:string, value:string, options:cookie_options){
        let result = "";
        result += name;
        result += "=";
        result += value;
        if(options){
            if(options.Path)
                result += "; Path="+options.Path;

            if(options.Secure)
                result += "; Secure";

            // NOTE: Date must be a GMT string (new Date()).toGMTString().
            if(options.Expires)
                result += "; Expires="+options.Expires;

            // NOTE: MaxAge is a timestamp string.
            if(options.MaxAge)
                result += "; Max-Age="+options.MaxAge;
        }

        document.cookie = result;
        
        setCookies(state => [...state,{ name, value, options }]);
    }

    function removeCookie(name:string){
        document.cookie = name+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=*;";
        setCookies(state => {
            let values:cookie[] = [];
            state.map(value => {
                if(value.name != name)
                    values.push(value);
            });
            return values;
        });
    }

    return { getCookie, setCookie, removeCookie };
}