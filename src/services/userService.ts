import supabase from "../supabaseClient";
import {User} from "../types/userType";
import nonAvatar from "../нетфото.jpg"
import {Post} from "../types/postType";

class UserService {

    getUserById = async () => {
        try {
            const session = await supabase.auth.getSession()
            let {data} = await supabase
                .from('users')
                .select('*')
                .eq('user_id', session.data.session?.user.id)
                .single()
            return data;
        } catch (error) {
            console.error("Error fetching get user by id.", error)
            return null;
        }
    }

    getUsers = async () => {
        try {
            const {data} = await supabase
                .from('users')
                .select('*')
            return data;
        } catch (error) {
            console.error("Error fetching get users.", error);
            return null;
        }
    }

    getUsersByPagination = async (page: number, pageSize: number) => {
        try {
            console.log(pageSize)
            let {data} = await supabase
                .from('users')
                .select('*')
                .order('id', { ascending: false })
                .limit(pageSize)
                .range((page - 1), pageSize)
            return data;
        } catch (error) {
            console.error("Error fetching get users.", error);
            return null;
        }
    }

    addUser = async (user: Partial<User>) => {
        try {
            await supabase
                .from('users')
                .insert([user])
                .select();
        } catch (error) {
            console.error("Error fetching add user.", error);
            return null;
        }
    }

    editUser = async (user: Partial<User>) => {
        try {
            console.log(user)
            const {data, error, status, count} = await supabase
                .from('users')
                .update({
                    name: user?.name,
                    surname: user?.surname,
                    city: user?.city,
                    avatar: user?.avatar || nonAvatar,
                    role: user?.role,
                    unlocked: user?.unlocked,
                })
                .eq('id', user?.id)
                .select()
                .limit(1)
            return data ;
        } catch (error) {
            console.error("Error fetching edit user by id.", error);
            return null
        }
    }
}

export default new UserService();