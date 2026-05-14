
export const ROUTES = {
    INDEX: "index",
    LOGIN: "login",
    SIGNUP: "signup",
    TABS: "(tabs)",
    ADD_DOCUMENT: "add-document",
    DOCUMENT_DETAILS: "document-details/[documentId]",
    DRAWER: "(drawer)",
    TermsOfConditions: "terms-and-conditions",
    PrivacyPolicy: "privacy-policy",
    UploadDocSuccess: "upload-success",
    UploadingDocument: "uploading-document"
}

export const ROUTES_PATH = {
    Index: "/home",
    Login: "/login",
    Signup: "/signup",
    AddDocument: "/add-document",
    DocumentDetails: `/document-details/[documentId]`,
    // Profile: "/profile",
    Profile: "/uploading-document",
    Documents: "/documents",
    TermsOfConditions: "/terms-and-conditions",
    PrivacyPolicy: "/privacy-policy",
    UploadDocSuccess: "/upload-success",
    UploadingDocument: "/uploading-document"
} as const