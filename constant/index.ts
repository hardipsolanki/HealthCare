
export const ROUTES = {
    INDEX: "index",
    LOGIN: "login",
    SIGNUP: "signup",
    TABS: "(tabs)",
    ADD_DOCUMENT: "add-document",
    DOCUMENT_DETAILS: "document-details/[documentId]",
    DRAWER: "(drawer)",
    UploadDocSuccess: "upload-success",
    UploadingDocument: "uploading-document",
    Camera: "camera",
    ligal: "ligal/[type]"
}

export const ROUTES_PATH = {
    Index: "/home",
    Login: "/login",
    Signup: "/signup",
    AddDocument: "/add-document",
    DocumentDetails: "/document-details/[documentId]",
    Profile: "/profile",
    // Profile: "/uploading-document",
    Documents: "/documents",
    ligal: "/ligal/[type]",
    UploadDocSuccess: "/upload-success",
    UploadingDocument: "/uploading-document",
    Camera: "/camera"
} as const