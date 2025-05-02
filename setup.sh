#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}███████╗████████╗ █████╗ ██████╗ ████████╗██╗███╗   ██╗ ██████╗ ${NC}"
echo -e "${BLUE}██╔════╝╚══██╔══╝██╔══██╗██╔══██╗╚══██╔══╝██║████╗  ██║██╔════╝ ${NC}"
echo -e "${BLUE}███████╗   ██║   ███████║██████╔╝   ██║   ██║██╔██╗ ██║██║  ███╗${NC}"
echo -e "${BLUE}╚════██║   ██║   ██╔══██║██╔══██╗   ██║   ██║██║╚██╗██║██║   ██║${NC}"
echo -e "${BLUE}███████║   ██║   ██║  ██║██║  ██║   ██║   ██║██║ ╚████║╚██████╔╝${NC}"
echo -e "${BLUE}╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝╚═╝  ╚═══╝ ╚═════╝ ${NC}"
echo -e "${GREEN}                  Converter App Installer${NC}\n"

# Create temporary directory
TEMP_DIR=$(mktemp -d)
cd "$TEMP_DIR"

# Check if Node.js is installed
if command -v node >/dev/null 2>&1; then
    NODE_VERSION=$(node -v)
    echo -e "${GREEN}Node.js $NODE_VERSION is already installed.${NC}"
else
    echo -e "${BLUE}Node.js not found. Installing...${NC}"
    
    # Detect OS
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        if command -v brew >/dev/null 2>&1; then
            echo "Installing Node.js via Homebrew..."
            brew install node
        else
            echo "Installing Homebrew..."
            /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
            echo "Installing Node.js via Homebrew..."
            brew install node
        fi
    else
        # Linux
        echo "Installing Node.js via nvm..."
        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
        export NVM_DIR="$HOME/.nvm"
        [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
        nvm install 14
        nvm use 14
    fi
    
    # Verify installation
    if command -v node >/dev/null 2>&1; then
        NODE_VERSION=$(node -v)
        echo -e "${GREEN}Node.js $NODE_VERSION installed successfully.${NC}"
    else
        echo -e "${RED}Failed to install Node.js. Please install it manually.${NC}"
        exit 1
    fi
fi

# Clone repository
echo -e "${BLUE}Cloning the Converter repository...${NC}"
git clone https://github.com/jamesmcollier2/converter.git
cd converter

# Install dependencies
echo -e "${BLUE}Installing dependencies...${NC}"
npm install

# Build for production
echo -e "${BLUE}Building the application...${NC}"
npm run build

# Start the application
echo -e "${GREEN}Starting Converter...${NC}"
npm start

echo -e "${GREEN}Installation complete! You can run Converter again by navigating to the installation directory and running 'npm start'.${NC}" 