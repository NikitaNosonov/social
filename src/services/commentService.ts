import supabase from "../supabaseClient";
import {Comment} from "../types/commentType";

class CommentService {

    getCommentByPostId = async (postId: number | null) => {
        let {data} = await supabase
            .from('comments')
            .select('*')
            .eq('post_id', postId)
        console.log(data)
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

    deleteComment = async (commentId: number | null) => {
        const {data} = await supabase
            .from('comments')
            .delete()
            .eq('id', commentId)
    }
}

export default new CommentService();