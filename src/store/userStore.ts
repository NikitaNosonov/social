import {action, makeAutoObservable, observable, runInAction} from "mobx";
import {User} from "../types/userType";
import UserService from "../services/userService";
import supabase from "../supabaseClient";

class UserStore {
    private _user: Partial<User> = {};
    private _allUsers: User[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    get allUsers() {
        return this._allUsers;
    }

    get user(): Partial<User> {
        return this._user;
    }

    setUser(user: Partial<User>) {
        UserService.editUser(user).then(() => this._user = user);
    }

    async getUserById() {
        const data = await UserService.getUserById();

        runInAction(() => {
            this._user = data || null;
            localStorage.setItem('userId', String(this._user.id))
            localStorage.setItem('userRole', String(this._user.role))
            localStorage.setItem('unlockedAccount', String(this._user.unlocked))
        })
    };

    async getUsers() {
        const data = await UserService.getUsers();

        runInAction(() => {
            this._allUsers = data || [];
        })
    }
}

export default new UserStore();