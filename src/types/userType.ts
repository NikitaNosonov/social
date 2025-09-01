

export interface User  {
    id?: number | null;
    name: string;
    surname: string;
    city: string;
    role: 'user' | 'moderator' | 'admin';
    user_id: string;
    avatar: string;
    unlocked: boolean;
}