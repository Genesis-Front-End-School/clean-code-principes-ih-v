import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";

import { ICourse } from "../../types";

import Error from "../../components/Error";

import CorseDescription from "./CorseDescription";
import CourseFallback from "./CourseFallback";
import LessonsList from "./LessonsList";

type CourseItemData = {
  course: Promise<ICourse>;
};

const Course = () => {
  const { course } = useLoaderData() as CourseItemData;

  return (
    <Suspense fallback={<CourseFallback />}>
      <Await resolve={course} errorElement={<Error />}>
        <CorseDescription />
        <LessonsList />
      </Await>
    </Suspense>
  );
};

export default Course;
