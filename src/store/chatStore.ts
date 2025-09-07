import {action, makeAutoObservable, runInAction} from "mobx";
import {Comment} from "../types/commentType";
import CommentService from "../services/commentService";
import {Chat} from "../types/chatType";
import ChatService from "../services/chatService";
import PostService from "../services/postService";

class ChatStore {
    private _chats: Chat[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    get chats(): Chat[] {
        return this._chats
    }

    async getChats (id: number) {
        const data = await ChatService.getChats(id);

        runInAction(() => {
            this._chats = data || []
        })
    };

}

export default new ChatStore();