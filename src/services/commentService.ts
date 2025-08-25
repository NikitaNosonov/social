import supabase from "../supabaseClient";
import {Comment} from "../types/commentType";

class CommentService {

    getCommentByPostId = async (postId: number | null) => {
        let {data} = await supabase
            .from('comments')
            .select('*')
            .eq('post_id', postId)
        return data || [];
    }

    addComment = async (comment: Comment) => {
        const {data} = await supabase
            .from('comments')
            .insert([comment])
            .select()
            .single();
        return data;
    }
}

export default new CommentService();