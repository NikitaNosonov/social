import React, {useEffect, useState} from 'react';
import {
    MenuItem, Pagination, Stack, Table, TableBody,
    TableContainer, TableRow, Select, FormControl, IconButton, SelectChangeEvent
} from "@mui/material";
import * as S from "./ListUsersItem.style";
import UserStore from "../../../../store/userStore";
import {User} from "../../../../types/userType";
import Spinner from "../../../../components/Spinner";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';

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

    const handleRoleChange = async (event: any, user: Partial<User>) => {
        const updatedUser = {...user, role: event.target.value as 'user' | 'moderator'};
        if (updatedUser.role === 'moderator' || updatedUser.role === 'user') {
            await UserStore.setUser(updatedUser);
            console.log(updatedUser);
            setUsers(prev => prev.map(u => u.id === user.id ? updatedUser : u))
        }
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


    if (users.length === 0) {
        return (<Spinner size={60} color="secondary"/>)
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
                        <S.TableCell1>Статус аккаунта</S.TableCell1>
                    </TableRow>
                    {users.map((user) => (
                        (user?.role !== 'admin') ?
                            <TableRow key={user?.id}>
                                <S.TableCell2>{user?.name}</S.TableCell2>
                                <S.TableCell2>{user?.surname}</S.TableCell2>
                                <S.TableCell2>{user?.city}</S.TableCell2>
                                <S.TableCell2><FormControl>
                                    <S.SelectRole onChange={(e) => handleRoleChange(e, user)}
                                                  value={user?.role}
                                                  label={user?.role}>
                                        <MenuItem value='user'>user</MenuItem>
                                        <MenuItem value='moderator'>moderator</MenuItem>
                                    </S.SelectRole>
                                </FormControl></S.TableCell2>
                                <S.TableCell2>
                                    {user?.unlocked ?
                                        <IconButton color='warning' onClick={(e) => {
                                            e.preventDefault();
                                            lockedUser(user);
                                        }}><LockIcon/></IconButton> :
                                        <IconButton color='warning' onClick={(e) => {
                                            e.preventDefault();
                                            unlockedUser(user);
                                        }}><LockOpenIcon/></IconButton>}
                                </S.TableCell2>
                            </TableRow> : null
                    ))}
                </TableBody>
            </Table>
            {(count > 1) ? <Stack spacing={2}>
                <Pagination count={count}
                            shape="rounded"
                            onChange={handlePageChange}/>
            </Stack> : null}
        </TableContainer>
    );
};

export default ListUsersItem;