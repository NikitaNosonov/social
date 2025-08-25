import {action, makeAutoObservable, runInAction} from "mobx";
import {User} from "../types/userType";
import UserService from "../services/userService";
import supabase from "../supabaseClient";

class UserStore {
    public user?: User | null = null

    constructor() {
        makeAutoObservable(this);
    }

    getUserById = action(async (id: number | null) => {

        const data = await UserService.getUserById(id);

        runInAction(() => {
            this.user = data || null;
        })
    });
}

export default new UserStore();