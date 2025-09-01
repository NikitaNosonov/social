import supabase from "../supabaseClient";
import {Comment} from "../types/commentType";

class CommentService {

    getCommentByPostId = async (postId: number | null) => {
        try {
            let {data} = await supabase
                .from('comments')
                .select('*')
                .eq('post_id', postId)
            return data || [];
        } catch (error) {
            console.error("Error fetching post by id.", error);
            return null;
        }
    }

    addComment = async (comment: Comment) => {
        try {
            const {data} = await supabase
                .from('comments')
                .insert([comment])
                .select()
                .single();
            return data;
        } catch (error) {
            console.error("Error fetching add comment", error);
            return null;
        }
    }

    deleteComment = async (commentId: number | null) => {
        try {
            await supabase
                .from('comments')
                .delete()
                .eq('id', commentId)
        } catch (error) {
            console.error("Error fetching delete comment by id.", error);
            return null;
        }
    }
}

export default new CommentService();