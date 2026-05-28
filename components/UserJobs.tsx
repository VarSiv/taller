"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { type PostedJob } from "@/lib/data";

export function UserJobs() {
  const [jobs, setJobs] = useState<PostedJob[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("userJobs") ?? "[]");
    setJobs(stored);
  }, []);

  if (jobs.length === 0) return null;

  return (
    <>
      {jobs.map((job) => (
        <div key={job.id} className="card overflow-hidden ring-2 ring-sv-primary">
          <div className="relative h-44 w-full bg-ink-100">
            <Image
              src={job.photo ?? ""}
              alt={job.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover"
            />
            <span className="absolute left-2 top-2 rounded-full bg-sv-primary px-2 py-0.5 text-[11px] font-semibold text-white">
              Tu publicación
            </span>
          </div>
          <div className="p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-sv-dark">
              <span>{job.postedBy}</span>
              <span className="text-ink-300">·</span>
              <span className="text-ink-400">{job.zone}</span>
            </div>
            <p className="mt-2 line-clamp-3 text-sm text-ink-400">
              {job.description}
            </p>
            <button type="button" className="btn-primary mt-4 w-full">
              Contactar
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
