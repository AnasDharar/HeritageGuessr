export type Coordinates = { latitude: number; longitude: number };

export type StorySlide = {
  title: string;
  content: string;
  image: string;
  image_caption: string;
};

export type HeritageLocation = {
  id: number;
  name: string;
  location: string;
  url: string;
  title: string;
  year: number;
  coordinates: Coordinates;
  description: string;
  difficulty: "easy" | "medium" | "hard" | string;
  "slide-data": StorySlide[];
};

export type HeritageDataset = { images: HeritageLocation[] };
export type Guess = { latitude: number; longitude: number };
