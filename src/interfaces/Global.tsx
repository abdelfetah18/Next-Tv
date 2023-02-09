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

