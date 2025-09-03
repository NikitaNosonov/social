import supabase from "../supabaseClient";
import {Post} from "../types/postType";

class PostService {
    getPosts = async () => {
        try {
            let {data} = await supabase
                .from('posts')
                .select('*')
                .order('id', { ascending: false })
            return data;
        } catch (error) {
            console.error("Error fetching get posts.", error);
            return null;
        }
    }

    getPostsByMainPage = async (page: number, pageSize: number) => {
        try {
            console.log(pageSize)
            let {data} = await supabase
                .from('posts')
                .select('*')
                .order('id', { ascending: false })
                .limit(pageSize)
                .range((page - 1), pageSize)
            return data;
        } catch (error) {
            console.error("Error fetching get posts.", error);
            return null;
        }
    }

    getPostById = async (id: number | null) => {
        try {
            let {data} = await supabase
                .from('posts')
                .select('*')
                .eq('id', id)
                .single();
            return data;
        } catch (error) {
            console.error("Error fetching get post by id.", error);
            return null;
        }
    }

    searchPost = async (search: string) => {
        try {
            const {data} = await supabase
                .from('posts')
                .select('*')
                .ilike('description', `%${search}%`)
                .limit(50);
            console.log(data)
            return data;
        } catch (error) {
            console.error("Error searching.", error);
            return null;
        }
    }

    addPost = async (post: Post) => {
        try {
            await supabase
                .from('posts')
                .insert([post])
                .select();
        } catch (error) {
            console.error("Error fetching add post.", error);
            return null;
        }
    }

    deletePost = async (postId: number | null) => {
        try {
            await supabase
                .from('posts')
                .delete()
                .eq('id', postId)
        } catch (error) {
            console.error("Error fetching delete post by id.", error);
            return null;
        }
    }

    editPost = async (post: Post | null) => {
        try {
            const {data} = await supabase
                .from('posts')
                .update({
                    photo: post?.photo,
                    description: post?.description
                })
                .eq('id', post?.id);

            return data;
        } catch (error) {
            console.error('Error fetching edit post by id', error);
            return null;
        }
    }
}

export default new PostService();