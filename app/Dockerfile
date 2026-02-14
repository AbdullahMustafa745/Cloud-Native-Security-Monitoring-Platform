# Use lightweight image to reduce attack surface
FROM node:lts-alpine

WORKDIR /usr/src/app

# Copy dependency file first
COPY package.json .

# Install only production dependencies
RUN npm install --only=production

# Copy application code
COPY index.js .

# Create non-root user 
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Switch to non-root user
USER appuser

EXPOSE 3000

CMD ["node", "index.js"]

