import {action, makeAutoObservable, observable, runInAction} from "mobx";
import {User} from "../types/userType";
import UserService from "../services/userService";
import supabase from "../supabaseClient";

class UserStore {
    private _user: Partial<User> = {};
    private _allUsers: User[] = [];
    private _usersPage: User[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    get allUsers() {
        return this._allUsers;
    }

    get usersPage() {
        return this._usersPage;
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
            try {
                this._user = data || null;
            } catch (e) {
                console.error(e);
            } finally {
                if (data) {
                    sessionStorage.setItem('userId', String(this._user.id))
                    sessionStorage.setItem('userRole', String(this._user.role))
                    sessionStorage.setItem('unlockedAccount', String(this._user.unlocked))
                }
            }
        })
    };

    async getUsers() {
        const data = await UserService.getUsers();

        runInAction(() => {
            this._allUsers = data || [];
        })
    }

    async getUsersPage(page: number, pageSize: number) {
        const data = await UserService.getUsersByPagination(page, pageSize)

        runInAction(() => {
            this._usersPage = data || [];
        })
    }
}

export default new UserStore();