import {Post} from './postType'
import {Comment} from './commentType'

export interface User  {
    id: number | null;
    name: string;
    surname: string;
    city: string;
    age: number;
    role: 'user' | 'moderator' | 'admin';
    comment: Comment[];
    post: Post[];
    avatar: string;
}