import supabase from "../supabaseClient";
import {User} from "../types/userType";
import nonAvatar from "../нетфото.jpg"

class UserService {

    getUserById = async (id: number | null) => {
        const dat = supabase.auth.signInWithPassword({email: 'nikitanosonov93@gmail.com', password: '111111'});
        console.log('dsadasd', dat);
        const { data: { session } } = await supabase.auth.getSession();
        console.log('session', session);
        let {data} = await supabase
            .from('users')
            .select('*')
            .eq('id', id)
            .single()

        return data;
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