export interface PhysicalData {
  weight: number;
  height: number;
  age: number;
  blood_sugar: number;
  chronic_diseases: string;
  activity_level: string;
  gender: string;
}

export interface RegisterPayload {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  physical_data: PhysicalData;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

export interface RegisterResponse {
  // _id: string;
  // first_name: string;
  // last_name: string;
  // email: string;
  access_token: string;
  refresh_token: string;
}