import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("/login", "routes/login.tsx") ,
    route("/about", "routes/about.tsx"),
    route("/courses", "routes/courses.tsx"),
    route("/courses/:courseTitle", "routes/courses/courseDetail.tsx"),
    route("/courses/:courseTitle/lessons/:lessonTitle", "routes/courses/lessons/lessonDetail.tsx"),
    route("/contact", "routes/contact.tsx"),
    route("/login/verify", "routes/login/VerifyCodePage.tsx"),
    route("/login/register", "routes/login/RegisterPage.tsx"),
    route("/login/github", "routes/login/GitHubAuthStart.tsx"),
    route("/login/github/callback", "routes/login/GitHubAuthCallback.tsx"),
] satisfies RouteConfig;