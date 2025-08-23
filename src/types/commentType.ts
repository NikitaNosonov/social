import {User} from "./userType";
import {Post} from "./postType";

export interface Comment {
    id: number;
    text: string;
    user_id: User;
    post_id: Post;
}