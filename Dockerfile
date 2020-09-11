# Our first stage, that is the Builder
FROM node:current-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD [ "npm", "run", "dev" ]


# Our Second stage, that creates an image for production
FROM node:current-alpine AS auth-service-prod
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000
COPY package*.json ./
RUN npm install --production
COPY --from=builder ./app/dist ./dist
CMD ["npm", "start"]
