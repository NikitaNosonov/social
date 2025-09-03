import React, {useEffect, useState} from 'react';
import {Button, Pagination, Stack, Table, TableBody, TableContainer, TableRow} from "@mui/material";
import * as S from "./ListUsersItem.style";
import UserStore from "../../../../store/userStore";
import {User} from "../../../../types/userType";

const ListUsersItem = () => {
    const [users, setUsers] = useState<Partial<User>[]>([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    let count = 0;

    useEffect(() => {
        const fetch = async () => {
            await UserStore.getUsers()
            await UserStore.getUsersPage(1, 10).then(() => {
                setUsers(UserStore.usersPage);
            });
        }

        fetch()
    }, [])

    const numPage = () => {
        if (UserStore.allUsers.length < 10) {
            return count = 1
        } else if (UserStore.allUsers.length === 10) {
            return 1
        } else if (UserStore.allUsers.length > 10) {
            return count = Math.ceil(UserStore.allUsers.length / 10)
        }
    }
    numPage()

    const handlePageChange = async () => {
        setPage(page + 10);
        setPageSize(pageSize + 10);
        UserStore.getUsersPage(page, pageSize);
    }

    const upRole = async (user: Partial<User>) => {
        const updatedUser = {...user, role: 'moderator' as const};

        await UserStore.setUser(updatedUser);
        console.log(updatedUser);
        setUsers(prev => prev.map(u => u.id === user.id ? updatedUser : u));
    }

    const downRole = async (user: Partial<User>) => {
        const updatedUser = {...user, role: 'user' as const};

        await UserStore.setUser(updatedUser);
        setUsers(prev => prev.map(u => u.id === user.id ? updatedUser : u));
    }

    const lockedUser = async (user: Partial<User>) => {
        const updatedUser = {...user, unlocked: false};

        await UserStore.setUser(updatedUser);
        setUsers(prev => prev.map(u => u.id === user.id ? updatedUser : u))
    }

    const unlockedUser = async (user: Partial<User>) => {
        const updatedUser = {...user, unlocked: true};

        await UserStore.setUser(updatedUser);
        setUsers(prev => prev.map(u => u.id === user.id ? updatedUser : u))
    }

    return (
        <TableContainer>
            <Table>
                <TableBody>
                    <TableRow>
                        <S.TableCell1>Имя</S.TableCell1>
                        <S.TableCell1>Фамилия</S.TableCell1>
                        <S.TableCell1>Город</S.TableCell1>
                        <S.TableCell1>Роль</S.TableCell1>
                        <S.TableCell1></S.TableCell1>
                        <S.TableCell1></S.TableCell1>
                    </TableRow>
                    {users.map((user) => (
                        (user?.role !== 'admin') ?
                            <TableRow key={user?.id}>
                                <S.TableCell2>{user?.name}</S.TableCell2>
                                <S.TableCell2>{user?.surname}</S.TableCell2>
                                <S.TableCell2>{user?.city}</S.TableCell2>
                                <S.TableCell2>{user?.role}</S.TableCell2>
                                <S.TableCell2>
                                    {user?.unlocked ?
                                        <S.Btn onClick={(e) => {
                                            e.preventDefault();
                                            lockedUser(user);
                                        }}>Заблокировать</S.Btn> :
                                        <S.Btn onClick={(e) => {
                                            e.preventDefault();
                                            unlockedUser(user);
                                        }}>Разблокировать</S.Btn>}
                                </S.TableCell2>
                                <S.TableCell2>
                                    {(user?.role !== 'moderator') ?
                                        <S.Btn onClick={(e) => {
                                            e.preventDefault();
                                            upRole(user);
                                        }}>Повысить роль</S.Btn> :
                                    <S.Btn onClick={(e) => {
                                        e.preventDefault();
                                        downRole(user);
                                    }}>Понизить роль</S.Btn>}
                                </S.TableCell2>
                            </TableRow> : null
                    ))}
                </TableBody>
            </Table>
            <Stack spacing={2}>
                <Pagination count={count}
                            shape="rounded"
                            onChange={handlePageChange}/>
            </Stack>
        </TableContainer>
    );
};

export default ListUsersItem;