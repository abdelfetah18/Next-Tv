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

export interface c_asset {
    _id: string,
    url: string,
    originalFilename: string
};

export interface c_movie {
    _id: string,
    title: string,
    description: string,
    cover_image: c_asset,
    categories: c_category[],
    servers: c_server[],
    duration: string,
    date: string,
};

export interface c_episode {
    _id: string,
    serie: string,
    title: string,
    description: string,
    date: string,
    duration: string,
    cover_image: c_asset,
    servers: c_server[],
};

export interface c_serie {
    _id: string,
    title: string,
    description: string,
    date: string,
    duration: string,
    cover_image: c_asset,
    episodes: c_episode[],
    categories: c_category[],
    total_episodes: number
};


// FIXME: do the reverse insted of extending from c_serie and c_movie
// make them extends from c_latest and also find a better name for that type
export interface c_latest extends c_serie, c_movie {
    _type: string
}

// FIXME: do the reverse insted of extending from c_movie and c_episode make them extends from c_video.
export interface c_video extends c_movie, c_episode { };