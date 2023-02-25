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

export interface c_image {
    
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