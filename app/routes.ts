import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("/login", "routes/login.tsx") ,
    route("/about", "routes/about.tsx"),
    route("/courses", "routes/courses.tsx"),
    // route("/courses/:id", "routes/courses.tsx"),
    route("/faq", "routes/faq.tsx"),
    route("/contact", "routes/contact.tsx"),
] satisfies RouteConfig;