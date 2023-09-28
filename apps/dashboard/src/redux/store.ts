import {
	FLUSH,
	PAUSE,
	PERSIST,
	persistReducer,
	persistStore,
	PURGE,
	REGISTER,
	REHYDRATE,
} from 'redux-persist'
import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage/session'
import authSlice from './features/auth.slice'
import viewSlice from './features/view.slice'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { authApi } from './services/auth.services'
import { userApi } from './services/user.services'
import { skillApi } from './services/skill.services'
import { jobTitleApi } from './services/job-title.services'


const persistConfig = {
	key: 'root',
	storage,
}

const rootReducer = combineReducers({
	auth: authSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
	reducer: {
		app: persistedReducer,
		view: viewSlice,

		// Services
		[authApi.reducerPath]: authApi.reducer,
		[userApi.reducerPath]: userApi.reducer,
		[skillApi.reducerPath]: skillApi.reducer,
		[jobTitleApi.reducerPath]: jobTitleApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat([
			authApi.middleware,
			userApi.middleware,
			skillApi.middleware,
			jobTitleApi.middleware,
		]),
})

setupListeners(store.dispatch)
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>

export const persistor = persistStore(store)


// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch
