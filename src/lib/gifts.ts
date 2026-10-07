import type { Gift, GiftImage } from "@/lib/types";

const photo = (id: string, alt: string, width = 1200): GiftImage => ({
  src: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80`,
  alt,
});

export const gifts: Gift[] = [
  {
    id: "adventures",
    title: "A promise to see the world with you.",
    body: "New cities. New sunsets. Wrong turns. Long drives.\n\nPlaces we’ve dreamed about, and places we haven’t discovered yet.",
    note: "Wherever we go, I want you beside me.",
    layout: "editorial",
    box: "red",
    images: [
      {
        src: "/rome.png",
        alt: "A couple sitting together in front of the Colosseum",
      },
    ],
  },
  {
    id: "memories",
    title: "A promise to create memories with you.",
    body: "The planned ones.\nThe completely unplanned ones.\n\nThe ordinary days that somehow become our favourite stories.\n\nI hope we never stop making moments worth remembering.",
    note: "",
    layout: "collage",
    box: "black",
    images: [
      photo(
        "photo-1511988617509-a57c8a288659",
        "Friends gathered around a table",
        900,
      ),
      {
        src: "/effiel.png",
        alt: "A couple staring at effiel tower at sunset",
      },
      {
        src: "/football.png",
        alt: "A couple playing football together on a grass field",
      },
      {
        src: "/london.png",
        alt: "A couple stadning in front of riverdale london at night",
      },
    ],
  },
  {
    id: "message",
    title: "A promise to keep you mine.",
    body: "Through every version of us.\n\nThrough the easy days, the difficult ones, and everything still waiting for us.",
    note: "I’ll keep choosing you. Again and again.",
    layout: "portrait",
    box: "green",
    images: [
      {
        src: "/yatch.png",
        alt: "A couple stadning in front of riverdale london at night",
      },
    ],
  },
];

export const closingImage: GiftImage = photo(
  "photo-1500534314209-a25ddb2bd429",
  "A quiet mountain landscape in warm evening light",
  800,
);

export function giftById(id: string | null) {
  return gifts.find((gift) => gift.id === id) ?? null;
}
