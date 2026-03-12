FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Copy dependency files first
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY . .

# Expose port
EXPOSE 5000

# Start Flask app using gunicorn
CMD ["gunicorn", "app:app", "--bind", "0.0.0.0:5000"]