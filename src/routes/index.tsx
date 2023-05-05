import { createHashRouter, defer, LoaderFunctionArgs } from "react-router-dom";

import { getAll, getById } from "../api/courses.api";

import Error from "../components/Error";

import Root from "./Root";
import Courses from "./Courses";
import Course from "./Course";

const coursesLoader = async () => {
  return defer({
    courses: getAll(),
  });
};

const courseLoader = async ({ params }: LoaderFunctionArgs) => {
  return defer({
    course: getById(params.courseId),
  });
};

const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: "",
        element: <Courses />,
        loader: coursesLoader,
      },
      {
        path: "course/:courseId",
        element: <Course />,
        loader: courseLoader,
      },
    ],
  },
]);

export default router;
