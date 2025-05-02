# Converter

A modern, intuitive unit conversion desktop application built with Electron.

![Converter App Screenshot](https://via.placeholder.com/800x450.png?text=Converter+App+Screenshot)

## Features

- **Versatile Conversions**: Convert between units of length, temperature, weight, volume, and more

- **Real-time Results**: See conversion results instantly as you type
- **Customizable Experience**: 
  - Toggle between dark and light modes
  - Adjust decimal precision to your needs
  
- **Clean Interface**: Modern, intuitive design that's easy to navigate
- **Cross-Platform**: Works on Windows, macOS, and Linux

## Installation

### Download Pre-built Binaries

Download the latest release for your platform from the [Releases](https://github.com/jamesmcollier2/converter/releases) page.

### One-Command Installation

No need to install Node.js or any dependencies manually! Our setup script automatically handles everything for you:

#### macOS/Linux:
```bash
curl -fsSL https://raw.githubusercontent.com/jamesmcollier2/converter/main/setup.sh | bash
```

#### Windows:
```powershell
powershell -ExecutionPolicy Bypass -Command "iwr -useb https://raw.githubusercontent.com/jamesmcollier2/converter/main/setup.ps1 | iex"
```

The script will:
1. Check if Node.js is installed
2. Install Node.js automatically if needed
3. Clone the repository
4. Install dependencies
5. Build and start the application

### Manual Build (for developers)

If you prefer to manually build the application:

#### Prerequisites

- Node.js (v14.0.0 or later)
- npm (included with Node.js)

#### Steps

1. Clone this repository
   ```bash
   git clone https://github.com/jamesmcollier2/converter.git
   cd converter
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development version
   ```bash
   npm start
   ```

4. Build production packages
   ```bash
   npm run build
   ```
   This will create installers in the `dist` directory:
   - For macOS: `.dmg` file
   - For Windows: `.exe` installer

## Usage Guide

1. **Select a Category**: Choose from the unit categories at the top (length, temperature, etc.)
2. **Enter a Value**: Type your value in the input field
3. **Choose Units**: Select both the source and target units
4. **View Result**: The converted value appears automatically
5. **Adjust Precision**: Use the precision slider to show more or fewer decimal places
6. **Change Theme**: Toggle between light and dark modes using the theme switch

## Development

### Project Structure

- `index.html` - Main application UI
- `renderer.js` - Frontend logic and conversion calculations
- `electron-main.js` - Electron main process script
- `style.css` - Application styling
- `setup.sh` - Automatic setup script for macOS/Linux
- `setup.ps1` - Automatic setup script for Windows

### Technologies Used

- Electron - Cross-platform desktop app framework
- HTML/CSS/JavaScript - Frontend development

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to all contributors who have helped improve this project
- Built with [Electron](https://www.electronjs.org/) 