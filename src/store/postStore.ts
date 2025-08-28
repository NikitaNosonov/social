import {action, makeAutoObservable, runInAction} from "mobx";
import {Post} from "../types/postType";
import PostService from "../services/postService";

class PostStore {
    private _posts: Post[] = [];
    private _postById: Post | null = null;

    constructor() {
        makeAutoObservable(this, {
            setPosts: action,
            setPostById: action
        });
    }

    get posts(): Post[] {
        return this._posts;
    }

    get postById(): Post | null{
        return this._postById;
    }

    setPosts = action((post: Post) => {
        PostService.addPost(post);
        this._posts = [...this._posts, post]
    })

    setPostById = action((post: Post) => {
        PostService.editPost(post);
        const postIndex = this._posts.findIndex(p => p.id === post.id);

        if (postIndex !== -1) {
            this._posts = [
                ...this._posts.slice(0, postIndex),
                post,
                ...this._posts.slice(postIndex + 1)
            ];
        }    })

    getPosts = action(async () => {
        const data = await PostService.getPosts();

        runInAction(() => {
            this._posts = data || [];
        })
    });

    getPostById = action(async (id: number | null) => {
        const data = await PostService.getPostById(id);

        runInAction(() => {
            this._postById = data || null;
        })
    })

    deletePostById = action(async (id: number | null) => {
        await PostService.deletePost(id);
        const postIndex = this._posts.findIndex(p => p.id === id);

        runInAction(() => {
            this._posts.splice(postIndex, 1);
            return this._posts
        })
    })
}

export default new PostStore();