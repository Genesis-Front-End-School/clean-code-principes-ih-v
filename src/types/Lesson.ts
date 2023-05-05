export interface ILesson {
  id: string;
  title: string;
  duration: number;
  order: number;
  type: string;
  status: "unlocked" | "locked";
  link?: string;
  previewImageLink: string;
  meta: { difficulty?: string } | null;
}
