import { postReq } from "@/helpers/axiosInstance";
import { LoginInput, SignupInput } from "@/types";

export const createAccount = async (data: Omit<SignupInput, "terms">) => {
    const res = await postReq("/patient/add", data);
    return res
}   

export const login = async (data: LoginInput) => {
    const res = await postReq("/auth/login", data);
    return res
}

export const logout = async () => {
    const res = await postReq("/auth/logout");
    return res
}