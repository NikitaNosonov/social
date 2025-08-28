import {Post} from './postType'
import {Comment} from './commentType'

export interface User  {
    id?: number | null;
    name: string;
    surname: string;
    city: string;
    role: 'user' | 'moderator' | 'admin';
    user_id: any;
    avatar: string;
    unlocked: boolean;
}