import {action, makeAutoObservable, observable, runInAction} from "mobx";
import {User} from "../types/userType";
import UserService from "../services/userService";
import supabase from "../supabaseClient";

class UserStore {
    private _user: Partial<User> = {};
    private _allUsers: User[] = [];

    constructor() {
        makeAutoObservable(this, {
            setUser: action
        });
    }

    get allUsers() {
        return this._allUsers;
    }

    get user(): Partial<User> {
        return this._user;
    }

    setUser = action((user: Partial<User>) => {
        UserService.editUser(user);
        this._user = user;
    })

    getUserById = action(async () => {
        const data = await UserService.getUserById();

        runInAction(() => {
            this._user = data || null;
            localStorage.setItem('userId', String(this._user.id))
        })
    });

    getUsers = action(async () => {
        const data = await UserService.getUsers();

        runInAction(() => {
            this._allUsers = data || [];
        })
    })
}

export default new UserStore();