"use client";

import {
  CompleteSessionResponse,
  SessionDayPlan,
  DayStatus,
} from "@/types/sessionsTypes";
import { getSessionResult } from "@/api/sessions";
import {
  completeSession,
  downloadMealPlanPdf,
  getSessionPlan,
  updateDayPlan,
} from "@/api/sessions";
import { useEffect, useState } from "react";
import clsx from "clsx";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Props = {
  sessionId: string;
  dayss: SessionDayPlan[];
};

export const SessionTracker = ({ dayss, sessionId }: Props) => {
  const { toast } = useToast();
  const [days, setDays] = useState<SessionDayPlan[]>(dayss);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CompleteSessionResponse | null>(null);
  const [open, setOpen] = useState(false);
  const [weightAfter, setWeightAfter] = useState("");

  const [isFinishing, setIsFinishing] = useState(false);

  useEffect(() => {
    const checkCompleted = async () => {
      try {
        const res = await getSessionResult(sessionId);
        if (res) {
          setResult(res);
        }
      } catch (e) {
        console.error("Failed to fetch session result", e);
        // Сессия не завершена — игнорим
      }
    };

    checkCompleted();
  }, [sessionId]);

  const fetchWeek = async (offset: number) => {
    setLoading(true);
    try {
      const data = await getSessionPlan(sessionId, offset);
      setDays(data);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (dayId: string, status: DayStatus) => {
    const day = days.find((d) => d._id === dayId);
    if (!day) return;

    const updated = await updateDayPlan(sessionId, dayId, {
      meals: day.meals,
      workout: day.workout,
      total_calories: day.total_calories,
      total_calories_burned: day.total_calories_burned,
      status,
    });

    setDays((prev) =>
      prev.map((d) => (d._id === dayId ? { ...d, status: updated.status } : d))
    );
  };

  // const finishSession = async () => {
  //   const weightAfter = Number(prompt("Enter your final weight:"));
  //   if (!weightAfter || isNaN(weightAfter)) return;

  //   try {
  //     const r = await completeSession(sessionId, weightAfter);
  //     setResult(r);
  //   } catch (e) {
  //     console.error("Failed to complete session", e);
  //     alert("Failed to complete session");
  //   }
  // };

  if (result) {
    return (
      <div className="mt-8 space-y-4">
        <div className="bg-[#B8BFFF] p-4 rounded-xl text-white">
          <h3 className="font-bold text-sm">RESULT</h3>
          <p className="text-lg font-semibold mt-1">
            {result.goal_achieved ? "ACHIEVED!" : "NOT ACHIEVED"}
          </p>
          <p className="mt-2 text-sm">{result.progress_summary}</p>
          <p className="text-sm mt-1">{result.summary}</p>
        </div>

        <div className="bg-[#FFDDAA] p-4 rounded-xl text-[#2F2D51]">
          <h3 className="font-bold text-lg">Fun facts</h3>
          <p className="text-sm mt-2">{result.fun_fact}</p>
        </div>

        <div className="bg-[#2F2D51] p-4 rounded-xl text-white flex justify-between items-center">
          <div>
            <p className="text-sm">You can download your results</p>
          </div>
          <button
            onClick={() => downloadMealPlanPdf(sessionId)}
            className="bg-white text-[#2F2D51] px-4 py-1 rounded-full text-sm font-medium"
          >
            Download →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-[#2F2D51] font-bold text-lg">
          Week {offset / 7 + 1}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => {
              const newOffset = offset - 7;
              if (newOffset >= 0) {
                setOffset(newOffset);
                fetchWeek(newOffset);
              }
            }}
            disabled={offset === 0}
            className="px-3 py-1 border rounded-lg text-sm bg-white disabled:opacity-40"
          >
            ← Prev
          </button>
          <button
            onClick={() => {
              const newOffset = offset + 7;
              setOffset(newOffset);
              fetchWeek(newOffset);
            }}
            className="px-3 py-1 border rounded-lg text-sm bg-white"
          >
            Next →
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[800px] w-full text-left text-sm border border-gray-200 rounded-xl overflow-hidden">
          <thead className="bg-[#F5F6FA] text-[#A1A4B2] uppercase text-xs">
            <tr>
              <th className="p-3">Day</th>
              <th className="p-3">Breakfast</th>
              <th className="p-3">Lunch</th>
              <th className="p-3">Dinner</th>
              <th className="p-3">Calories</th>
              <th className="p-3">Exercise</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white text-[#2F2D51]">
            {loading ? (
              <tr>
                <td colSpan={7} className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : (
              days.map((day) => (
                <tr key={day._id} className="border-t border-gray-100">
                  <td className="p-3 font-medium">
                    {day.day_of_week} ({day.day_number})
                  </td>
                  <td className="p-3">
                    {day.meals
                      .find((m) => m.meal === "breakfast")
                      ?.food.join(", ") || "-"}
                  </td>
                  <td className="p-3">
                    {day.meals
                      .find((m) => m.meal === "lunch")
                      ?.food.join(", ") || "-"}
                  </td>
                  <td className="p-3">
                    {day.meals
                      .find((m) => m.meal === "dinner")
                      ?.food.join(", ") || "-"}
                  </td>
                  <td className="p-3">{day.total_calories}</td>
                  <td className="p-3">
                    {day.workout.map((w) => w.exercise).join(", ")}
                  </td>
                  <td className="p-3">
                    <div className="flex gap-1 items-center">
                      {(["not_done", "partial", "full"] as DayStatus[]).map(
                        (s) => (
                          <button
                            key={s}
                            onClick={() => handleStatusChange(day._id, s)}
                            className={clsx(
                              "text-xs px-2 py-0.5 rounded-full border transition",
                              s === day.status
                                ? "bg-[#2F2D51] text-white border-[#2F2D51]"
                                : "border-gray-300 text-gray-600 hover:bg-gray-100"
                            )}
                          >
                            {s}
                          </button>
                        )
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {!result && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button className="mt-6 w-full bg-[#2F2D51] text-white py-3 rounded-full font-semibold">
              Finish Session
            </button>
          </DialogTrigger>

          <DialogContent className="bg-white rounded-xl w-[90%]">
            <DialogHeader>
              <DialogTitle className="text-[#2F2D51] text-lg font-semibold">
                Enter your current weight
              </DialogTitle>
            </DialogHeader>

            <Input
              type="number"
              placeholder="e.g. 78"
              value={weightAfter}
              onChange={(e) => setWeightAfter(e.target.value)}
            />

            <DialogFooter className="mt-4 flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setOpen(false);
                  setWeightAfter("");
                }}
              >
                Cancel
              </Button>

              <Button
                onClick={async () => {
                  const num = Number(weightAfter);
                  if (!num || isNaN(num)) {
                    toast({
                      title: "Invalid weight",
                      description: "Please enter a valid weight.",
                      variant: "inform",
                    });
                    return;
                  }

                  setIsFinishing(true);
                  try {
                    const res = await completeSession(sessionId, num);
                    setResult(res);
                    setOpen(false);
                    toast({
                      title: "Success",
                      description: "Session completed successfully!",
                      variant: "success",
                    })
                  } catch {
                    toast({
                      title: "Error",
                      description: "Failed to complete session",
                      variant: "destructive",
                    });
                  } finally {
                    setIsFinishing(false);
                  }
                }}
                disabled={isFinishing}
              >
                {isFinishing ? <Loader className="animate-spin" /> : "Finish"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
