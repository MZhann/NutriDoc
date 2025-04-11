'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { backendApiInstance } from "@/api";
import { SessionItem, SessionStatus } from "@/types/sessionsTypes";

const statuses: SessionStatus[] = ["active", "processing", "pending", "completed", "failed"];

const CATEGORY_PAGES: Record<string, string> = {
  "67ed69cf17e510a5099dcfc0": "/lose-weight",
  "67ed69ba17e510a5099dcfbf": "/gain-mass",
  "67efd34b17e510a5099dcfc3": "/better-sleep",
  "67f0695717e510a5099dd036": "/special-diet",
};

const Monitoring = () => {
  const [sessions, setSessions] = useState<Record<SessionStatus, SessionItem[]>>({
    active: [],
    processing: [],
    pending: [],
    completed: [],
    failed: [],
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchAllSessions = async () => {
      try {
        const results: Record<SessionStatus, SessionItem[]> = {
          active: [],
          processing: [],
          pending: [],
          completed: [],
          failed: [],
        };

        await Promise.all(
          statuses.map(async (status) => {
            const res = await backendApiInstance.get<SessionItem[]>(
              `/session/get?status=${status}`
            );
            results[status] = res.data;
          })
        );

        setSessions(results);
      } catch (err) {
        console.error("Failed to load sessions", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllSessions();
  }, []);

  const formatDate = (date: string | null | undefined) => {
    if (!date) return "Unknown date";
    const d = new Date(date);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const handleCardClick = (session: SessionItem) => {
    const page = CATEGORY_PAGES[session.category_id];
    if (!page) return alert("Unknown session category");
    router.push(`${page}?sessionId=${session._id}`);
  };

  return (
    <section className="w-full max-w-3xl mb-40 min-h-screen flex flex-col items-center pt-20 text-[#3F414E] p-6">
      <h1 className="font-bold text-2xl">Monitoring</h1>
      <p className="text-center text-[#A0A3B1] mt-4">
        You can see the sessions that are going on and update them with your progress
      </p>

      {loading ? (
        <p className="mt-10 text-sm text-[#A0A3B1]">Loading sessions...</p>
      ) : (
        statuses.map((status) => (
          <div key={status} className="w-full mt-8">
            <h2 className="text-[#A0A3B1] uppercase text-xs font-semibold mb-2">{status}</h2>

            {sessions[status].length === 0 ? (
              <p className="text-sm text-[#CBD0E0] italic">No {status} sessions</p>
            ) : (
              sessions[status].map((session) => (
                <div
                  key={session._id}
                  onClick={() => handleCardClick(session)}
                  className="cursor-pointer w-full mt-4 h-24 bg-[url('/assets/images/decoration/yellowish-bg.svg')] bg-no-repeat bg-cover bg-center rounded-xl flex justify-between items-center p-6 transition hover:opacity-90"
                >
                  <div>
                    <p className="text-lg font-bold">{session.goal || "Session"}</p>
                    <div className="flex flex-col text-sm text-[#5A6175]">
                      <span>{formatDate(session.session_start)}</span>
                    </div>
                  </div>
                  <div className="text-lg font-bold text-[#5A6175] size-12 rounded-full bg-[#3F414E] flex justify-center items-center">
                    <Image
                      src={"/assets/images/decoration/play.svg"}
                      width={17}
                      height={17}
                      alt="start button"
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        ))
      )}
    </section>
  );
};

export default Monitoring;
