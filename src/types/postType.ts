import {User} from './userType'
import {Comment} from './commentType';

export interface Post {
    id: number | null;
    photo: string;
    description: string;
    user_id : number | null;
}