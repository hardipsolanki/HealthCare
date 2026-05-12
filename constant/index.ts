
export const ROUTES = {
    INDEX: "index",
    LOGIN: "login",
    SIGNUP: "signup",
    TABS: "(tabs)",
    ADD_DOCUMENT: "add-document",
    DOCUMENT_DETAILS: "document-details/[documentId]",
}

export const ROUTES_PATH = {
    Index: "/(tabs)/home",
    Login: "/login",
    Signup: "/signup",
    AddDocument: "/add-document",
    DocumentDetails: `/document-details/[documentId]`,
} as const