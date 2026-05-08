

export type SignupInput = {
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    gender: string;
    age: number;
    phone: string;
    terms: boolean
};

export type LoginInput = {
    email: string;
    password: string;
};

export type ApiError = {
    message: string;
    status?: number;
    data?: {
        details: null | string,
        errorCode: string,
        message: string,
        success: boolean
    };
};

// redux state auth slice
export interface User {
  _id?: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  age: number;
  phone: string;
}

 export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
