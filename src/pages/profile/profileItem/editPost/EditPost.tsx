import React, {useState} from 'react';
import * as S from './EditPost.style'
import {Post} from "../../../../types/postType";
import {Button} from "@mui/material";
import PostStore from "../../../../store/postStore";

interface EditPostProps {
    editedPost?: Post,
    setIsEditPost?: (value: (((prevState: boolean) => boolean) | boolean)) => void,
    setEditedPost?: (value: (((prevState: (Post | undefined)) => (Post | undefined)) | Post | undefined)) => void
}

const EditPost: React.FC<EditPostProps> = ({editedPost, setIsEditPost, setEditedPost}) => {
    const [isEditPhoto, setIsEditPhoto] = useState(false);

    const editPhoto = () => {
        setIsEditPhoto(true);
    }

    const editPost = () => {
        if (editedPost) {
            PostStore.setPostById(editedPost)
        }
        if (setIsEditPost) {
            setIsEditPost(false)
        }
    }

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
        if (editedPost && setEditedPost) {
            setEditedPost({...editedPost, photo: "data:image;base64," + btoa(binaryString as string)});
        }
    };

    return (
        <div style={{display: "flex", justifyContent: "center", flexDirection: "column"}}>
            <S.ProfileItemPhoto src={editedPost?.photo}/>
            <S.Input
                multiline
                minRows={3}
                maxRows={6}
                value={editedPost?.description}
                type="text"
                placeholder="Описание"
                onChange={e => setEditedPost ? setEditedPost(editedPost ? {
                    ...editedPost,
                    description: e.target.value
                } : undefined) : null}/>
            <S.ButtonContainer>
                {!isEditPhoto ?
                    <Button variant="contained" color="primary" type="submit" size="small"
                            onClick={() => editPhoto()}>Изменить фото</Button> : <input
                        type="file"
                        name="image"
                        id="file"
                        accept=".jpg, .jpeg, .png"
                        onChange={e => onChange(e)}
                    />}
                <Button variant="contained" color="primary" type="submit" size="small"
                        onClick={() => editPost()}>Завершить редактирование</Button>
            </S.ButtonContainer>
        </div>
    );
};

export default EditPost;