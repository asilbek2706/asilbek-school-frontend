import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("/auth/login", "routes/login.tsx"),
    route("/login", "routes/login-redirect.tsx"),
    route("/about", "routes/about.tsx"),
    route("/courses", "routes/courses.tsx"),
    route("/courses/:courseTitle", "routes/courses/courseDetail.tsx"),
    route("/courses/:courseTitle/lessons/:lessonTitle", "routes/courses/lessons/lessonDetail.tsx"),
    route("/contact", "routes/contact.tsx"),
    route("/auth/verify", "routes/login/VerifyCodePage.tsx"),
    route("/auth/register", "routes/login/RegisterPage.tsx"),
    route("/auth/github", "routes/login/GitHubAuthStart.tsx"),
    route("/auth/github/callback", "routes/login/GitHubAuthCallback.tsx"),
] satisfies RouteConfig;