import React from 'react';
import * as S from './ListUsersPage.style'
import ListUsersItem from "./listUsersItem/ListUsersItem";

const ListUsersPage = () => {
    return (
        <S.ListUsersPage>
            <ListUsersItem/>
        </S.ListUsersPage>
    );
};

export default ListUsersPage;