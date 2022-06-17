# Set the base image to node:12-alpine
FROM node:12-alpine AS build

ARG HTTP_PROXY
ARG HTTPS_PROXY

# Specify where our app will live in the container
WORKDIR /app

# Copy the React App to the container
COPY . /app/

# Prepare the container for building React
RUN npm install
# We want the production version
RUN npm run build

FROM nginx:1.20.0-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Fire up nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
