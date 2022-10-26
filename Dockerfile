FROM nginx:latest as smallimage
COPY dist/ app/
COPY nginx.conf /etc/nginx/conf.d/default.conf
