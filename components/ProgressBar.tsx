"use client";

import { useEffect, useState } from "react";
import { getProgress } from "@/lib/utils";

export default function ProgressBar() {
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const { overallProgress } = getProgress();
    setProgress(overallProgress);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
      <div
        className="bg-primary h-full transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}