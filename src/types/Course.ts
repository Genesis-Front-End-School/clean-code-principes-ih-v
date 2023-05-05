import { ILesson } from "./Lesson";

export interface ICourseVideoPreview {
  link: string;
  duration: number;
  previewImageLink: string;
}

export interface ICourseMeta {
  slug: string;
  skills?: string[];
  courseVideoPreview?: ICourseVideoPreview;
}

export interface ICourse {
  id: string;
  title: string;
  tags: string[];
  launchDate: Date;
  status: string;
  description: string;
  duration: number;
  previewImageLink: string;
  rating: number;
  meta: ICourseMeta;
  lessons: ILesson[];
  containsLockedLessons: boolean;
}

export interface ICoursePreview extends Omit<ICourse, "lessons"> {
  lessonsCount: number;
}
