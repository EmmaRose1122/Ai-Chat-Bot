# WhatsApp AI Messenger Web App

A modern web application for managing WhatsApp conversations with AI-powered responses.

## Quick Setup

### Windows Users
1. Double-click `setup.bat` to install all dependencies
2. Wait for the installation to complete
3. Run `npm start` to start the application

### Linux/Mac Users
1. Open terminal in the project directory
2. Make the setup script executable: `chmod +x setup.sh`
3. Run the setup script: `./setup.sh`
4. Wait for the installation to complete
5. Run `npm start` to start the application

## Features

### Basic Features
- QR Code login for WhatsApp
- API keys management for different AI models
- Switchable AI models (ChatGPT, Gemini)
- Manual/Auto response options

### AI Chatbot Capabilities
- Natural language processing
- Context-aware responses
- Multi-language support
- Customizable response templates

### Business Training Prompts
- E-Commerce
- Restaurant
- Real Estate
- Property Management
- Clinic
- Pharmacy
- Pizza Shop
- Digital Marketing
- Clothing Store
- Electronics Store
- Gym
- Beauty Salon
- Travel and Tours
- Book Store
- Healthcare

### Technical Features
- Responsive design
- Real-time chat
- Message history
- File sharing support
- Dark/Light theme

## Dependencies
- React with TypeScript
- Material-UI for components
- Zustand for state management
- Axios for API calls

## Development
1. Clone the repository
2. Run the setup script for your platform
3. Start the development server with `npm start`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Building for Production
1. Run `npm run build`
2. The build files will be in the `build` directory

## Troubleshooting
If you encounter any issues during setup:
1. Make sure Node.js and npm are installed
2. Try running the setup script again
3. Check the console for error messages
4. Ensure you have proper permissions to install packages 

## Electron Packaging
1. Run `npm run preelectron-pack` to build and copy the Electron main file
2. Run `npm run electron-pack` to package the Electron application

## Updated package.json
```json
{
  "scripts": {
    "preelectron-pack": "npm run build && copy electron\\main.js build\\electron\\main.js",
    "electron-pack": "electron-builder -c.extraMetadata.main=build/electron/main.js",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  },
  "main": "build/electron/main.js",
  "homepage": "https://mateenali248.github.io/Ai-chat-Bot/"
}
``` 