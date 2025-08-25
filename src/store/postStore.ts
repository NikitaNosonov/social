import {action, makeAutoObservable, runInAction} from "mobx";
import {Post} from "../types/postType";
import PostService from "../services/postService";

class PostStore {
    public posts: Post[] = [];
    public postById?: Post;

    constructor() {
        makeAutoObservable(this);
    }

    getPosts = action(async () => {
        const data = await PostService.getPosts();

        runInAction(() => {
            this.posts = data || []
        })
    });

    getPostById = action(async (id: number | null) => {
        const data = await PostService.getPostById(id);

        runInAction(() => {
            this.postById = data || null;
        })
    })
}

export default new PostStore();