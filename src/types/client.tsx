export interface c_user {
    username: string,
    password: string,
    email: string,

};

export interface c_user_credentials {
    username: string,
    password: string
};

export interface c_category {
    _id: string,
    name: string
};

export interface c_server {
    _id: string,
    name: string,
    url: string,
    date: string
};

export interface c_movie {
    _id: string,
    title: string,
    description: string,
    cover_image: string,
    categories: c_category[],
    servers: c_server[],
    duration: string,
    date: string,
};

export interface c_episode {
    _id: string,
    title: string,
    description: string,
    date: string,
    duration: string,
    cover_image: string,
    servers: c_server[],
};

export interface c_serie {
    _id: string,
    title: string,
    description: string,
    date: string,
    duration: string,
    cover_image: string,
    episodes: c_episode[],
    categories: c_category[],
};