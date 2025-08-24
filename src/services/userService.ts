import supabase from "../supabaseClient";
import {User} from "../types/userType";
import nonAvatar from "../нетфото.jpg"

class UserService {

    getUser = async (): Promise<User | null> => {
        let {data} = await supabase.from('users').select('*').limit(1);
        return data?.[0] || null;
    }

    editUser = async (user: User | null) => {
        const {data} = await supabase
            .from('users')
            .update({
                name: user?.name,
                surname: user?.surname,
                city: user?.city,
                age: user?.age,
                avatar: user?.avatar || nonAvatar,
            })
            .eq('id', user?.id);
    }
}

export default new UserService();