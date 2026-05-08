import { postReq } from "@/helpers/axiosInstance";
import { SignupInput } from "@/types";

export const createAccount = async (data: Omit<SignupInput, "terms">) => {
    const res = await postReq("/patient/add", data);
    return res
}   
