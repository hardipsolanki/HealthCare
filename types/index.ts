

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


export interface FetchDocsApiResponse {
  data: DocumentItem[];
  status: Status;
}

export interface Data {
  items: DocumentItem[];
  limit: number;
  page: number;
  total: number;
}

export interface DocumentItem {
  id: string;
  userId: string;
  documentType: string;
  fileName: string;
  fileStoragePath: string;
  s3Bucket: string;
  s3Key: string;
  fileType: string;
  fileSize: number;
  ocrStatus: "pending" | "completed" | "failed"; // You can extend as needed
  ocrExtractedText: string | null;
  structuredExtractedData: any | null; // or a specific interface if known
  reportDate: string | null;
  hospitalName: string | null;
  doctorName: string | null;
  remarks: string | null;
  softDelete: boolean;
  deletedAt: string | null;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

interface Status {
  description: string;
  status: string;
  statusCode: number;
}


export interface SingleDocumentResponse {
  data: DocumentItem;
  status: Status;
}



export type FetchDocumentsPayload = {
  sort: {
    sortBy?: string;
    orderBy?: "asc" | "desc";
  },
  filter: {
    search?: string;
  },
  page: {
    pageNumber?: number;
    pageLimit?: number;
  }
};


export interface PaginatedDocumentResponse {
  data: DocumentItem[];
  page: PageInfo;
  status: Status;
}

export interface DocumentsState {
  documents: DocumentItem[];
  pageInfo: PageInfo;
}
interface PageInfo {
  pageLimit: number;
  pageNumber: number; // Note: This is 0-based (0 = first page)
  totalPages: number;
  totalRecords: number;
}
