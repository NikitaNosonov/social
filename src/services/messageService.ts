import supabase from "../supabaseClient";
import {Message} from "../types/messageType";

class MessageService {
    addMessage = async (message: Message) => {
        try {
            const {data} = await supabase
                .from('messages')
                .insert([message])
                .select()
                .single();
            return data;
        } catch (error) {
            console.error("Error fetching add message", error);
            return null;
        }
    }

    getMessages = async (roomname: string) => {
        try {
            let {data} = await supabase
                .from('messages')
                .select('*')
                .eq('chatname', roomname)
                .order('created_at', { ascending: false })
            return data;
        } catch (error) {
            console.error("Error fetching get messages.", error);
            return null;
        }
    }
}

export default new MessageService();