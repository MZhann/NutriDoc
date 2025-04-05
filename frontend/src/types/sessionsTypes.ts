
export interface CreateSessionPayload {
  goal: string;
  duration: number;
  comments?: string;
}

export interface CreateSessionResponse {
  _id: string;
  user_id: string;
  category_id: string;
  goal: string;
  progress: number;
  comments: string;
  ai_generated_plan_table_ids: string[];
  session_start: string;
  session_end: string | null;
  status: "pending" | "active" | "completed" | "cancelled";
  error_message: string | null;
  last_updated: string;
  result: string | null;
}

export const LOSE_WEIGHT_CATEGORY_ID = "67ed69cf17e510a5099dcfc0";
export const GAIN_MUSCLE_CATEGORY_ID = "67ed69ba17e510a5099dcfbf";
export const SPECIAL_DIET_CATEGORY_ID = "67f0695717e510a5099dd036";


// Тип для одного приёма пищи
export interface Meal {
  meal: string; // breakfast, lunch, dinner
  food: string[];
  calories: number;
}

// Тип для одной тренировки
export interface Workout {
  exercise: string;
  sets: number;
  reps: number;
  calories_burned: number;
}

// Тип одного дня из плана
export interface SessionDayPlan {
  _id: string;
  month: number;
  week: number;
  day_number: number;
  day_of_week: string;
  date: string;
  meals: Meal[];
  workout: Workout[];
  total_calories: number;
  total_calories_burned: number;
  status: "not_done" | "partial" | "full";
}

export type DayStatus = "not_done" | "partial" | "full";

export interface UpdateDayPlanPayload {
  meals: Meal[];
  workout: Workout[];
  total_calories: number;
  total_calories_burned: number;
  status: DayStatus;
}

// На выходе тот же `SessionDayPlan` что мы уже описали
export type UpdateDayPlanResponse = SessionDayPlan;


export interface NutritionAnalysis {
  average_calories_per_day: number;
  calorie_trend: "deficit" | "surplus" | "maintenance";
}

export interface WorkoutAnalysis {
  total_workout_days: number;
  most_frequent_exercises: string[];
  total_calories_burned: number;
}

export interface ConsistencyAnalysis {
  longest_streak_days: number;
  skipped_days: number;
  best_week: string;
  worst_week: string;
}

export interface CompleteSessionResponse {
  goal_achieved: boolean;
  progress_summary: string;
  nutrition_analysis: NutritionAnalysis;
  workout_analysis: WorkoutAnalysis;
  consistency: ConsistencyAnalysis;
  summary: string;
  fun_fact: string;
}

export type SessionStatus = "active" | "processing" | "pending" | "completed" | "failed";

export interface SessionItem {
  _id: string;
  goal: string;
  category_id: string;
  session_start: string;
}