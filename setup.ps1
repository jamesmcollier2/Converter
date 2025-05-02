# Converter App Installer for Windows
Write-Host "
  _____                          _            
 / ____|                        | |           
| |     ___  _ ____   _____ _ __| |_ ___ _ __ 
| |    / _ \| '_ \ \ / / _ \ '__| __/ _ \ '__|
| |___| (_) | | | \ V /  __/ |  | ||  __/ |   
 \_____\___/|_| |_|\_/ \___|_|   \__\___|_|   
                                              
            Installation Script                      
" -ForegroundColor Cyan

# Create temporary directory
$tempDir = [System.IO.Path]::GetTempPath() + [System.Guid]::NewGuid().ToString()
New-Item -ItemType Directory -Path $tempDir | Out-Null
Set-Location $tempDir

# Check if Node.js is installed
$nodeInstalled = $null -ne (Get-Command node -ErrorAction SilentlyContinue)

if ($nodeInstalled) {
    $nodeVersion = (node -v)
    Write-Host "Node.js $nodeVersion is already installed." -ForegroundColor Green
} else {
    Write-Host "Node.js not found. Installing..." -ForegroundColor Blue
    
    # Check if Chocolatey is installed
    $chocoInstalled = $null -ne (Get-Command choco -ErrorAction SilentlyContinue)
    
    if (-not $chocoInstalled) {
        Write-Host "Installing Chocolatey package manager..." -ForegroundColor Blue
        Set-ExecutionPolicy Bypass -Scope Process -Force
        [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
        Invoke-Expression ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
    }
    
    # Install Node.js using Chocolatey
    Write-Host "Installing Node.js via Chocolatey..." -ForegroundColor Blue
    choco install nodejs -y
    
    # Refresh environment variables to make node available in current session
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
    
    # Verify installation
    $nodeInstalled = $null -ne (Get-Command node -ErrorAction SilentlyContinue)
    if ($nodeInstalled) {
        $nodeVersion = (node -v)
        Write-Host "Node.js $nodeVersion installed successfully." -ForegroundColor Green
    } else {
        Write-Host "Failed to install Node.js. Please install it manually." -ForegroundColor Red
        exit 1
    }
}

# Check if Git is installed
$gitInstalled = $null -ne (Get-Command git -ErrorAction SilentlyContinue)

if (-not $gitInstalled) {
    Write-Host "Git not found. Installing..." -ForegroundColor Blue
    choco install git -y
    
    # Refresh environment variables
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
    
    $gitInstalled = $null -ne (Get-Command git -ErrorAction SilentlyContinue)
    if (-not $gitInstalled) {
        Write-Host "Failed to install Git. Please install it manually." -ForegroundColor Red
        exit 1
    }
}

# Clone repository
Write-Host "Cloning the Converter repository..." -ForegroundColor Blue
git clone https://github.com/jamesmcollier2/converter.git
Set-Location converter

# Install dependencies
Write-Host "Installing dependencies..." -ForegroundColor Blue
npm install

# Build for production
Write-Host "Building the application..." -ForegroundColor Blue
npm run build

# Start the application
Write-Host "Starting Converter..." -ForegroundColor Green
npm start

Write-Host "Installation complete! You can run Converter again by navigating to the installation directory and running 'npm start'." -ForegroundColor Green 