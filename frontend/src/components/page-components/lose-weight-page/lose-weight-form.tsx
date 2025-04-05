"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createSession, getSessionPlan } from "@/api/sessions";
import { SessionDayPlan } from "@/types/sessionsTypes";
import { Loader } from "lucide-react";
import { SessionTracker } from "@/components/page-components/lose-weight-page/session-table";
import { useToast } from "@/hooks/use-toast";

const LoseWeightForm = () => {
  const { toast } = useToast();
  const [weight, setWeight] = useState("");
  const [duration, setDuration] = useState(1);
  const [comments, setComments] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionData, setSessionData] = useState<SessionDayPlan[] | null>(null);

  const searchParams = useSearchParams();
  const sessionId = searchParams.get("sessionId");
  const router = useRouter();

  // 1. If sessionId is present in URL — fetch its data
  useEffect(() => {
    const load = async () => {
      if (!sessionId) return;
      try {
        setLoading(true);
        const session = await getSessionPlan(sessionId, 0);
        setSessionData(session);
      } catch (error) {
        console.error("Error fetching session", error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [sessionId]);

  const handleGenerate = async () => {
    if (!weight) return alert("Please enter target weight");

    setLoading(true);
    try {
      const goal = `I want to have a weight - ${weight} kg`;

      const response = await createSession({
        goal,
        duration,
        comments,
      });

      toast({
        variant: "success",
        title: "Session Created",
        description: "Your session has been created successfully!",
      });
      router.push(`/lose-weight?sessionId=${response._id}`);
    } catch (error) {
      console.error("Error creating session", error);
      alert("Something went wrong while creating your plan.");
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 space-y-4 mb-40">
      {sessionId && sessionData ? (
        <SessionTracker sessionId={sessionId} dayss={sessionData} />
      ) : (
        <>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-sm text-[#A1A4B2] font-medium">
                Your goal
              </label>
              <input
                type="number"
                placeholder="e.g. 67"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full mt-1 px-4 py-2 rounded-xl bg-[#EEF1F4] outline-none"
              />
            </div>
            <div className="flex-1">
              <label className="text-sm text-[#A1A4B2] font-medium">
                Duration
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full mt-1 px-4 py-2 rounded-xl bg-[#EEF1F4] outline-none"
              >
                <option value={1}>1 month</option>
                <option value={2}>2 months</option>
                <option value={3}>3 months</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm text-[#A1A4B2] font-medium">
              Your comments
            </label>
            <textarea
              rows={3}
              placeholder="e.g. I would like to eat healthy food and avoid peanuts"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="w-full mt-1 px-4 py-2 rounded-xl bg-[#EEF1F4] outline-none resize-none"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-[#2F2D51] text-white py-3 rounded-full font-semibold"
          >
            {loading ? <Loader className="animate-spin mx-auto" /> : "Generate"}
          </button>
        </>
      )}
    </div>
  );
};

export default LoseWeightForm;
