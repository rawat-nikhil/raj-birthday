import type { GiftImage } from "@/lib/types";
import Image from "next/image";

const placements = [
  "left-[2%] top-[16%] w-[48%] -rotate-6 z-10",
  "left-[30%] top-[2%] w-[44%] rotate-[4deg] z-20",
  "left-[6%] top-[46%] w-[42%] rotate-[2deg] z-30",
  "right-[2%] top-[28%] w-[38%] -rotate-2 z-20",
];

type PhotoCollageProps = {
  images: GiftImage[];
};

export function PhotoCollage({ images }: PhotoCollageProps) {
  return (
    <div className="relative mx-auto h-85 w-full max-w-md sm:h-105">
      {images.slice(0, 4).map((image, index) => (
        <figure
          key={image.src}
          className={`absolute bg-paper p-2 pb-7 shadow-[0_16px_34px_rgba(28,27,25,0.1)] ${placements[index]}`}
        >
          <div className="relative aspect-3/4">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="220px"
              className="object-cover"
            />
          </div>
        </figure>
      ))}
    </div>
  );
}
