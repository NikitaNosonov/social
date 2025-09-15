import React, {useState} from 'react';
import {Button} from "@mui/material";
import * as S from "./ModalAddPost.style"
import * as ProfileItemStl from "../../pages/profile/profileItem/ProfileItem.style"
import {Post} from "../../types/postType";
import PostStore from "../../store/postStore";
import {observer} from "mobx-react-lite";
import InputError from "../inputError/InputError";
import DragAndDrop from "../dragAndDrop/DragAndDrop";
import UserStore from "../../store/userStore";

interface ModalAddPostProps {
    setModalAddPost?: (value: (((prevState: boolean) => boolean) | boolean)) => void,
    setRefresh?: (value: (((prevState: number) => number) | number)) => void,
    setLoading?: (value: (((prevState: boolean) => boolean) | boolean)) => void
}

const ModalAddPost: React.FC<ModalAddPostProps> = observer(({setModalAddPost, setRefresh, setLoading}) => {
    const [post, setPost] = useState<Post>({
        id: Date.now(),
        description: "",
        photo: "",
        user_id: UserStore.user.id || 0,
    });

    const [errorSt, setErrorSt] = useState(false)

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
        } else {
            try {
                if (setLoading) {
                    setLoading(true)
                }
                if (setModalAddPost) {
                    setModalAddPost(false);
                }
                await PostStore.setPosts(post)
            } catch (e) {
                console.error(e);
            } finally {
                await PostStore.getPosts(1, 4)
                if (setLoading) {
                    setLoading(false)
                }
                if (setRefresh) {
                    setRefresh(prev => prev + 1)
                }
            }
        }
    }

    return (
        <div>
            <S.DragContainer>
                <DragAndDrop post={post} setPost={setPost}/>
            </S.DragContainer>
            <S.ButtonContainer>
                <InputError errorSt={errorSt}><S.Input
                    minRows={3}
                    maxRows={6}
                    value={post.description}
                    type="text"
                    placeholder="Расскажите что-нибудь..."
                    onChange={e => {
                        setErrorSt(false);
                        setPost({...post, description: e.target.value})
                    }}
                /></InputError>
                <ProfileItemStl.ProfileItemButton style={{height: '7vh', marginInline: '0px'}}
                                                  onClick={() => addPost()}>
                    Добавить пост
                </ProfileItemStl.ProfileItemButton>
            </S.ButtonContainer>
        </div>
    );
});

export default ModalAddPost;