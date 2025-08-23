import supabase from "../supabaseClient";
import {Post} from "../types/postType";


class PostService {
    getPosts = async () => {
        let {data} = await supabase.from('posts').select('*');
        return data;
    }

    addPost = async (post: Post) => {
        const {data} = await supabase
            .from('posts')
            .insert([post])
            .select();
        console.log(data);
    }
}

export default new PostService();