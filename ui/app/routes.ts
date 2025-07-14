import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/api/prd", "routes/api/prd.ts"),
] satisfies RouteConfig;
