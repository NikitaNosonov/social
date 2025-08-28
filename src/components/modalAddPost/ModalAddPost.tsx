import React from 'react';
import {Button} from "@mui/material";
import * as S from "./ModalAddPost.style"
import {Post} from "../../types/postType";
import PostStore from "../../store/postStore";
import PostService from "../../services/postService";
import {observer} from "mobx-react-lite";

interface ModalAddPostProps {
    setModalAddPost?: (value: (((prevState: boolean) => boolean) | boolean)) => void,
}

const ModalAddPost: React.FC<ModalAddPostProps> = observer(({setModalAddPost}) => {
    const [post, setPost] = React.useState<Post>({
        id: PostStore.posts.length + 1,
        description: "",
        photo: "",
        user_id: 1
    });

    const [isAddPhoto, setIsAddPhoto] = React.useState<boolean>(false)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = _handleReaderLoaded;
            reader.readAsBinaryString(file);
        }
    };

    const _handleReaderLoaded = (e: ProgressEvent<FileReader>) => {
        const binaryString = e.target?.result;
        if (post && setPost) {
            setPost({...post, photo: "data:image;base64," + btoa(binaryString as string)});
        }
    };

    const addPost = () => {
        if (setModalAddPost) {
            setModalAddPost(false);
        }
        PostStore.setPosts(post)
    }

    return (
        <div>
            <S.Input
                minRows={3}
                maxRows={6}
                value={post.description}
                type="text"
                placeholder="Описание"
                onChange={e => setPost({...post, description: e.target.value})}
            />
            <S.ButtonContainer>
                {!isAddPhoto ?
                    <Button variant="contained" color="primary" type="submit" size="small"
                            onClick={() => setIsAddPhoto(true)}>Добавить фото</Button> : <input
                        type="file"
                        name="image"
                        id="file"
                        accept=".jpg, .jpeg, .png"
                        onChange={e => onChange(e)}
                    />}
                <Button variant="contained" color="primary" type="submit" size="small" onClick={() => addPost()}>
                    Добавить пост
                </Button>
            </S.ButtonContainer>
        </div>
    );
});

export default ModalAddPost;