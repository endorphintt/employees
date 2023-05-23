import { User } from "@prisma/client";
import { api } from "./api";

export type UserData = Omit<User, "id">
type ResponsLoginData = User & { token: string };

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<ResponsLoginData, UserData>({
            query: (userData) => ({
                url: '/user/login',
                method: 'POST',
                body: userData
            }),
        }),
        register: builder.mutation<ResponsLoginData, UserData>({
            query: (userData) => ({
                url: '/user/register',
                method: 'POST',
                body: userData
            }),
        }),
        current: builder.query<ResponsLoginData, void>({
            query: () => ({
                url: '/user/current',
                method: 'GET',
            }),
        })
    })
})

export const { useLoginMutation, useRegisterMutation, useCurrentQuery } = authApi

export const { endpoints: { login, register, current } } = authApi;