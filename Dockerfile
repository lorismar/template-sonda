FROM registro.tjro.jus.br/tjro/stic/dsi/dinq/nginx:16
ENV TZ="America/Porto_Velho"
COPY ./src/assets /usr/share/nginx/html/assets
COPY ./dist/sgc-frontend /usr/share/nginx/html/sgc
COPY ./nginx.conf /etc/nginx/nginx.conf
