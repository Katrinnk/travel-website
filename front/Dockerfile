# Вказуємо базовий образ, в даному випадку використаємо nginx
FROM nginx:latest

# Встановлюємо робочу директорію в контейнері
WORKDIR /usr/share/nginx/html

# Копіюємо вміст папки public з вашого фронтенд проекту до робочої директорії контейнера
COPY public/ .

# Експонуємо порт 80 для доступу до сервера
EXPOSE 80

# Запускаємо nginx
CMD ["nginx", "-g", "daemon off;"]
