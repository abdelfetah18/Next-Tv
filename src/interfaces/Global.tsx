export interface Server {
    url: string,
    name: string
};

export interface Thumb {
    src : string,
    alt : string
};
  
export interface Category {
    name: string
};

export interface Video {
    title : string,
    categories: Category[],
    description: string,
    thumbnail: Thumb,
    servers: Server[]
};

export interface Movie {
    title: string,
    description: string,
    date: Date,
    duration: string,
    cover_image: string,
    video: Video,
    rate: number,
    categories: Category[]
};

export interface UserCrendetials {
    username: string,
    password: string
};

export interface User {
    username: string,
    password: string,
    email: string
};