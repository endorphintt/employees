import { RootState } from './../store';
import  { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'


const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api',
    prepareHeaders(headers, { getState }){
        const token = (getState() as RootState).auth.user?.token || 
        localStorage.getItem('token')

        if( token  && token !== null) {
            headers.set('authorization', `Bearer ${token}`)
        }
    }
})

const baseQuerryWithRetry = retry(baseQuery, { maxRetries: 1})

export const api = createApi({
    reducerPath: 'splitApi',
    baseQuery: baseQuerryWithRetry,
    refetchOnMountOrArgChange: true,
    endpoints: () => ({})
})