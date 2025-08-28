import supabase from "../supabaseClient";
import {User} from "../types/userType";
import nonAvatar from "../нетфото.jpg"
import {Post} from "../types/postType";

class UserService {

    getUserById = async () => {
        const session = await supabase.auth.getSession()
        let {data} = await supabase
            .from('users')
            .select('*')
            .eq('user_id', session.data.session?.user.id)
            .single()
        return data;
    }

    getUsers = async () => {
        const {data} = await supabase
            .from('users')
            .select('*')
        return data;
    }

    addUser = async (user: Partial<User>) => {
        const {data} = await supabase
            .from('users')
            .insert([user])
            .select();
        console.log(data);
    }

    editUser = async (user: Partial<User>) => {
        console.log(user)
        const {data} = await supabase
            .from('users')
            .update({
                name: user?.name,
                surname: user?.surname,
                city: user?.city,
                avatar: user?.avatar || nonAvatar,
                role: user?.role,
                unlocked: user?.unlocked,
            })
            .eq('id', user?.id);

        return data;
    }
}

export default new UserService();