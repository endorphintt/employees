import { authApi } from './../app/services/auth';
import { createListenerMiddleware } from "@reduxjs/toolkit";

export const ListenerMiddleWare = createListenerMiddleware()

ListenerMiddleWare.startListening({
    matcher: authApi.endpoints.login.matchFulfilled,
    effect: async (action, listenerApi) => {
        listenerApi.cancelActiveListeners()

        if ( action.payload.token ) {
            localStorage.setItem('token', action.payload.token)
        }
    }
})

