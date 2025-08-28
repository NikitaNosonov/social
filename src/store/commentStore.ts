import {action, makeAutoObservable, runInAction} from "mobx";
import {Comment} from "../types/commentType";
import CommentService from "../services/commentService";
import PostService from "../services/postService";

class CommentStore {
    private _comments: Comment[] = [];

    constructor() {
        makeAutoObservable(this, {
            setComments: action
        });
    }

    get comments(): Comment[] {
        return this._comments
    }

    getComments = action(async (postId: number | null) => {
        const data = await CommentService.getCommentByPostId(postId);

        runInAction(() => {
            this._comments = data || []
            return this._comments
        })
    });

    setComments = action(async (comment: Comment) => {
        const data = await CommentService.addComment(comment);

        runInAction(() => {
            this.comments.push(data)
            return this._comments
        })
    })

    deleteComment = action(async (commentId: number | null) => {
        await CommentService.deleteComment(commentId);
        const updateComments = this.comments.filter(p => p.id !== commentId);

        runInAction(() => {
            this._comments = updateComments;
            console.log(this._comments);
            return this._comments
        })
    })
}

export default new CommentStore();