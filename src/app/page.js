import Status from "@/components/Status";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-100">
      <Status />
    </main>
  );
}
