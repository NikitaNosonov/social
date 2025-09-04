import React, {useState} from 'react';
import {Button} from "@mui/material";
import * as S from "./ModalAddPost.style"
import {Post} from "../../types/postType";
import PostStore from "../../store/postStore";
import PostService from "../../services/postService";
import {observer} from "mobx-react-lite";
import InputError from "../inputError/InputError";
import DragAndDrop from "../dragAndDrop/DragAndDrop";

interface ModalAddPostProps {
    setModalAddPost?: (value: (((prevState: boolean) => boolean) | boolean)) => void,
    setRefresh?: (value: (((prevState: number) => number) | number)) => void
}

const ModalAddPost: React.FC<ModalAddPostProps> = observer(({setModalAddPost, setRefresh}) => {
    const [post, setPost] = useState<Post>({
        id: Date.now(),
        description: "",
        photo: "",
        user_id: Number(localStorage.getItem("userId")),
    });

    const [isAddPhoto, setIsAddPhoto] = useState<boolean>(false)
    const [errorSt, setErrorSt] = useState<boolean>(false)

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

    const addPost = async () => {
        if (post.description === '') {
            setErrorSt(true);
        }
        else {
            setErrorSt(false);
            if (setModalAddPost) {
                setModalAddPost(false);
            }
            await PostStore.setPosts(post)
            if (setRefresh) {
                setRefresh(prev => prev + 1)
            }
        }
    }

    return (
        <div>
            <InputError errorSt={errorSt}><S.Input
                minRows={3}
                maxRows={6}
                value={post.description}
                type="text"
                placeholder="Описание"
                onChange={e => setPost({...post, description: e.target.value})}
            /></InputError>
            <S.ButtonContainer>
                {!isAddPhoto ?
                    <Button variant="contained" color="primary" type="submit" size="small"
                            onClick={() => setIsAddPhoto(true)}>Добавить фото</Button> :
                    <DragAndDrop post={post} setPost={setPost}/>}
                <Button variant="contained" color="primary" type="submit" size="small" onClick={() => addPost()}>
                    Добавить пост
                </Button>
            </S.ButtonContainer>
        </div>
    );
});

export default ModalAddPost;