import supabase from "../supabaseClient";
import {User} from "../types/userType";


class UserService {

    getUser = async (): Promise<User | null> => {
        let {data} = await supabase.from('users').select('*').limit(1);
        return data?.[0] || null;
    }
}

export default new UserService();