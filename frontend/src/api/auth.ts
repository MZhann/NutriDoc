import { backendApiInstance } from "./index";
import { AxiosError } from "axios";
import { RegisterPayload, LoginPayload, LoginResponse, RegisterResponse } from "../types/authTypes";



export async function registerUser(
  payload: RegisterPayload
): Promise<RegisterResponse> {
  try {
    const response = await backendApiInstance.post<RegisterResponse>(
      "/auth/register",
      payload
    );

    localStorage.setItem("accessToken", response.data.access_token);
    localStorage.setItem("refreshToken", response.data.refresh_token);

    return response.data;
  } catch (error) {
    if ((error as AxiosError).isAxiosError) {
      throw error;
    }
    throw new Error("Registration failed");
  }
}



export async function loginUser(
  payload: LoginPayload
): Promise<LoginResponse> {
  try {
    const response = await backendApiInstance.post<LoginResponse>(
      "/auth/login",
      payload
    );
    return response.data;
  } catch (error) {
    if ((error as AxiosError).isAxiosError) {
      throw error;
    }
    throw new Error("Login failed");
  }
}