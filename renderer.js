// This file will contain all the browser window (renderer process) code
// Move all the DOM manipulation and event handling code here

// Set up IPC for communication with main process
const { ipcRenderer } = require('electron');

// Example of how to structure the code:
document.addEventListener('DOMContentLoaded', () => {
    // Unit conversion logic
    const conversionFactors = {
        length: {
            meters: 1,
            kilometers: 1000,
            centimeters: 0.01,
            millimeters: 0.001,
            miles: 1609.34,
            yards: 0.9144,
            feet: 0.3048,
            inches: 0.0254,
            nauticalMiles: 1852,
            micrometers: 0.000001,
            nanometers: 0.000000001,
            lightYears: 9460730472580800,
            astronomicalUnits: 149597870700,
            parsecs: 30856775814913673
        },
        temperature: {
            celsius: {
                toBase: (value) => value,
                fromBase: (value) => value
            },
            fahrenheit: {
                toBase: (value) => (value - 32) * 5/9,
                fromBase: (value) => value * 9/5 + 32
            },
            kelvin: {
                toBase: (value) => value - 273.15,
                fromBase: (value) => value + 273.15
            },
            rankine: {
                toBase: (value) => (value - 491.67) * 5/9,
                fromBase: (value) => (value * 9/5) + 491.67
            },
            reaumur: {
                toBase: (value) => value * 1.25,
                fromBase: (value) => value * 0.8
            }
        },
        weight: {
            kilograms: 1,
            grams: 0.001,
            milligrams: 0.000001,
            pounds: 0.453592,
            ounces: 0.0283495,
            tons: 907.185,
            metricTons: 1000,
            micrograms: 0.000000001,
            stone: 6.35029,
            carats: 0.0002,
            atomicMassUnits: 1.66053886e-27,
            megaelectronvoltsPerC2: 1.78266192e-30  // 1 MeV/c² = 1.78266192e-30 kg
        },
        volume: {
            liters: 1,
            milliliters: 0.001,
            cubicMeters: 1000,
            gallons: 3.78541,
            quarts: 0.946353,
            pints: 0.473176,
            cups: 0.236588,
            fluidOunces: 0.0295735,
            cubicCentimeters: 0.001,
            cubicInches: 0.0163871,
            cubicFeet: 28.3168,
            cubicYards: 764.555,
            barrels: 158.987,
            teaspoons: 0.00492892,
            tablespoons: 0.0147868
        },
        area: {
            squareMeters: 1,
            squareKilometers: 1000000,
            squareCentimeters: 0.0001,
            squareMillimeters: 0.000001,
            squareMiles: 2589988.11,
            squareYards: 0.836127,
            squareFeet: 0.092903,
            squareInches: 0.00064516,
            acres: 4046.86,
            hectares: 10000,
            squareNauticalMiles: 3429904,
            squareRods: 25.2929,
            squareChains: 404.686,
            squareFurlongs: 40468.6
        },
        speed: {
            metersPerSecond: 1,
            kilometersPerHour: 0.277778,
            milesPerHour: 0.44704,
            feetPerSecond: 0.3048,
            knots: 0.514444,
            mach: 340.3,
            lightSpeed: 299792458,
            inchesPerSecond: 0.0254,
            yardsPerSecond: 0.9144,
            kilometersPerSecond: 1000,
            milesPerSecond: 1609.34
        },
        pressure: {
            pascals: 1,
            kilopascals: 1000,
            megapascals: 1000000,
            bars: 100000,
            psi: 6894.76,
            atmospheres: 101325,
            torr: 133.322,
            millimetersOfMercury: 133.322,
            inchesOfMercury: 3386.39,
            dynesPerSquareCentimeter: 0.1,
            technicalAtmospheres: 98066.5
        },
        energy: {
            joules: 1,
            kilojoules: 1000,
            calories: 4.184,
            kilocalories: 4184,
            wattHours: 3600,
            kilowattHours: 3600000,
            btu: 1055.06,
            electronVolts: 1.602176634e-19,
            ergs: 0.0000001,
            footPounds: 1.35582,
            newtonMeters: 1,
            therm: 105505585.262
        },
        power: {
            watts: 1,
            kilowatts: 1000,
            megawatts: 1000000,
            horsepower: 745.7,
            footPoundsPerSecond: 1.35582,
            btuPerHour: 0.2930711,
            caloriesPerSecond: 4.1868,
            ergsPerSecond: 0.0000001,
            metricHorsepower: 735.499,
            boilerHorsepower: 9812.5
        },
        time: {
            seconds: 1,
            minutes: 60,
            hours: 3600,
            days: 86400,
            weeks: 604800,
            months: 2629746,
            years: 31556952,
            decades: 315569520,
            centuries: 3155695200,
            milliseconds: 0.001,
            microseconds: 0.000001,
            nanoseconds: 0.000000001,
            picoseconds: 0.000000000001
        },
        data: {
            bytes: 1,
            kilobytes: 1024,
            megabytes: 1048576,
            gigabytes: 1073741824,
            terabytes: 1099511627776,
            petabytes: 1125899906842624,
            exabytes: 1152921504606846976,
            zettabytes: 1180591620717411303424,
            yottabytes: 1208925819614629174706176,
            bits: 0.125,
            nibbles: 0.5
        },
        frequency: {
            hertz: 1,
            kilohertz: 1000,
            megahertz: 1000000,
            gigahertz: 1000000000,
            terahertz: 1000000000000,
            cyclesPerSecond: 1,
            revolutionsPerMinute: 0.0166667,
            radiansPerSecond: 0.159155,
            degreesPerSecond: 0.00277778
        },
        angle: {
            degrees: 1,
            radians: 57.2958,
            gradians: 0.9,
            arcminutes: 0.0166667,
            arcseconds: 0.000277778,
            revolutions: 360,
            quadrants: 90,
            sextants: 60,
            octants: 45
        },
        fuel: {
            litersPer100km: 1,
            milesPerGallon: 235.215,
            kilometersPerLiter: 100,
            gallonsPer100Miles: 235.215,
            milesPerGallonImperial: 282.481,
            litersPerMile: 0.425144,
            kilometersPerGallon: 0.425144
        },
        cooking: {
            teaspoons: 1,
            tablespoons: 3,
            fluidOunces: 6,
            cups: 48,
            pints: 96,
            quarts: 192,
            gallons: 768,
            milliliters: 4.92892,
            liters: 0.00492892,
            drops: 0.05,
            dashes: 0.125,
            pinches: 0.0625,
            smidgens: 0.03125,
            cupsMetric: 48.6922,
            millilitersMetric: 5,
            jigger: 9  // 1 jigger = 1.5 fl oz = 9 teaspoons
        },
        currency: {
            USD: 1.0,
            EUR: 0.93,
            GBP: 0.79,
            JPY: 151.61,
            AUD: 1.52,
            CAD: 1.36,
            CHF: 0.90,
            CNY: 7.24,
            INR: 83.30,
            NZD: 1.66,
            SGD: 1.35,
            KRW: 1349.50,
            MXN: 16.66,
            BRL: 5.05,
            RUB: 92.50,
            ZAR: 18.85,
            AED: 3.67,
            SAR: 3.75,
            HKD: 7.82,
            SEK: 10.85,
            NOK: 10.95,
            DKK: 6.88,
            PLN: 4.02,
            TRY: 32.45,
            THB: 36.85,
            MYR: 4.78,
            IDR: 16195.00,
            PHP: 57.50,
            VND: 24750.00
        },
        crypto: {
            BTC: 1.0,
            ETH: 0.0,
            XRP: 0.0,
            LTC: 0.0,
            BCH: 0.0,
            ADA: 0.0,
            DOT: 0.0,
            SOL: 0.0,
            DOGE: 0.0,
            USDT: 0.0
        }
    };

    // DOM Elements
    const inputValue = document.getElementById('inputValue');
    const inputUnit = document.getElementById('inputUnit');
    const outputValue = document.getElementById('outputValue');
    const outputUnit = document.getElementById('outputUnit');
    const accuracySlider = document.getElementById('accuracySlider');
    const accuracyValue = document.getElementById('accuracyValue');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const themeToggle = document.getElementById('themeToggle');
    const decreaseAccuracy = document.getElementById('decreaseAccuracy');
    const increaseAccuracy = document.getElementById('increaseAccuracy');
    const closeBtn = document.getElementById('closeBtn');

    let currentCategory = 'length';
    let precision = 4;
    let isDarkMode = false;
    let exchangeRates = null;
    let cryptoRates = null;

    // Fetch exchange rates
    async function fetchExchangeRates() {
        try {
            const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
            const data = await response.json();
            exchangeRates = data.rates;
            // Update currency conversion factors
            Object.keys(exchangeRates).forEach(currency => {
                conversionFactors.currency[currency] = exchangeRates[currency];
            });
            // If we're currently on currency category, update the conversion
            if (currentCategory === 'currency') {
                convertValue();
            }
        } catch (error) {
            console.error('Error fetching exchange rates:', error);
            // Use default rates if API fails
            exchangeRates = conversionFactors.currency;
        }
    }

    // Fetch crypto rates
    async function fetchCryptoRates() {
        try {
            const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,ripple,litecoin,bitcoin-cash,cardano,polkadot,solana,dogecoin,tether&vs_currencies=usd');
            const data = await response.json();
            
            // Map API response to our conversion factors
            cryptoRates = {
                BTC: 1.0,
                ETH: data.ethereum.usd / data.bitcoin.usd,
                XRP: data.ripple.usd / data.bitcoin.usd,
                LTC: data.litecoin.usd / data.bitcoin.usd,
                BCH: data['bitcoin-cash'].usd / data.bitcoin.usd,
                ADA: data.cardano.usd / data.bitcoin.usd,
                DOT: data.polkadot.usd / data.bitcoin.usd,
                SOL: data.solana.usd / data.bitcoin.usd,
                DOGE: data.dogecoin.usd / data.bitcoin.usd,
                USDT: data.tether.usd / data.bitcoin.usd
            };
            
            // Update cryptocurrency conversion factors
            Object.keys(cryptoRates).forEach(crypto => {
                conversionFactors.crypto[crypto] = cryptoRates[crypto];
            });
            
            // If we're currently on crypto category, update the conversion
            if (currentCategory === 'crypto') {
                convertValue();
            }
        } catch (error) {
            console.error('Error fetching crypto rates:', error);
            // Use default rates if API fails
            cryptoRates = conversionFactors.crypto;
        }
    }

    // Initialize units for the current category
    function initializeUnits() {
        if (!conversionFactors[currentCategory]) {
            alert('This conversion category is not yet implemented');
            return;
        }

        const units = Object.keys(conversionFactors[currentCategory]);
        inputUnit.innerHTML = units.map(unit => `<option value="${unit}">${unit}</option>`).join('');
        outputUnit.innerHTML = units.map(unit => `<option value="${unit}">${unit}</option>`).join('');
        
        // Set default units for each category
        const defaultUnits = {
            length: { input: 'meters', output: 'feet' },
            temperature: { input: 'celsius', output: 'fahrenheit' },
            weight: { input: 'kilograms', output: 'pounds' },
            volume: { input: 'liters', output: 'gallons' },
            area: { input: 'squareMeters', output: 'squareFeet' },
            speed: { input: 'metersPerSecond', output: 'milesPerHour' },
            pressure: { input: 'pascals', output: 'psi' },
            energy: { input: 'joules', output: 'calories' },
            power: { input: 'watts', output: 'horsepower' },
            time: { input: 'seconds', output: 'minutes' },
            data: { input: 'bytes', output: 'kilobytes' },
            frequency: { input: 'hertz', output: 'kilohertz' },
            angle: { input: 'degrees', output: 'radians' },
            fuel: { input: 'litersPer100km', output: 'milesPerGallon' },
            cooking: { input: 'teaspoons', output: 'tablespoons' },
            currency: { input: 'USD', output: 'EUR' },
            crypto: { input: 'BTC', output: 'ETH' }
        };

        if (defaultUnits[currentCategory]) {
            inputUnit.value = defaultUnits[currentCategory].input;
            outputUnit.value = defaultUnits[currentCategory].output;
        }
    }

    // Convert value based on current category
    function convertValue() {
        const value = parseFloat(inputValue.value);
        if (isNaN(value)) {
            outputValue.value = '';
            return;
        }

        let result;
        if (currentCategory === 'temperature') {
            const baseValue = conversionFactors.temperature[inputUnit.value].toBase(value);
            result = conversionFactors.temperature[outputUnit.value].fromBase(baseValue);
        } else if (currentCategory === 'currency') {
            // For currency, we need to convert through USD as base
            const usdValue = value / conversionFactors.currency[inputUnit.value];
            result = usdValue * conversionFactors.currency[outputUnit.value];
        } else if (currentCategory === 'crypto') {
            // For crypto, we convert through BTC as base
            const btcValue = value * conversionFactors.crypto[inputUnit.value];
            result = btcValue / conversionFactors.crypto[outputUnit.value];
        } else {
            const baseValue = value * conversionFactors[currentCategory][inputUnit.value];
            result = baseValue / conversionFactors[currentCategory][outputUnit.value];
        }

        outputValue.value = result.toFixed(precision);
    }

    // Theme toggle functionality
    const body = document.body;

    function toggleTheme() {
        const currentTheme = body.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update theme toggle icon
        const themeIcon = themeToggle.querySelector('.theme-icon');
        if (themeIcon) {
            themeIcon.innerHTML = newTheme === 'dark' 
                ? '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446 9 9 0 1 1-8.313-12.454z"/><path d="M17 4a2 2 0 0 0 2 2 2 2 0 0 0-2 2 2 2 0 0 0-2-2 2 2 0 0 0 2-2z"/><path d="M19 11a1 1 0 0 0 1 1 1 1 0 0 0-1 1 1 1 0 0 0-1-1 1 1 0 0 0 1-1z"/></svg>'
                : '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/><path d="M11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85l1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z"/></svg>';
        }
    }

    // Initialize theme from localStorage
    function initializeTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        body.setAttribute('data-theme', savedTheme);
        
        // Set initial theme icon
        const themeIcon = themeToggle.querySelector('.theme-icon');
        if (themeIcon) {
            themeIcon.innerHTML = savedTheme === 'dark'
                ? '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446 9 9 0 1 1-8.313-12.454z"/><path d="M17 4a2 2 0 0 0 2 2 2 2 0 0 0-2 2 2 2 0 0 0-2-2 2 2 0 0 0 2-2z"/><path d="M19 11a1 1 0 0 0 1 1 1 1 0 0 0-1 1 1 1 0 0 0-1-1 1 1 0 0 0 1-1z"/></svg>'
                : '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/><path d="M11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85l1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z"/></svg>';
        }
    }

    // Add event listeners
    inputValue.addEventListener('input', convertValue);
    inputUnit.addEventListener('change', convertValue);
    outputUnit.addEventListener('change', convertValue);
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentCategory = button.dataset.category;
            
            // Set active category data attribute on body for color theming
            document.body.setAttribute('data-active-category', currentCategory);
            
            if (currentCategory === 'currency') {
                fetchExchangeRates();
            } else if (currentCategory === 'crypto') {
                fetchCryptoRates();
            }
            initializeUnits();
            convertValue();
        });
    });
    accuracySlider.addEventListener('input', () => {
        precision = parseInt(accuracySlider.value);
        accuracyValue.textContent = precision;
        convertValue();
    });
    decreaseAccuracy.addEventListener('click', () => {
        if (precision > 0) {
            precision--;
            accuracySlider.value = precision;
            accuracyValue.textContent = precision;
            convertValue();
        }
    });
    increaseAccuracy.addEventListener('click', () => {
        if (precision < 10) {
            precision++;
            accuracySlider.value = precision;
            accuracyValue.textContent = precision;
            convertValue();
        }
    });
    themeToggle.addEventListener('click', toggleTheme);

    // Close button functionality
    closeBtn.addEventListener('click', () => {
        // Use IPC to communicate with the main process
        ipcRenderer.send('close-app');
    });

    // Initialize theme
    initializeTheme();

    // Initialize
    initializeUnits();
    convertValue();
    
    // Fetch crypto rates on startup
    fetchCryptoRates();

    // After DOM content loaded, set initial active category
    const initialCategory = document.querySelector('.category-btn.active').dataset.category || 'length';
    document.body.setAttribute('data-active-category', initialCategory);
}); 