import {action, makeAutoObservable, runInAction} from "mobx";
import {Comment} from "../types/commentType";
import CommentService from "../services/commentService";

class CommentStore {
    public comments: Comment[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    getComments = action(async (postId: number | null) => {
        const data = await CommentService.getCommentByPostId(postId);

        runInAction(() => {
            this.comments = data || []
        })
    });

    addComments = action(async (comment: Comment) => {
        const data = await CommentService.addComment(comment);

        runInAction(() => {
            this.comments.push(data)
        })
    })
}

export default new CommentStore();