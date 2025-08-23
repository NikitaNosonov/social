import {action, makeAutoObservable, runInAction} from "mobx";
import {Post} from "../types/postType";
import PostService from "../services/postService";

class PostStore {
    public posts: Post[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    getPosts = action(async () => {
        const data = await PostService.getPosts();

        runInAction(() => {
            this.posts = data || []
        })
    });
}

export default new PostStore();