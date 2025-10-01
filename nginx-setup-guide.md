# Nginx Setup Guide for Judicioworks.com

## Domain: Judicioworks.com
## IP Address: 72.60.103.43

## Prerequisites
- Ubuntu/CentOS server with root access
- Domain pointed to IP 72.60.103.43
- Nginx installed

## Step 1: Install Nginx

### Ubuntu/Debian:
```bash
sudo apt update
sudo apt install nginx
```

### CentOS/RHEL:
```bash
sudo yum install nginx
# or for newer versions
sudo dnf install nginx
```

## Step 2: Create Directory Structure

```bash
# Create website directory
sudo mkdir -p /var/www/judicioworks.com

# Set proper permissions
sudo chown -R www-data:www-data /var/www/judicioworks.com
sudo chmod -R 755 /var/www/judicioworks.com
```

## Step 3: Deploy Your Website

```bash
# Copy your built React app to the directory
# Replace 'path-to-your-built-app' with your actual build path
sudo cp -r /path-to-your-built-app/* /var/www/judicioworks.com/

# Set proper ownership
sudo chown -R www-data:www-data /var/www/judicioworks.com
```

## Step 4: Configure Nginx

```bash
# Copy the nginx configuration
sudo cp nginx.conf /etc/nginx/sites-available/judicioworks.com

# Enable the site
sudo ln -s /etc/nginx/sites-available/judicioworks.com /etc/nginx/sites-enabled/

# Remove default site (optional)
sudo rm /etc/nginx/sites-enabled/default
```

## Step 5: SSL Certificate Setup

### Option A: Let's Encrypt (Recommended - Free)
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d judicioworks.com -d www.judicioworks.com

# Auto-renewal
sudo crontab -e
# Add this line:
0 12 * * * /usr/bin/certbot renew --quiet
```

### Option B: Manual SSL Certificate
```bash
# Create SSL directory
sudo mkdir -p /etc/ssl/certs /etc/ssl/private

# Place your SSL certificate files:
# - Certificate: /etc/ssl/certs/judicioworks.com.crt
# - Private Key: /etc/ssl/private/judicioworks.com.key
```

## Step 6: Test and Start Nginx

```bash
# Test nginx configuration
sudo nginx -t

# If test passes, restart nginx
sudo systemctl restart nginx

# Enable nginx to start on boot
sudo systemctl enable nginx

# Check nginx status
sudo systemctl status nginx
```

## Step 7: Firewall Configuration

```bash
# Allow HTTP and HTTPS traffic
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw enable

# Or for CentOS/RHEL
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload
```

## Step 8: DNS Configuration

Make sure your domain DNS records are set up correctly:

### A Records:
- `judicioworks.com` → `72.60.103.43`
- `www.judicioworks.com` → `72.60.103.43`

### CNAME (Alternative):
- `www.judicioworks.com` → `judicioworks.com`

## Step 9: Backend API Setup (If Applicable)

If you have a backend API running on port 3000:

```bash
# Install PM2 for process management
sudo npm install -g pm2

# Start your backend
pm2 start your-backend-app.js

# Save PM2 configuration
pm2 save
pm2 startup
```

## Step 10: Monitoring and Logs

```bash
# Check nginx logs
sudo tail -f /var/log/nginx/judicioworks.com.access.log
sudo tail -f /var/log/nginx/judicioworks.com.error.log

# Check nginx status
sudo systemctl status nginx

# Check if nginx is listening on ports 80 and 443
sudo netstat -tlnp | grep nginx
```

## Troubleshooting

### Common Issues:

1. **Permission Denied:**
   ```bash
   sudo chown -R www-data:www-data /var/www/judicioworks.com
   sudo chmod -R 755 /var/www/judicioworks.com
   ```

2. **Nginx Configuration Error:**
   ```bash
   sudo nginx -t
   # Fix any errors shown, then restart
   sudo systemctl restart nginx
   ```

3. **SSL Certificate Issues:**
   ```bash
   # Check certificate validity
   openssl x509 -in /etc/ssl/certs/judicioworks.com.crt -text -noout
   ```

4. **Port Already in Use:**
   ```bash
   sudo lsof -i :80
   sudo lsof -i :443
   # Kill processes if needed
   ```

## Security Recommendations

1. **Keep nginx updated:**
   ```bash
   sudo apt update && sudo apt upgrade nginx
   ```

2. **Regular security audits:**
   ```bash
   sudo nginx -t
   sudo systemctl status nginx
   ```

3. **Monitor logs regularly:**
   ```bash
   sudo tail -f /var/log/nginx/access.log
   sudo tail -f /var/log/nginx/error.log
   ```

## Performance Optimization

1. **Enable gzip compression** (already in config)
2. **Set up caching** (already configured for static assets)
3. **Use CDN** for better global performance
4. **Monitor server resources:**
   ```bash
   htop
   df -h
   free -h
   ```

Your website should now be accessible at:
- http://judicioworks.com (redirects to HTTPS)
- https://judicioworks.com
- https://www.judicioworks.com (redirects to main domain)
