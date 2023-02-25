import { c_server } from "./client";

export interface s_ref {
    _type: string,
    _ref: string,
    _key: string
};

export interface s_server {
    name: string,
    url: string,
    date: string
};

export interface s_image {
    _type: string,
    asset: s_ref
};

export interface s_movie {
    _id: string,
    title: string,
    description: string,
    servers: s_ref[],
    categories: s_ref[]
    cover_image: s_image,
    duration: string,
    date: string
};