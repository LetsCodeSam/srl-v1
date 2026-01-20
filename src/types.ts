export interface Video {
    title: string;
    url: string;
    description: string;
    duration: string;
    difficulty: string;
    learningPoints: string[];
}

export interface Category {
    name: string;
    videos: Video[];
}

export interface AppData {
    categories: Category[];
}
