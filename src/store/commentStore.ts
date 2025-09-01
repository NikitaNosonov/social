import {action, makeAutoObservable, runInAction} from "mobx";
import {Comment} from "../types/commentType";
import CommentService from "../services/commentService";

class CommentStore {
    private _comments: Comment[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    get comments(): Comment[] {
        return this._comments
    }

    async getComments(postId: number | null){
        const data = await CommentService.getCommentByPostId(postId);

        runInAction(() => {
            this._comments = data || []
            return this._comments
        })
    };

    async setComments(comment: Comment) {
        const data = await CommentService.addComment(comment);

        runInAction(() => {
            this.comments.push(data)
            return this._comments
        })
    }

    async deleteComment(commentId: number | null)  {
        await CommentService.deleteComment(commentId);
        const updateComments = this.comments.filter(p => p.id !== commentId);

        runInAction(() => {
            this._comments = updateComments;
            console.log(this._comments);
            return this._comments
        })
    }
}

export default new CommentStore();