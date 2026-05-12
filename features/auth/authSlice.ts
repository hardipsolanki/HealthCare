import { AuthState, Patient } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    createAsyncThunk,
    createSlice,
    PayloadAction,
} from "@reduxjs/toolkit";


const initialState: AuthState = {
    user: null,
    accessToken: null,
    isAuthenticated: false,
    isLoading: false,

};

export const loadAuthFromStorage = createAsyncThunk("auth/loadAuthFromStorage",
    async () => {
        const accessToken = await AsyncStorage.getItem("accessToken");
        const refreshToken = await AsyncStorage.getItem("refreshToken");
        const user = await AsyncStorage.getItem("user");

        return {
            accessToken: accessToken ,
            refreshToken: refreshToken,
            user: user ? JSON.parse(user) : null,
        };
    }
);

export const saveAuthToStorage = createAsyncThunk(
    "auth/saveAuthToStorage",
    async ({ token, user, }: { token: {accessToken: string, refreshToken: string}; user: Patient; }) => {
        await AsyncStorage.setItem("accessToken", token.accessToken);
        await AsyncStorage.setItem("refreshToken", token.refreshToken);

        await AsyncStorage.setItem(
            "user",
            JSON.stringify(user)
        );

        return {
            token,
            user,
        };
    }
);

export const logoutUser = createAsyncThunk(
    "auth/logoutUser",
    async () => {
        await AsyncStorage.removeItem("accessToken");
        await AsyncStorage.removeItem("refreshToken");
        await AsyncStorage.removeItem("user");
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {
        setUser: (state, action: PayloadAction<Patient>) => {
            state.user = action.payload;
        },

        setAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
            state.isAuthenticated = true;
        },

    },

    extraReducers: (builder) => {
        // Load auth
        builder.addCase(loadAuthFromStorage.pending, (state) => {
            state.isLoading = true;
        }
        );

        builder.addCase(loadAuthFromStorage.fulfilled, (state, action) => {
            state.isLoading = false;

            state.accessToken =
                action.payload.accessToken;

            state.user = action.payload.user;

            state.isAuthenticated =
                !!action.payload.accessToken;
        }
        );

        builder.addCase(loadAuthFromStorage.rejected, (state) => {
            state.isLoading = false;
        }
        );

        // Save auth
        builder.addCase(saveAuthToStorage.pending, (state) => {
            state.isLoading = true;
        }
        );

        builder.addCase(saveAuthToStorage.fulfilled, (state, action) => {
            state.isLoading = false;

            state.accessToken = action.payload.token.accessToken;

            state.user = action.payload.user;

            state.isAuthenticated = true;
        }
        );

        builder.addCase(saveAuthToStorage.rejected, (state, action) => {
            state.isLoading = false;
        }
        );

        // Logout
        builder.addCase(logoutUser.fulfilled, (state) => {
            state.user = null;
            state.accessToken = null;

            state.isAuthenticated = false;
        }
        );
    },
});

export const {
    setUser,
    setAccessToken,
} = authSlice.actions;

export default authSlice.reducer;