# Используем официальный образ Node.js в качестве базового образа
FROM node:18

# Устанавливаем рабочую директорию в контейнере
WORKDIR /app

# Копируем файлы package.json и package-lock.json (если есть)
COPY package*.json ./

# Устанавливаем зависимости проекта
RUN npm install

# Копируем оставшиеся файлы проекта в контейнер
COPY . .

# Собираем приложение для продакшена
RUN npm run build

# Используем образ Nginx для раздачи статики
FROM nginx:stable-alpine

# Копируем собранные файлы из предыдущего этапа
COPY --from=0 /app/build /usr/share/nginx/html

# Открываем порт 80 для доступа к приложению
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
