import crypto from "crypto";
import createClient from '@sanity/client';
import { createReadStream } from "fs";
import { basename } from "path";
import { c_movie, c_server, c_user, c_user_credentials } from "@/types/client";
import { s_movie } from "@/types/server";

class Client {
    client:any = null;
    constructor(){
        this.client = createClient({
            projectId: 'jp14vvjt',
            dataset: 'production',
            useCdn: false, // set to `true` to fetch from edge cache
            apiVersion: '2022-01-12', // use current date (YYYY-MM-DD) to target the latest API version
            token: process.env.SANITY_SECRET_TOKEN // Only if you want to update content with the client
        });
    }

    async SignIn(user:c_user_credentials){
        let hash = crypto.createHash("sha512");
        hash.update(user.password);
        let hashed_password = hash.digest("hex");
        let _user = await this.client.fetch('*[_type=="users" && username==$username && password==$hashed_password]{ _id,username,profile_image,email }',{ username: user.username, hashed_password });
        if(_user.length > 0){
            let session_id = crypto.randomUUID();
            await this.client.create({
                _type: "session",
                user: { _ref: _user[0]._id },
                session_id: session_id
            });
            return _user[0];
        }else{
            return null;
        }
    }

    async SignUp(user:c_user){
        let hash = crypto.createHash("sha512");
        hash.update(user.password);
        let hashed_password = hash.digest("hex");
        return await this.client.create({
            _type: "users",
            username: user.username,
            email: user.email,
            password: hashed_password
        });
    }

    async SignOut(session_id:string){
        return await this.client.delete({ query: '*[_type=="session" && session_id==$session_id]', params:{ session_id } });
    }

    async getUser(session_id:string){
        let session = await this.client.fetch('*[_type=="session" && session_id==$session_id]',{ session_id });
        if(session.length > 0){
            let user = await this.client.fetch('*[_type=="users" && _id==$user_id]{ _id,username,profile_image,email }',{ user_id: session[0].user._ref });
            return user[0] || null;
        }else{
            return null;
        }
    }

    async getLatestMovies(){
        return await this.client.fetch('*[_type=="movie"][1..9]');
    }

    async getMovieById(movie_id:string){
        let movie = await this.client.fetch('*[_type=="movie" && _id==$movie_id]',{ movie_id });
        return movie || null;
    }

    async getLatestSeries(){
        return await this.client.fetch('*[_type=="serie"][1..9]');
    }

    async getSerieById(movie_id:string){
        let serie = await this.client.fetch('*[_type=="serie" && _id==$movie_id]',{ movie_id });
        return serie || null;
    }

    async initMovieDoc(){
        let movie_doc:any = await this.client.create({ _type: "movie", _id: "drafts." });
        return movie_doc;
    }

    async createServer(server:c_server){
        let server_doc = await this.client.create({ _type: "server", name: server.name, url: server.url });
        return server_doc;
    }

    async updateMovie(movie:s_movie){
        // publish the document by changing the _id from drafts._id to _id.
        let doc:s_movie = { 
            _id: movie._id && movie._id.startsWith("drafts.") ? movie._id.slice(7) : movie._id,
            title: movie.title,
            description: movie.description,
            servers: movie.servers,
            categories: movie.categories,
            cover_image: movie.cover_image,
            date: (new Date()).toLocaleString(),
            duration: movie.duration,
        };

        let movie_r = await this.client.createOrReplace({ ...doc, _type: "movie" });
        
        // removing the draft
        await this.client.delete(movie._id);
        
        return movie_r || null;
    }

    async upload_image(file_path:string){
        let imageAsset = await this.client.assets.upload('image', createReadStream(file_path), { filename: basename(file_path) });
        return imageAsset;
    }
}

const client = new Client();

export default client;