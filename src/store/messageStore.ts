import {action, makeAutoObservable, runInAction} from "mobx";
import {Message} from "../types/messageType";
import MessageService from "../services/messageService";


class PostStore {
    private _message: Message[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    get messages(): Message[] {
        return this._message;
    }

    setMessages(message: Message) {
        MessageService.addMessage(message);
        this._message = [...this._message, message]
    }

    async getMessages(roomname: string) {
        const data = await MessageService.getMessages(roomname);

        runInAction(() => {
            this._message = data || [];
        })
    }
}

export default new PostStore();