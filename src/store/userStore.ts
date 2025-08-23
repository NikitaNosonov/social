import {action, makeAutoObservable, runInAction} from "mobx";
import {User} from "../types/userType";
import UserService from "../services/userService";

class UserStore {
    public user: User | undefined

    constructor() {
        makeAutoObservable(this);
    }

    getUser = action(async () => {
        const data = await UserService.getUser();

        runInAction(() => {
            this.user = data || undefined;
        })
    });
}

export default new UserStore();