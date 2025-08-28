import supabase from "../supabaseClient";
import {Post} from "../types/postType";
import {User} from "../types/userType";
import nonAvatar from "../нетфото.jpg";


class PostService {
    getPosts = async () => {
        let {data} = await supabase
            .from('posts')
            .select('*');
        return data;
    }

    getPostById = async (id: number | null) => {
        let {data} = await supabase
            .from('posts')
            .select('*')
            .eq('id', id)
            .single();
        return data;
    }

    addPost = async (post: Post) => {
        const {data} = await supabase
            .from('posts')
            .insert([post])
            .select();
        console.log(data);
    }

    deletePost = async (postId: number | null) => {
        const {data} = await supabase
            .from('posts')
            .delete()
            .eq('id', postId)
    }

    editPost = async (post: Post | null) => {
        const {data} = await supabase
            .from('posts')
            .update({
                photo: post?.photo,
                description: post?.description
            })
            .eq('id', post?.id);

        return data;
    }
}

export default new PostService();