import supabase from "../supabaseClient";
import {Chat} from "../types/chatType";

class ChatService {

    getChats = async (id: number) => {
        try {
            let {data} = await supabase
                .from('chats')
                .select('*')
                .or(`sender_user_id.eq.${id},recipient_user_id.eq.${id}`);
            if (data && data.length > 0) {
                return data || [];
            }
            return []
        } catch (error) {
            console.error("Error fetching get chats.", error);
            return null;
        }
    }

}

export default new ChatService();