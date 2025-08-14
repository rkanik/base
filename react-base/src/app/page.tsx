"use client";
import { useCreated } from "@/hooks/useCreated";
import { useMounted } from "@/hooks/useMounted";

export default function Home() {
  //
  useCreated(() => {
    console.log("useCreated");
  });

  useMounted(() => {
    console.log("useMounted", window.innerWidth);
  });

  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
}
