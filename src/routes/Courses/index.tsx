import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";

import { ICoursePreview } from "../../types";

import Error from "../../components/Error";

import CoursesFallback from "./CoursesFallback";
import CoursesList from "./CoursesList";
import CoursesToolbar from "./CoursesToolbar";

type CoursesListData = {
  courses: Promise<ICoursePreview[]>;
};

const Courses = () => {
  const { courses } = useLoaderData() as CoursesListData;
  return (
    <>
      <CoursesToolbar />
      <Suspense fallback={<CoursesFallback />}>
        <Await resolve={courses} errorElement={<Error />}>
          <CoursesList />
        </Await>
      </Suspense>
    </>
  );
};

export default Courses;
