//src/app/page.tsx
'use client'
import { HeroBtn } from "@/components/HeroBtn";
import { BackgroundBoxes } from "@/components/HeroSection";


export default function Home() {
  return (
    <div>
      <BackgroundBoxes/>
      <HeroBtn/>
    </div>
  );
}
