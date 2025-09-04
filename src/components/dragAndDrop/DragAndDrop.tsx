import React, {useRef, useState} from 'react';
import * as S from './DragAndDrop.style'
import {User} from "../../types/userType";
import {Post} from "../../types/postType";

interface DragAndDropProps {
    profileEdit?: Partial<User>,
    setProfileEdit?: (value: (((prevState: Partial<User>) => Partial<User>) | Partial<User>)) => void,
    editedPost?: Post | undefined,
    setEditedPost?: ((value: (((prevState: (Post | undefined)) => (Post | undefined)) | Post | undefined)) => void) | undefined,
    post?: Post,
    setPost?: (value: (((prevState: Post) => Post) | Post)) => void
}

const DragAndDrop: React.FC<DragAndDropProps> = ({
                                                     profileEdit,
                                                     setProfileEdit,
                                                     editedPost,
                                                     setEditedPost,
                                                     post,
                                                     setPost
                                                 }) => {
    const [isDrag, setIsDrag] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const dragStartHandler = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDrag(true);
    }

    const dragLeaveHandler = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDrag(false);
    }

    const onDragHundler = (e: React.DragEvent) => {
        e.preventDefault();
        let files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            const reader = new FileReader();

            reader.onload = (readerEvent) => {
                if (readerEvent.target?.result && profileEdit && setProfileEdit) {
                    setProfileEdit({
                        ...profileEdit,
                        avatar: readerEvent.target.result as string
                    });
                } else if (readerEvent.target?.result && editedPost && setEditedPost) {
                    setEditedPost({
                        ...editedPost,
                        photo: readerEvent.target.result as string
                    });
                } else if (readerEvent.target?.result && post && setPost) {
                    setPost({
                        ...post,
                        photo: readerEvent.target.result as string
                    })
                }
            };
            reader.readAsDataURL(file);
        }
        setIsDrag(false);
    }

    const handleClick = () => {
        fileInputRef.current?.click();
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
        if (profileEdit && setProfileEdit) {
            setProfileEdit({...profileEdit, avatar: "data:image;base64," + btoa(binaryString as string)});
        } else if (editedPost && setEditedPost) {
            setEditedPost({...editedPost, photo: "data:image;base64," + btoa(binaryString as string)});
        } else if (post && setPost) {
            setPost({...post, photo: "data:image;base64," + btoa(binaryString as string)});
        }
    };

    return (
        <S.DragAndDrop>
            <input
                type="file"
                ref={fileInputRef}
                onChange={onChange}
                style={{display: 'none'}}
                accept="image/*"
            />
            {isDrag ? <S.DragAndDropText onDragStart={e => dragStartHandler(e)}
                                         onDragLeave={e => dragLeaveHandler(e)}
                                         onDragOver={e => dragStartHandler(e)}
                                         onDrop={e => onDragHundler(e)}>
                    Отпустите файл для загрузки</S.DragAndDropText> :
                <S.DragAndDropText onDragStart={e => dragStartHandler(e)}
                                   onDragLeave={e => dragLeaveHandler(e)}
                                   onDragOver={e => dragStartHandler(e)}>
                    Перетащите файл для загрузки или <S.DragAndDropTextInput onClick={handleClick}>выберите
                    сами</S.DragAndDropTextInput>
                </S.DragAndDropText>}
        </S.DragAndDrop>
    );
};

export default DragAndDrop;