import { backendApiInstance } from "./index";
import { AxiosError } from "axios";
import {
  CreateSessionPayload,
  CreateSessionResponse,
  LOSE_WEIGHT_CATEGORY_ID,
  GAIN_MUSCLE_CATEGORY_ID,
  SPECIAL_DIET_CATEGORY_ID,
  SessionDayPlan,
  UpdateDayPlanPayload,
  UpdateDayPlanResponse,
  CompleteSessionResponse
} from "@/types/sessionsTypes";

// 📌 Function to create a session for "Lose Weight"
const CATEGORY_ID_MAP: Record<string, string> = {
  "/lose-weight": LOSE_WEIGHT_CATEGORY_ID,
  "/gain-mass": GAIN_MUSCLE_CATEGORY_ID,
  "/special-diet": SPECIAL_DIET_CATEGORY_ID,
};
// Универсальный createSession — определяет category_id по location.pathname
export async function createSession(
  payload: CreateSessionPayload
): Promise<CreateSessionResponse> {
  try {
    const path = typeof window !== "undefined" ? window.location.pathname : "";
    const category_id = CATEGORY_ID_MAP[path];

    if (!category_id) {
      throw new Error(`Unknown path: ${path}`);
    }

    const response = await backendApiInstance.post<CreateSessionResponse>(
      "/session/create",
      {
        ...payload,
        category_id,
      }
    );

    return response.data;
  } catch (error) {
    if ((error as AxiosError).isAxiosError) {
      throw error;
    }
    throw new Error("Failed to create session");
  }
}

// Получение недельного расписания сессии с offset (например, offset = 0 => первая неделя)
export async function getSessionPlan(
  sessionId: string,
  offset: number = 0
): Promise<SessionDayPlan[]> {
  try {
    const response = await backendApiInstance.get<SessionDayPlan[]>(
      `/session/${sessionId}?offset=${offset}`
    );
    return response.data;
  } catch (error) {
    if ((error as AxiosError).isAxiosError) {
      throw error;
    }
    throw new Error("Failed to fetch session plan");
  }
}

// Обновление конкретного дня в сессии
export async function updateDayPlan(
  sessionId: string,
  dayId: string,
  payload: UpdateDayPlanPayload
): Promise<UpdateDayPlanResponse> {
  try {
    const response = await backendApiInstance.patch<UpdateDayPlanResponse>(
      `/session/sessions/${sessionId}/day-plan/${dayId}`,
      payload
    );
    return response.data;
  } catch (error) {
    if ((error as AxiosError).isAxiosError) {
      throw error;
    }
    throw new Error("Failed to update day plan");
  }
}

// Завершить сессию и получить финальный анализ
export async function completeSession(
  sessionId: string,
  weightAfter: number
): Promise<CompleteSessionResponse> {
  try {
    const response = await backendApiInstance.get<CompleteSessionResponse>(
      `/session/compete/${sessionId}?weight_after=${weightAfter}`
    );
    return response.data;
  } catch (error) {
    if ((error as AxiosError).isAxiosError) {
      throw error;
    }
    throw new Error("Failed to complete session");
  }
}

// Получить результаты завершённой сессии
export async function getSessionResult(
  sessionId: string
): Promise<CompleteSessionResponse> {
  try {
    const response = await backendApiInstance.get<CompleteSessionResponse>(
      `/session/result/${sessionId}`
    );
    return response.data;
  } catch (error) {
    if ((error as AxiosError).isAxiosError) {
      throw error;
    }
    throw new Error("Failed to fetch session result");
  }
}

// Скачивание PDF-файла плана питания
export async function downloadMealPlanPdf(sessionId: string): Promise<void> {
  try {
    const response = await backendApiInstance.get<Blob>(
      `/session/generate-pdf/${sessionId}`,
      {
        responseType: "blob",
      }
    );

    const blob = new Blob([response.data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "meal_plan.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Failed to download meal plan PDF", error);
    throw new Error("Could not download PDF");
  }
}
