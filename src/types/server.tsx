import { c_server, c_user } from "./client";

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

export interface s_episode {
    _id: string,
    serie: s_ref,
    title: string,
    description: string,
    date: string,
    duration: string,
    cover_image: s_image,
    servers: s_ref[],
};

export interface s_serie {
    _id: string,
    title: string,
    description: string,
    date: string,
    duration: string,
    cover_image: s_image,
    categories: s_ref[],
};

export interface s_view {
    video: s_ref,
    user: s_ref,
    ip_address: string
};

export interface s_category {
    name: string,
};

export interface s_views {
    user: s_ref,
    video: s_ref,
    ip_address: string,
};

export interface s_users {
    total_users: string,
    users: c_user[]
};
