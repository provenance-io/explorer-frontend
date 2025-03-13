FROM nginx:alpine

ADD dist/ /usr/share/nginx/html/

COPY nginx.conf /etc/nginx/nginx.conf
