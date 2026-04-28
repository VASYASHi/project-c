import type { NextConfig } from "next";

const nextConfig = {
  output: "export",          // ✅ Превращает Next.js в статический сайт
  basePath: "/project-c",    // ✅ Имя твоего репозитория
  assetPrefix: "/project-c/",// ✅ Пути к стилям/скриптам
  trailingSlash: true,       // ✅ Избегает 404 при обновлении страниц
  images: {
    unoptimized: true,       // ✅ Отключает серверную оптимизацию картинок
  },
};

export default nextConfig;
