import crypto from "crypto";
import createClient from '@sanity/client';
import { createReadStream } from "fs";
import { basename } from "path";
import { c_movie, c_server, c_user, c_user_credentials } from "@/types/client";
import { s_category, s_episode, s_movie, s_serie, s_view } from "@/types/server";

import { SanityClient } from "@sanity/client";

const user_props = '{ _id, username, email, "cover_image": cover_image.asset-> }';
const movie_props = '{ _id, title, description, "cover_image": cover_image.asset->, categories[]->, servers[]->, duration, date, _createdAt, _type }';
const episode_props = '{ _id, "serie": serie._ref, title, description, "cover_image": cover_image.asset->, servers[]->, duration, date, _createdAt, _type }';
const serie_props = '{ _id, title, description, "cover_image": cover_image.asset->, categories[]->, "episodes":*[_type=="episode" && serie._ref==^._id]'+episode_props+', duration, date, _createdAt, _type }';
const category_props = '{ _id, name }';

// TODO: Add views property to movie and episode objects.

class Client {
    client:SanityClient;
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
            // FIXME: find a better way to generate session_id
            let session_id = crypto.randomUUID();
            let session = await this.client.create({
                _type: "session",
                user: { _type: "reference", _ref: _user[0]._id },
                session_id: session_id
            });

            return session;
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

    async Auth(session_id:string){
        let auth = await this.client.fetch('*[_type=="session" && session_id==$session_id]',{ session_id }); 
        return auth;
    }

    async getUser(session_id:string){
        let user = await this.client.fetch('*[_type=="session" && session_id==$session_id].user->'+user_props,{ session_id });
        if(user.length > 0){
            return user[0] || null;
        }
        return null;
    }
    
    async initMovieDoc(){
        let movie_doc:any = await this.client.create({ _type: "movie", _id: "drafts.", title:"", description:"", duration: "0h 0m", categories: [], servers: [] });
        return movie_doc;
    }
    
    async getMovieById(movie_id:string){
        let movie = await this.client.fetch('*[_type=="movie" && _id==$movie_id][0]'+movie_props,{ movie_id });
        return movie;
    }

    async getLatestMovies(){
        return await this.client.fetch('*[_type=="movie"][0..9]'+movie_props);
    }

    async getMovies(){
        return await this.client.fetch('*[_type=="movie" && !(_id in path("drafts.**"))][0..9]'+movie_props);
    }
    
    async updateMovie(movie:s_movie){
        let doc:s_movie = { 
            _id: movie._id,
            title: movie.title,
            description: movie.description,
            servers: movie.servers,
            categories: movie.categories,
            cover_image: movie.cover_image,
            date: "",
            duration: movie.duration,
        };

        let movie_r = await this.client.patch(doc._id).set({ ...doc }).commit();
        
        return movie_r;
    }

    async publishMovie(movie:s_movie){
        // publish the document by changing the _id from drafts._id to _id.
        let doc:s_movie = { 
            _id: movie._id && movie._id.startsWith("drafts.") ? movie._id.slice(7) : movie._id,
            title: movie.title,
            description: movie.description,
            servers: movie.servers,
            categories: movie.categories,
            cover_image: movie.cover_image,
            date: "",
            duration: movie.duration,
        };

        let movie_r = await this.client.createOrReplace({ ...doc, _type: "movie" });
        
        // removing the draft
        if(movie._id.startsWith("drafts."))
            await this.client.delete(movie._id);
        
        return movie_r;
    }


    async initSerieDoc(){
        let serie_doc:any = await this.client.create({ _type: "serie", _id: "drafts.", title:"", description:"", duration:"0h 0m", categories: [] });
        return serie_doc;
    }

    async getSerieById(serie_id:string){
        let serie = await this.client.fetch('*[_type=="serie" && _id==$serie_id][0]'+serie_props,{ serie_id });
        return serie;
    }

    async getSeries(){
        return await this.client.fetch('*[_type=="serie" && !(_id in path("drafts.**"))][0..9]'+serie_props);
    }

    async getLatestSeries(){
        return await this.client.fetch('*[_type=="serie"][0..9]'+serie_props);
    }

    async updateSerie(serie:s_serie){
        // publish the document by changing the _id from drafts._id to _id.
        let doc:s_serie = { 
            _id: serie._id && serie._id.startsWith("drafts.") ? serie._id.slice(7) : serie._id,
            title: serie.title,
            description: serie.description,
            categories: serie.categories,
            cover_image: serie.cover_image,
            date: (new Date()).toLocaleString(),
            duration: serie.duration,
        };

        let serie_r = await this.client.patch(serie._id).set({ ...doc }).commit();
        
        return serie_r;
    }

    async publishSerie(serie:s_serie){
        // publish the document by changing the _id from drafts._id to _id.
        let doc:s_serie = { 
            _id: serie._id && serie._id.startsWith("drafts.") ? serie._id.slice(7) : serie._id,
            title: serie.title,
            description: serie.description,
            categories: serie.categories,
            cover_image: serie.cover_image,
            date: (new Date()).toLocaleString(),
            duration: serie.duration,
        };

        let serie_r = await this.client.createOrReplace({ ...doc, _type: "serie" });
        
        // removing the draft
        if(serie._id.startsWith("drafts."))
            await this.client.delete(serie._id);
        
        return serie_r;
    }


    async initEpisodeDoc(serie_id:string){
        let episode_doc:any = await this.client.create({ _type: "episode", _id: "drafts.", serie:{ _type: "reference", _ref: serie_id } ,title:"", description:"", duration: "0h 0m", servers: [] });
        return episode_doc;
    }

    async getEpisodeById(serie_id:string){
        let serie = await this.client.fetch('*[_type=="episode" && _id==$serie_id][0]'+episode_props,{ serie_id });
        return serie;
    }

    async updateEpisode(episode:s_episode){
        // publish the document by changing the _id from drafts._id to _id.
        let doc:s_episode = { 
            _id: episode._id && episode._id.startsWith("drafts.") ? episode._id.slice(7) : episode._id,
            title: episode.title,
            serie: episode.serie,
            description: episode.description,
            cover_image: episode.cover_image,
            date: (new Date()).toLocaleString(),
            duration: episode.duration,
            servers: episode.servers
        };

        let episode_r = await this.client.createOrReplace({ ...doc, _type: "episode" });
        
        // removing the draft
        await this.client.delete(episode._id);
        
        return episode_r;
    }

    async createServer(server:c_server){
        let server_doc = await this.client.create({ _type: "server", name: server.name, url: server.url });
        return server_doc;
    }

    async upload_image(file_path:string){
        let imageAsset = await this.client.assets.upload('image', createReadStream(file_path), { filename: basename(file_path) });
        return imageAsset;
    }

    async getWatchLatest(){
        let watch_latest = await this.client.fetch('[...*[_type == "movie"]'+movie_props+',...*[_type == "serie"]'+serie_props+'] | order(_createdAt desc)');
        return watch_latest;
    }

    async getRecently(){
        let recent = await this.client.fetch('[...*[_type == "movie"]'+movie_props+',...*[_type == "serie"]'+serie_props+'] | order(_createdAt desc)[0..2]');
        return recent;
    }

    async createView(view:s_view){
        let r_view = await this.client.create({ _type:"views", video: view.video, user: view.user, ip_address: view.ip_address });
        return r_view;
    }

    async search(query:string){
        let result = await this.client.fetch('[...*[_type == "movie" && title match $query]'+movie_props+',...*[_type == "serie" && title match $query+"*"]'+serie_props+'] | order(_createdAt desc)',{ query });
        return result;
    }

    async getCategories(){
        let result = await this.client.fetch('*[_type == "category"]'+category_props);
        return result;
    }

    async createCategory(category:s_category){
        let category_doc = await this.client.create({ _type: "category", name: category.name });
        return category_doc;
    }

    async getByCategory(category:string){
        let result = await this.client.fetch('[...*[_type=="serie" && $category in categories[]->.name ]'+serie_props+',...*[_type=="movie" && $category in categories[]->.name ]'+movie_props+'] | order(_createdAt desc)',{ category });
        return result;
    }

    async getUsers(){
        let result = await this.client.fetch('{ "total_users": count(*[_type=="users"]), "users":*[_type=="users"]'+user_props+' }');
        return result;
    }

    async getViews(){
        let result = await this.client.fetch('count(*[_type=="views"])');
        return result;
    }

    async canView(user_id:string){
        let result = await this.client.fetch('*[_type=="views" && user._ref==$user_id]', { user_id });
        return result.length == 0;
    }

    async newView(view:s_view) {
        let result = await this.client.create({ _type:"views", ...view });
        return result;
    }

    // NOTE: Since we dont have a recommandation system, we will depend on views.
    async getPopularVideos(){
        // TODO: Group episodes by its series instead.
        let result = await this.client.fetch('[...*[_type=="movie" && (_id in *[_type=="views"].video._ref)]'+movie_props+',...*[_type=="episode" && (_id in *[_type=="views"].video._ref)]'+episode_props+'] | order(views desc)');
        return result;
    }    
}

const client = new Client();

export default client;