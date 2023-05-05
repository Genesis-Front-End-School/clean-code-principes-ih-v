import { ICourse, ICoursePreview } from "../types";
import baseApi from "./base.api";

export const getAll = async (): Promise<ICoursePreview[]> => {
  const result = await baseApi.get("/core/preview-courses");
  return result.data.courses;
};

export const getById = async (id: string | undefined): Promise<ICourse> => {
  if (!id) {
    throw new Error("id: corrupted");
  }
  const result = await baseApi.get(`/core/preview-courses/${id}`);
  const launchDate = result?.data?.launchDate;
  if (launchDate) {
    result.data.launchDate = new Date(launchDate);
  }
  return result.data;
};
