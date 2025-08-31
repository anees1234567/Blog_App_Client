import { userType } from "../auth/type";

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