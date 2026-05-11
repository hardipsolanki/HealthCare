

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
  user: Patient | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginResponse {
  data: {
    data: {
      accessToken: string;
      expiresIn: string; // e.g., "15m"
      patient: any; // Replace 'any' with your actual Patient type
      refreshExpiresIn: string; // e.g., "7d"
      refreshToken: string;
      tokenType: string; // e.g., "Bearer"
    };
    status: {
      description: string;
      status: string; // e.g., "SUCCESS"
      statusCode: number; // e.g., 200
    };
  };
  status: number; // e.g., 200
  statusText: string | undefined;
}

export interface Patient {
  age: number;
  createdAt: string; // ISO date string
  deletedAt: string | null;
  email: string;
  firstName: string;
  fullName: string;
  gender: "male" | "female" | "other"; // Adjust based on possible values
  id: string; // UUID format
  isVerified: boolean;
  lastName: string;
  patientCode: string;
  phone: string;
  profileImageKey: string | null;
  softDelete: boolean;
  status: "ACTIVE" | "INACTIVE" | "DELETED"; // Adjust based on possible values
  updatedAt: string; // ISO date string
  userName: string;
}
export type ImageFile = {
  uri: string;
  name: string;
  type: string;
};

export type AddDocumentInput = {
  documentType: string;
  file: ImageFile ;
};

export interface CreatePatientResponse {
  data: {
    id: string;
    patientCode: string;
    userName: string;
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    status: "ACTIVE" | "INACTIVE" | "DELETED";
    isVerified: boolean;
    gender: "male" | "female" | "other";
    age: number;
    phone: string;
    profileImageKey: string | null;
    softDelete: boolean;
    deletedAt: string | null;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
  };
  status: {
    description: string;
    status: "SUCCESS" | "ERROR" | "FAILED";
    statusCode: number; // 201 for creation
  };
}


type DocumentType = 'PDF' | 'JPG';

export interface DocumentItemType {
  id: string;
  title: string;
  date: string;
  type: DocumentType;
  size: string;
}
