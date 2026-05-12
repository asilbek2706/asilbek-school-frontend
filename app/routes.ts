import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("/login", "routes/login.tsx") ,
    route("/about", "routes/about.tsx"),
    route("/courses", "routes/courses.tsx"),
    route("/courses/:id", "routes/courses/courseDetail.tsx"),
    route("/courses/:id/lessons/:lessonTitle", "routes/courses/lessons/lessonDetail.tsx"),
    route("/contact", "routes/contact.tsx"),
] satisfies RouteConfig;