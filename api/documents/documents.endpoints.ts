import { postReq } from "@/helpers/axiosInstance";
import { AddDocumentInput } from "@/types";



export const addDocument = async (data: AddDocumentInput) => {
    const res = await postReq("/documents/add", data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return res
}
