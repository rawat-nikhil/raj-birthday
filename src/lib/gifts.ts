import type { Gift, GiftImage } from "@/lib/types";

const photo = (id: string, alt: string, width = 1200): GiftImage => ({
  src: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80`,
  alt,
});

export const gifts: Gift[] = [
  {
    id: "adventures",
    title: "New Places Together",
    body: "More trips, more stories, more sunsets, more of you in my life.",
    note: "For more adventures →",
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
    title: "Good Friends,\nBigger Memories",
    body: "From football matches to random plans, thank you for always making life more fun.",
    note: "",
    layout: "collage",
    box: "black",
    images: [
      {
        src: "/effiel.png",
        alt: "A couple staring at effiel tower at sunset",
      },
      {
        src: "/football.png",
        alt: "A couple playing football together on a grass field",
      },

      photo(
        "photo-1526232761682-d26e03ac148e",
        "Friends sitting together on a sunny day",
        900,
      ),
      photo(
        "photo-1511988617509-a57c8a288659",
        "Friends gathered around a table",
        900,
      ),
    ],
  },
  {
    id: "message",
    title: "Keep Being You, Raj.",
    body: "Kind, fun, loyal, inspiring — and completely one of a kind.\n\nYou make life brighter for everyone around you.\n\nHere’s to everything you’re yet to achieve.",
    note: "Same passion. Bigger dreams.",
    layout: "portrait",
    box: "green",
    images: [
      photo(
        "photo-1500648767791-00dcc994a43e",
        "A warm portrait of a smiling man",
        1000,
      ),
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
