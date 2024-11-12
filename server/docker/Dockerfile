FROM nginx

# Copy your custom nginx configuration
COPY ./nginx.conf /etc/nginx/nginx.conf

# Create the sites directory
RUN mkdir -p /etc/nginx/sites

# Optional: Copy site configuration files to the sites directory if needed
# COPY ./sites/* /etc/nginx/sites/

# Set the working directory (not strictly necessary)
WORKDIR /etc/nginx

#RUN nginx -s reload


