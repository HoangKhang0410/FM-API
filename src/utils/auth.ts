import { Response } from 'express';
import { Secret, sign } from 'jsonwebtoken';
import { User } from '../models/User';

export const createToken = (type: 'accessToken' | 'refreshToken', user: User) => {
    return sign(
        {
            userId: user.id,
            username: user.username,
        },
        type === 'accessToken'
            ? (process.env.ACCESS_TOKEN_SECRET as Secret)
            : (process.env.REFRESH_TOKEN_SECRET as Secret),
        {
            expiresIn: type === 'accessToken' ? '15m' : '60m',
        }
    );
};

export const sendRefreshToken = (res: Response, user: User) => {
    res.cookie(process.env.REFRESH_TOKEN_SECRET as string, createToken('refreshToken', user), {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/refresh_token',
    });
};
