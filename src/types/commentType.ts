import {User} from "./userType";
import {Post} from "./postType";

export interface Comment {
    id?: number | null;
    text: string;
    user_id: number | null;
    post_id: number | null;
}