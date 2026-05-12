import { getReq, postReq } from "@/helpers/axiosInstance";
import { AddDocumentInput, FetchDocsApiResponse, FetchDocumentsPayload, PaginatedDocumentResponse, SingleDocumentResponse } from "@/types";



export const addDocument = async (data: AddDocumentInput) => {
    const res = await postReq("/documents/add", data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return res
}
export const fetchDocuments = async () => {
    try {
        const res = await getReq<FetchDocsApiResponse>("/documents/list");
        return res
    } catch (error) {
        console.log("Error while fetch docuemnts: ", error)
        throw error
    }
}

export const fetchDocumentsWithFilter = async (payload: FetchDocumentsPayload) => {
    try {
        const res = await postReq<{}, PaginatedDocumentResponse>("/documents/list-paginated", payload);
       return res
    } catch (error) {
        console.log("Error while fetch docuemnts: ", error)
        throw error
    }
}

export const fetchDocument = async (documentId: string) => {
    try {

        const res = await getReq<SingleDocumentResponse>(`/documents/${documentId}`);
        return res.data.data
    } catch (error) {
        console.log("Error while fetch docuemnt: ", error)
        throw error
    }
}




