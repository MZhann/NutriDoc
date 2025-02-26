import { backendApiInstance } from "./index"
import { AxiosError } from "axios"
import {ProfileResponse, UpdateUserProfilePayload, UpdateUserProfileResponse} from "../types/userTypes"

// function for getting info about current User
export async function getCurrentUserProfile(): Promise<ProfileResponse> {
  try {
    const response = await backendApiInstance.get<ProfileResponse>("/profile/me")
    return response.data
  } catch (error) {
    if ((error as AxiosError).isAxiosError) {
      throw error
    }
    throw new Error("Fetching user profile failed")
  }
}


// For updating the user profile data
export async function updateUserProfile(
  payload: UpdateUserProfilePayload
): Promise<UpdateUserProfileResponse> {
  try {
    const response = await backendApiInstance.patch<UpdateUserProfileResponse>(
      "/profile/update",
      payload
    )
    return response.data
  } catch (error) {
    if ((error as AxiosError).isAxiosError) {
      throw error
    }
    throw new Error("User profile update failed")
  }
}
