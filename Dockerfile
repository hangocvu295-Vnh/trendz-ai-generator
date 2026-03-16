# 1. Sử dụng image Nginx làm server (nhẹ và cực nhanh)
FROM nginx:alpine

# 2. Copy toàn bộ file trong thư mục hiện tại vào thư mục web của Nginx
COPY . /usr/share/nginx/html

# 3. Mở cổng 80 cho web server
EXPOSE 80

# 4. Chạy Nginx
CMD ["nginx", "-g", "daemon off;"]