

export type saveBlogType = {
    title: string;
    content: string;
    authorId: string;
    id?: string;
}

export type BlogType = {
    _id: string;
    title: string;
    content: string;
    author:Author;
    createdAt: string;
    updatedAt: string;
    edit?:boolean
}
export type BlogPost= {
  _id: string;
  title: string;
  content: string;
  author: Author;
  createdAt: string;
  updatedAt: string;
}

export type Author= {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
}
export type CommentTypeList = {
    _id: string;
    content: string;
    poster: {
        _id: string;
        name: string;
        avatar?: string | undefined;
    };
    createdAt: string;
}