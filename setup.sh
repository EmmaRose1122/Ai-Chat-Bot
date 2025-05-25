#!/bin/bash

echo "Installing dependencies for WhatsApp AI Messenger..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed! Please install Node.js first."
    echo "Download from: https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "npm is not installed! Please install npm first."
    exit 1
fi

# Remove existing node_modules and package-lock.json if they exist
if [ -d "node_modules" ]; then
    echo "Removing existing node_modules..."
    rm -rf node_modules
fi

if [ -f "package-lock.json" ]; then
    echo "Removing existing package-lock.json..."
    rm package-lock.json
fi

# Install dependencies
echo "Installing dependencies..."
npm install

# Check if installation was successful
if [ $? -eq 0 ]; then
    echo
    echo "Dependencies installed successfully!"
    echo
    echo "To start the application, run: npm start"
else
    echo
    echo "There was an error installing dependencies."
    echo "Please check the error messages above."
fi

echo "Building the application..."
npm run build

echo "Creating desktop application..."
npm run electron-pack

echo "Setup completed!"
echo "The installer can be found in the dist folder." 