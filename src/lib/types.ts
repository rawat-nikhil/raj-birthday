export type Phase =
  | "intro"
  | "gift-selection"
  | "opening-gift"
  | "gift-reveal"
  | "final";

export type GiftLayout = "editorial" | "collage" | "portrait";

export type GiftBoxTone = "red" | "black" | "green";

export type GiftImage = {
  src: string;
  alt: string;
};

export type Gift = {
  id: string;
  title: string;
  body: string;
  note: string;
  layout: GiftLayout;
  box: GiftBoxTone;
  images: GiftImage[];
};
