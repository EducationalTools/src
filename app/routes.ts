import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("tools/calculator", "routes/tools/calculator.tsx"),
  route("tools/unit-converter", "routes/tools/unit-converter.tsx"),
  route("tools/word-counter", "routes/tools/word-counter.tsx"),
  route("tools/password-generator", "routes/tools/password-generator.tsx"),
  route("tools/random-number", "routes/tools/random-number.tsx"),
  route("tools/stopwatch-timer", "routes/tools/stopwatch-timer.tsx"),
  route("tools/base64-converter", "routes/tools/base64-converter.tsx"),
  route("tools/color-picker", "routes/tools/color-picker.tsx"),
  route("g", "routes/g/index.tsx"),
  route("g/:id", "routes/g/play.tsx"),
  route("auth/:pathname", "routes/auth/auth-view.tsx"),
  route("account/:pathname", "routes/auth/account-view.tsx"),
  route("ott", "routes/auth/ott.tsx"),
  route("backups", "routes/backups/page.tsx"),
  route("admin", "routes/admin/page.tsx"),
  route("about", "routes/about/page.tsx"),
  route("privacy", "routes/privacy/page.tsx"),
] satisfies RouteConfig;
