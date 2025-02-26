//to get the info about the User
export interface ProfileResponse {
  id: string
  email: string
  first_name: string
  last_name: string
  physical_data: {
    weight: number
    height: number
    age: number
  }
}


//For updating the user profile data
export interface UpdateUserProfilePayload {
  first_name: string
  last_name: string
  email: string
  password: string
  physical_data: {
    weight: number
    height: number
    age: number
    blood_sugar: number
    BMI: number
  }
}

//successfull user profile update data response 
export interface UpdateUserProfileResponse {
  _id: string
  first_name: string
  last_name: string
  email: string
  password: string
  physical_data_id: string
}