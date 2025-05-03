// Theme handling
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const themeIcon = document.querySelector('.theme-icon');

    // SVG icons for light/dark modes
    const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85l1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z"/></svg>`;
    const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M10 7a7 7 0 0 0 12 4.9v.1c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2h.1A6.979 6.979 0 0 0 10 7zm-6 5a8 8 0 0 0 15.062 3.762A9 9 0 0 1 8.238 4.938 7.999 7.999 0 0 0 4 12z"/></svg>`;

    // Check for saved theme preference or use system preference
    function initTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
            updateThemeIcon(savedTheme);
        } else if (prefersDarkScheme.matches) {
            document.documentElement.setAttribute('data-theme', 'dark');
            updateThemeIcon('dark');
        } else {
            updateThemeIcon('light');
        }
    }

    // Toggle theme
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    }

    // Update the theme icon based on current theme
    function updateThemeIcon(theme) {
        if (themeIcon) {
            themeIcon.innerHTML = theme === 'dark' ? moonIcon : sunIcon;
        }
    }

    // Event listeners
    themeToggle.addEventListener('click', toggleTheme);
    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            updateThemeIcon(newTheme);
        }
    });

    // Initialize theme on load
    initTheme();
});

// Conversion factors
const conversionFactors = {
    // Length
    length: {
        meter: 1,
        kilometer: 1000,
        centimeter: 0.01,
        millimeter: 0.001,
        micrometer: 0.000001,
        nanometer: 0.000000001,
        picometer: 0.000000000001,
        femtometer: 0.000000000000001, // fermi
        angstrom: 0.0000000001,
        mile: 1609.344,
        yard: 0.9144,
        foot: 0.3048,
        inch: 0.0254,
        nauticalMile: 1852,
        league: 4828.03,
        fathom: 1.8288,
        chain: 20.1168,
        rod: 5.0292,
        furlong: 201.168,
        hand: 0.1016,
        span: 0.2286,
        cubit: 0.4572,
        point: 0.000352778,
        pica: 0.004233,
        lightYear: 9460730472580800,
        astronomicalUnit: 149597870700,
        parsec: 30856775814913673,
        lightSecond: 299792458,
        lightMinute: 17987547480,
        lightHour: 1079252848800,
        lightDay: 25902068371200,
    },
    // Temperature
    temperature: {
        celsius: {
            toCelsius: (value) => value,
            toFahrenheit: (value) => (value * 9/5) + 32,
            toKelvin: (value) => value + 273.15,
            toRankine: (value) => (value + 273.15) * 9/5,
            toReaumur: (value) => value * 4/5,
            toDelisle: (value) => (100 - value) * 3/2,
            toNewton: (value) => value * 33/100,
            toRomer: (value) => value * 21/40 + 7.5
        },
        fahrenheit: {
            toCelsius: (value) => (value - 32) * 5/9,
            toFahrenheit: (value) => value,
            toKelvin: (value) => (value - 32) * 5/9 + 273.15,
            toRankine: (value) => value + 459.67,
            toReaumur: (value) => (value - 32) * 4/9,
            toDelisle: (value) => (212 - value) * 5/6,
            toNewton: (value) => (value - 32) * 11/60,
            toRomer: (value) => (value - 32) * 7/24 + 7.5
        },
        kelvin: {
            toCelsius: (value) => value - 273.15,
            toFahrenheit: (value) => (value - 273.15) * 9/5 + 32,
            toKelvin: (value) => value,
            toRankine: (value) => value * 9/5,
            toReaumur: (value) => (value - 273.15) * 4/5,
            toDelisle: (value) => (373.15 - value) * 3/2,
            toNewton: (value) => (value - 273.15) * 33/100,
            toRomer: (value) => (value - 273.15) * 21/40 + 7.5
        },
        rankine: {
            toCelsius: (value) => (value - 491.67) * 5/9,
            toFahrenheit: (value) => value - 459.67,
            toKelvin: (value) => value * 5/9,
            toRankine: (value) => value,
            toReaumur: (value) => (value - 491.67) * 4/9,
            toDelisle: (value) => (671.67 - value) * 5/6,
            toNewton: (value) => (value - 491.67) * 11/60,
            toRomer: (value) => (value - 491.67) * 7/24 + 7.5
        },
        reaumur: {
            toCelsius: (value) => value * 5/4,
            toFahrenheit: (value) => value * 9/4 + 32,
            toKelvin: (value) => value * 5/4 + 273.15,
            toRankine: (value) => value * 9/4 + 491.67,
            toReaumur: (value) => value,
            toDelisle: (value) => (80 - value) * 15/8,
            toNewton: (value) => value * 33/80,
            toRomer: (value) => value * 21/32 + 7.5
        },
        delisle: {
            toCelsius: (value) => 100 - value * 2/3,
            toFahrenheit: (value) => 212 - value * 6/5,
            toKelvin: (value) => 373.15 - value * 2/3,
            toRankine: (value) => 671.67 - value * 6/5,
            toReaumur: (value) => 80 - value * 8/15,
            toDelisle: (value) => value,
            toNewton: (value) => 33 - value * 11/50,
            toRomer: (value) => 60 - value * 7/20
        },
        newton: {
            toCelsius: (value) => value * 100/33,
            toFahrenheit: (value) => value * 60/11 + 32,
            toKelvin: (value) => value * 100/33 + 273.15,
            toRankine: (value) => value * 60/11 + 491.67,
            toReaumur: (value) => value * 80/33,
            toDelisle: (value) => (33 - value) * 50/11,
            toNewton: (value) => value,
            toRomer: (value) => value * 35/22 + 7.5
        },
        romer: {
            toCelsius: (value) => (value - 7.5) * 40/21,
            toFahrenheit: (value) => (value - 7.5) * 24/7 + 32,
            toKelvin: (value) => (value - 7.5) * 40/21 + 273.15,
            toRankine: (value) => (value - 7.5) * 24/7 + 491.67,
            toReaumur: (value) => (value - 7.5) * 32/21,
            toDelisle: (value) => (60 - value) * 20/7,
            toNewton: (value) => (value - 7.5) * 22/35,
            toRomer: (value) => value
        }
    },
    // Weight/Mass
    weight: {
        gram: 1,
        kilogram: 1000,
        milligram: 0.001,
        microgram: 0.000001,
        nanogram: 0.000000001,
        picogram: 0.000000000001,
        femtogram: 0.000000000000001,
        metricTon: 1000000,
        quintal: 100000,
        pound: 453.59237,
        ounce: 28.349523125,
        stone: 6350.29318,
        shortTon: 907184.74,
        longTon: 1016046.9088,
        carat: 0.2,
        atomicMassUnit: 1.66053906660e-24,
        electronVoltMass: 1.78266191e-36,  // eV/c²
        planckMass: 2.176434e-8,
        solarMass: 1.989e30,
        earthMass: 5.9722e24,
        grain: 0.06479891,
        dram: 1.7718451953125,
        pennyweight: 1.55517384,
        troy_ounce: 31.1034768,
        troy_pound: 373.2417216,
        scruple: 1.2959782,
        slug: 14593.903,
        assay_ton: 29.1666667,
        dalton: 1.66053906660e-24,
        gamma: 0.000001,
        talent: 26200,
        tael: 37.7994,
        mina: 571,
        kip: 453592.37,
        catty: 604.79,
        hundredweight: 50802.345,
    },
    // Volume
    volume: {
        liter: 1,
        milliliter: 0.001,
        microliter: 0.000001,
        nanoliter: 0.000000001,
        picoliter: 0.000000000001,
        femtoliter: 0.000000000000001,
        cubicMeter: 1000,
        cubicKilometer: 1000000000000,
        cubicCentimeter: 0.001,
        cubicMillimeter: 0.000001,
        cubicMicrometer: 0.000000000001,
        cubicInch: 0.0163871,
        cubicFoot: 28.3168,
        cubicYard: 764.555,
        gallon: 3.78541,
        quart: 0.946353,
        pint: 0.473176,
        cup: 0.236588,
        fluidOunce: 0.0295735,
        tablespoon: 0.0147868,
        teaspoon: 0.00492892,
        imperialGallon: 4.54609,
        imperialQuart: 1.1365225,
        imperialPint: 0.56826125,
        imperialCup: 0.284130625,
        imperialFluidOunce: 0.0284130625,
        imperialTablespoon: 0.0177581641,
        imperialTeaspoon: 0.00591938803,
        drop: 5e-5,
        barrel: 158.9873,
        oilBarrel: 158.9873,
        hogshead: 238.4809,
        bushel: 35.23907,
        peck: 8.809768,
        cord: 3624.556,
        boardFoot: 2.359737,
        dram: 0.0036967,
        gill: 0.118294,
        minim: 0.0000616115,
        firkin: 40.91481,
        kilderkin: 81.82962,
        jigger: 0.044360,
        fifth: 0.757082,
        shot: 0.044360,
        acreFoot: 1233481.84,
        register_ton: 2.83168,
        strike: 70.4781,
        sack: 105.71715,
        seam: 281.91,
    },
    // Area
    area: {
        squareMeter: 1,
        squareKilometer: 1000000,
        squareCentimeter: 0.0001,
        squareMillimeter: 0.000001,
        squareMicrometer: 0.000000000001,
        squareMile: 2589988.11,
        squareYard: 0.836127,
        squareFoot: 0.092903,
        squareInch: 0.00064516,
        hectare: 10000,
        acre: 4046.86,
        barn: 1e-28,
        arpent: 3418.89,
        cuerda: 3930.395625,
        plaza: 6400,
        homestead: 647497.027584,
        rood: 1011.7141,
        township: 93239571.972,
        section: 2589988.110336,
        circular_inch: 0.000506707479,
        circular_mil: 5.067074791e-10,
        guntha: 101.1714,
        hide: 485000,
        rood_uk: 1011.714,
        square_chain: 404.68564,
        square_rod: 25.29285,
        square_perch: 25.29285,
        square_pole: 25.29285,
        dunam: 1000,
        stremma: 1000,
        feddan: 4200,
        tatami: 1.653,
        ping: 3.306,
        pyeong: 3.306,
        tsubo: 3.306,
        jerib: 1000,
        desyatina: 10900,
        morgen: 2500,
    },
    // Speed
    speed: {
        meterPerSecond: 1,
        kilometerPerHour: 0.277778,
        milePerHour: 0.44704,
        footPerSecond: 0.3048,
        knot: 0.514444,
        mach: 340.3,
        speedOfLight: 299792458,
        speedOfSound: 343,
        centimeterPerSecond: 0.01,
        millimeterPerSecond: 0.001,
        kilometerPerSecond: 1000,
        milePerSecond: 1609.344,
        inchPerSecond: 0.0254,
        yardPerSecond: 0.9144,
        fathomPerSecond: 1.8288,
        furlong_per_fortnight: 0.000166309,
        lightSpeed: 299792458,
        league_per_day: 0.0559234,
        nauticalMilePerHour: 0.514444,
        beaufort: 0.5144, // rough approximation, Beaufort scale is non-linear
    },
    // Pressure
    pressure: {
        pascal: 1,
        kilopascal: 1000,
        megapascal: 1000000,
        gigapascal: 1000000000,
        bar: 100000,
        millibar: 100,
        microbar: 0.1,
        psi: 6894.76,
        ksi: 6894760,
        atmosphere: 101325,
        torr: 133.322,
        millimeterOfMercury: 133.322,
        inchOfMercury: 3386.39,
        centimeterOfWater: 98.0665,
        inchOfWater: 249.089,
        footOfWater: 2988.98,
        millimeterOfWater: 9.80665,
        dynePerSquareCentimeter: 0.1,
        poundPerSquareFoot: 47.8803,
        tonnePerSquareMeter: 9806.65,
        kilogramPerSquareCentimeter: 98066.5,
        kilogramPerSquareMeter: 9.80665,
        hectopascal: 100,
        standardAtmosphere: 101325,
        technicalAtmosphere: 98066.5,
        barie: 0.1,
        manometric: 9.80665,
        pieze: 1000,
        mbar: 100,
        barye: 0.1,
        pz: 1000,
        micron_of_mercury: 0.133322,
        fsw: 3064.3,
        msw: 9806.65,
    },
    // Energy
    energy: {
        joule: 1,
        kilojoule: 1000,
        megajoule: 1000000,
        gigajoule: 1000000000,
        calorie: 4.184,
        kilocalorie: 4184,
        thermochemicalCalorie: 4.184,
        nutritionalCalorie: 4184,  // food calorie (kilocalorie)
        wattHour: 3600,
        kilowattHour: 3600000,
        megawattHour: 3600000000,
        gigawattHour: 3600000000000,
        electronvolt: 1.602176634e-19,
        kiloelectronvolt: 1.602176634e-16,
        megaelectronvolt: 1.602176634e-13,
        gigaelectronvolt: 1.602176634e-10,
        teraelectronvolt: 1.602176634e-7,
        petaelectronvolt: 1.602176634e-4,
        britishThermalUnit: 1055.06,
        thousandBritishThermalUnit: 1055060,
        millionBritishThermalUnit: 1055060000,
        erg: 1e-7,
        footPound: 1.35582,
        tonOfTnt: 4184000000,
        kilotonOfTnt: 4184000000000,
        megatonOfTnt: 4.184e15,
        gigaelectronvolt: 1.602176634e-10,
        hartree: 4.3597447222071e-18,
        rydberg: 2.1798723611035e-18,
        barrel_of_oil_equivalent: 6.1178632e9,
        therm: 105505585.257348,
        thermie: 4185500,
        quad: 1.055e18,
        gasoline_gallon_equivalent: 120876000,
        hundredweight_of_tnt: 464700000,
        ton_hours_refrigeration: 12660670.8,
        cheval_vapeur_hour: 2647795.5,
        horsepower_hour: 2684519.5368,
        natural_gas_therm: 105505585.257348,
    },
    // Power
    power: {
        watt: 1,
        kilowatt: 1000,
        megawatt: 1000000,
        gigawatt: 1000000000,
        terawatt: 1000000000000,
        milliwatt: 0.001,
        microwatt: 0.000001,
        nanowatt: 0.000000001,
        picowatt: 0.000000000001,
        femtowatt: 0.000000000000001,
        horsepower: 745.7,
        mechanicalHorsepower: 745.7,
        metricHorsepower: 735.49875,
        electricalHorsepower: 746,
        boilerHorsepower: 9809.5,
        hydraulicHorsepower: 745.7,
        britishThermalUnitPerHour: 0.293071,
        britishThermalUnitPerMinute: 17.584264,
        britishThermalUnitPerSecond: 1055.05585,
        footPoundPerSecond: 1.35582,
        footPoundPerMinute: 0.022597,
        caloriePerSecond: 4.184,
        caloriePerMinute: 0.06973333,
        ergPerSecond: 0.0000001,
        joulePerSecond: 1,
        joulePerMinute: 0.016666667,
        joulePerHour: 0.000277778,
        electronvoltPerSecond: 1.602177e-19,
        voltAmpere: 1, // apparent power
        solarLuminosity: 3.828e26,
        tonOfRefrigeration: 3516.8528,
        poncelet: 980.665,
        tonnage: 3516.8528,
        cheval_vapeur: 735.49875,
        calorie_per_hour: 0.001162222,
    },
    // Time
    time: {
        second: 1,
        millisecond: 0.001,
        microsecond: 0.000001,
        nanosecond: 0.000000001,
        picosecond: 0.000000000001,
        femtosecond: 0.000000000000001,
        attosecond: 0.000000000000000001,
        minute: 60,
        hour: 3600,
        day: 86400,
        week: 604800,
        fortnight: 1209600,
        month: 2629746, // average
        year: 31556952, // average Gregorian
        commonYear: 31536000, // 365 days
        leapYear: 31622400, // 366 days
        julianYear: 31557600, // 365.25 days
        decade: 315569520,
        century: 3155695200,
        millennium: 31556952000,
        planckTime: 5.39116e-44,
        sidereal_day: 86164.09,
        sidereal_year: 31558150,
        tropical_year: 31556925,
        lunar_month: 2551442.8, // synodic month
        lunar_year: 30617314, // 12 synodic months
        shake: 0.00000001,
        jiffy: 0.01, // in electronics
        helek: 3.333333,
        lustrum: 157784760,
        moment: 90,
        svedberg: 0.000000000001,
        septennial: 220898664,
        octennial: 252455616,
        novennial: 284012568,
        quindecennial: 473183448,
        indiction: 473183448,
        jubilee: 1577847600,
    },
    // Data Storage
    data: {
        bit: 1,
        byte: 8,
        kilobit: 1000,
        kilobyte: 8000,
        megabit: 1000000,
        megabyte: 8000000,
        gigabit: 1000000000,
        gigabyte: 8000000000,
        terabit: 1000000000000,
        terabyte: 8000000000000,
        petabit: 1000000000000000,
        petabyte: 8000000000000000,
        exabit: 1000000000000000000,
        exabyte: 8000000000000000000,
        zettabit: 1e21,
        zettabyte: 8e21,
        yottabit: 1e24,
        yottabyte: 8e24,
        kibibit: 1024,
        kibibyte: 8192,
        mebibit: 1048576,
        mebibyte: 8388608,
        gibibit: 1073741824,
        gibibyte: 8589934592,
        tebibit: 1099511627776,
        tebibyte: 8796093022208,
        pebibit: 1125899906842624,
        pebibyte: 9007199254740992,
        exbibit: 1152921504606846976,
        exbibyte: 9223372036854775808,
        zebibit: 1.1805916207174113e+21,
        zebibyte: 9.444732965739291e+21,
        yobibit: 1.2089258196146292e+24,
        yobibyte: 9.671406556917033e+24,
        nibble: 4,
        crumb: 2,
        word: 16, // common definition
        doubleword: 32,
        quadword: 64,
        octaword: 128,
        sector: 4096, // modern disk sector size
        block: 4096, // common file system block size
        page: 4096, // common memory page size
        cluster: 32768, // common disk cluster size (8 sectors)
        cylinder: 7864320, // historical disk cylinder (estimated average)
    },
    // Frequency
    frequency: {
        hertz: 1,
        kilohertz: 1000,
        megahertz: 1000000,
        gigahertz: 1000000000,
        terahertz: 1000000000000,
        petahertz: 1000000000000000,
        exahertz: 1000000000000000000,
        millihertz: 0.001,
        microhertz: 0.000001,
        nanohertz: 0.000000001,
        picohertz: 0.000000000001,
        cycle_per_second: 1,
        cycle_per_minute: 0.016666667,
        cycle_per_hour: 0.000277778,
        revolution_per_minute: 0.016666667,
        revolution_per_second: 1,
        revolution_per_hour: 0.000277778,
        radian_per_second: 0.159154943,
        degree_per_second: 0.002777778,
        bpm: 0.016666667, // beats per minute
        frame_per_second: 1, // in video/cinema
        sample_per_second: 1, // in audio
        cps: 1, // cycles per second, old term for hertz
        mpm: 0.016666667, // measures per minute (music)
        fps: 1, // frames per second
    },
    // Angle
    angle: {
        degree: 1,
        radian: 57.2957795131,
        gradian: 0.9,
        arcminute: 0.0166666667,
        arcsecond: 0.000277777778,
        milliarcsecond: 0.000000277777778,
        microarcsecond: 0.000000000277777778,
        turn: 360,
        revolution: 360,
        circle: 360,
        quadrant: 90,
        rightAngle: 90,
        sextant: 60,
        octant: 45,
        sign: 30,
        pointDirection: 11.25, // 32-wind compass point
        hourAngle: 15,
        mil: 0.05625, // NATO mil
        mrad: 0.0572957795, // milliradian
        gon: 0.9, // same as gradian
        minute: 0.0166666667, // same as arcminute
        second: 0.000277777778, // same as arcsecond
        hourDMS: 15, // hour in DMS system
        minuteDMS: 0.25, // minute in DMS system
        secondDMS: 0.00416666667, // second in DMS system
    },
    // Fuel Economy
    fuel: {
        milesPerGallon: 1,
        milesPerImperialGallon: 1.20095,
        kilometersPerLiter: 2.35215,
        litersPer100Kilometers: 235.215, // inverse relationship
        milesPerLiter: 3.78541,
        gallonsPerMile: 1, // inverse relationship
        imperialGallonsPerMile: 0.832674, // inverse relationship
        litersPerKilometer: 2.35215, // inverse relationship
        litersPerMile: 3.78541, // inverse relationship
        kilometersPerGallon: 1.60934,
        kilometersPerImperialGallon: 1.93121,
        milesPerDieselGallon: 1.136, // diesel energy density ratio
        milesPerKilowattHour: 0.621371, // for electric vehicles
        kilometersPerKilowattHour: 1, // for electric vehicles
        wattHoursPerMile: 1609.34, // for electric vehicles
        wattHoursPerKilometer: 1000, // for electric vehicles
        nauticalMilesPerGallon: 0.868976,
        fuelConsumptionIndex: 1, // generic unit for comparing fuel economies
    },
    // Cooking
    cooking: {
        teaspoon: 1,
        tablespoon: 3,
        fluidOunce: 6,
        cup: 48,
        pint: 96,
        quart: 192,
        gallon: 768,
        milliliter: 0.202884,
        liter: 202.884,
        gram: 4.92892,
        kilogram: 4928.92,
        ounce: 6,
        pound: 96,
        imperialTeaspoon: 1.20095,
        imperialTablespoon: 3.60285,
        imperialFluidOunce: 5.76456,
        imperialCup: 57.6456,
        imperialPint: 115.291,
        imperialQuart: 230.582,
        imperialGallon: 922.33,
        dessertspoon: 2, // between teaspoon and tablespoon
        saltspoon: 0.25, // quarter teaspoon
        dash: 0.125, // eighth teaspoon
        pinch: 0.0625, // sixteenth teaspoon
        smidgen: 0.03125, // thirty-second teaspoon
        drop: 0.0164271, // approximately 1/60 teaspoon
        stick: 24, // half cup, for butter
        jigger: 9, // 1.5 fluid ounces
        gill: 24, // quarter pint
        fifthOfTeaspoon: 0.2, // fifth teaspoon
        thirdOfTeaspoon: 0.333333, // third teaspoon
        halfTeaspoon: 0.5, // half teaspoon
        coffeeSpoon: 0.5, // half teaspoon
        demiTasse: 0.5, // half teaspoon
        scant: 0.9, // 10% less than the specified amount
        heaped: 1.5, // 50% more than the specified amount
        sifted: 0.85, // 15% less than unsifted
        level: 1, // exact measurement
    },
    // Currency (using approximate rates, should be updated with real-time data)
    currency: {
        usd: 1, // US Dollar
        eur: 0.92, // Euro
        gbp: 0.79, // British Pound
        jpy: 151.67, // Japanese Yen
        aud: 1.52, // Australian Dollar
        cad: 1.36, // Canadian Dollar
        chf: 0.90, // Swiss Franc
        cny: 7.24, // Chinese Yuan
        inr: 83.30, // Indian Rupee
        brl: 5.05, // Brazilian Real
        rub: 92.50, // Russian Ruble
        zar: 18.70, // South African Rand
        nzd: 1.67, // New Zealand Dollar
        sek: 10.60, // Swedish Krona
        nok: 10.80, // Norwegian Krone
        dkk: 6.87, // Danish Krone
        pln: 3.97, // Polish Zloty
        hkd: 7.83, // Hong Kong Dollar
        sgd: 1.35, // Singapore Dollar
        krw: 1345.00, // South Korean Won
        try: 32.00, // Turkish Lira
        mxn: 16.70, // Mexican Peso
        ars: 870.00, // Argentine Peso
        afn: 72.00, // Afghan Afghani
        all: 98.00, // Albanian Lek
        dzd: 134.50, // Algerian Dinar
        aoa: 860.00, // Angolan Kwanza
        amd: 390.00, // Armenian Dram
        azn: 1.70, // Azerbaijani Manat
        bhd: 0.38, // Bahraini Dinar
        bdt: 110.00, // Bangladeshi Taka
        bbd: 2.00, // Barbadian Dollar
        byn: 3.26, // Belarusian Ruble
        bzd: 2.02, // Belize Dollar
        bob: 6.91, // Bolivian Boliviano
        bam: 1.80, // Bosnia and Herzegovina Convertible Mark
        bwp: 13.50, // Botswanan Pula
        bnd: 1.34, // Brunei Dollar
        bgn: 1.80, // Bulgarian Lev
        bif: 2830.00, // Burundian Franc
        khr: 4100.00, // Cambodian Riel
        cve: 101.50, // Cape Verdean Escudo
        xaf: 605.00, // Central African CFA Franc
        xpf: 110.00, // CFP Franc
        clp: 930.00, // Chilean Peso
        cop: 3940.00, // Colombian Peso
        kmf: 453.00, // Comorian Franc
        cdf: 2720.00, // Congolese Franc
        crc: 522.00, // Costa Rican Colón
        hrk: 6.95, // Croatian Kuna
        cup: 24.00, // Cuban Peso
        czk: 23.00, // Czech Koruna
        djf: 178.50, // Djiboutian Franc
        dop: 58.60, // Dominican Peso
        egp: 46.30, // Egyptian Pound
        ern: 15.00, // Eritrean Nakfa
        etb: 56.60, // Ethiopian Birr
        fjd: 2.25, // Fijian Dollar
        gmd: 67.50, // Gambian Dalasi
        gel: 2.66, // Georgian Lari
        ghs: 15.00, // Ghanaian Cedi
        gtq: 7.78, // Guatemalan Quetzal
        gnf: 8650.00, // Guinean Franc
        gyd: 210.00, // Guyanese Dollar
        htg: 131.50, // Haitian Gourde
        hnl: 24.70, // Honduran Lempira
        huf: 358.00, // Hungarian Forint
        isk: 136.50, // Icelandic Króna
        idr: 15800.00, // Indonesian Rupiah
        irr: 42000.00, // Iranian Rial
        iqd: 1310.00, // Iraqi Dinar
        ils: 3.70, // Israeli New Shekel
        jmd: 155.00, // Jamaican Dollar
        jod: 0.71, // Jordanian Dinar
        kzt: 445.00, // Kazakhstani Tenge
        kes: 129.00, // Kenyan Shilling
        kwd: 0.31, // Kuwaiti Dinar
        kgs: 89.00, // Kyrgystani Som
        lak: 20450.00, // Laotian Kip
        lbp: 15000.00, // Lebanese Pound
        lsl: 18.70, // Lesotho Loti
        lrd: 187.00, // Liberian Dollar
        lyd: 4.85, // Libyan Dinar
        mga: 4450.00, // Malagasy Ariary
        mwk: 1690.00, // Malawian Kwacha
        myr: 4.72, // Malaysian Ringgit
        mvr: 15.45, // Maldivian Rufiyaa
        mru: 39.20, // Mauritanian Ouguiya
        mur: 45.50, // Mauritian Rupee
        mdl: 17.70, // Moldovan Leu
        mnt: 3450.00, // Mongolian Tugrik
        mad: 9.95, // Moroccan Dirham
        mzn: 63.80, // Mozambican Metical
        mmk: 2100.00, // Myanmar Kyat
        nad: 18.70, // Namibian Dollar
        npr: 133.00, // Nepalese Rupee
        nio: 36.70, // Nicaraguan Córdoba
        ngn: 1460.00, // Nigerian Naira
        mkd: 56.80, // North Macedonian Denar
        omr: 0.39, // Omani Rial
        pkr: 278.00, // Pakistani Rupee
        pab: 1.00, // Panamanian Balboa
        pgk: 3.70, // Papua New Guinean Kina
        pyg: 7350.00, // Paraguayan Guarani
        pen: 3.70, // Peruvian Sol
        php: 56.30, // Philippine Peso
        qar: 3.64, // Qatari Riyal
        ron: 4.57, // Romanian Leu
        rwf: 1280.00, // Rwandan Franc
        svc: 8.75, // Salvadoran Colón
        wst: 2.75, // Samoan Tala
        stn: 22.50, // São Tomé and Príncipe Dobra
        sar: 3.75, // Saudi Riyal
        rsd: 108.00, // Serbian Dinar
        scr: 13.25, // Seychellois Rupee
        sll: 22600.00, // Sierra Leonean Leone
        sbd: 8.34, // Solomon Islands Dollar
        sos: 570.00, // Somali Shilling
        lkr: 306.00, // Sri Lankan Rupee
        sdg: 600.00, // Sudanese Pound
        srd: 29.20, // Surinamese Dollar
        szl: 18.70, // Swazi Lilangeni
        syp: 13000.00, // Syrian Pound
        tjs: 10.90, // Tajikistani Somoni
        tzs: 2550.00, // Tanzanian Shilling
        thb: 35.70, // Thai Baht
        top: 2.37, // Tongan Pa'anga
        ttd: 6.80, // Trinidad and Tobago Dollar
        tnd: 3.12, // Tunisian Dinar
        tmt: 3.50, // Turkmenistani Manat
        ugx: 3790.00, // Ugandan Shilling
        uah: 39.50, // Ukrainian Hryvnia
        aed: 3.67, // United Arab Emirates Dirham
        uyu: 38.50, // Uruguayan Peso
        uzs: 12800.00, // Uzbekistan Som
        vuv: 118.00, // Vanuatu Vatu
        vef: 3659000.00, // Venezuelan Bolívar
        vnd: 25000.00, // Vietnamese Dong
        xof: 605.00, // West African CFA Franc
        yer: 250.00, // Yemeni Rial
        zmw: 26.20, // Zambian Kwacha
        zwl: 9600.00, // Zimbabwean Dollar
        btc: 0.000017, // Bitcoin
        eth: 0.00031, // Ethereum
        bnb: 0.0021, // Binance Coin
        xau: 0.00045, // Gold (troy ounce)
        xag: 0.040, // Silver (troy ounce)
        xpt: 0.00085, // Platinum (troy ounce)
        xpd: 0.0007, // Palladium (troy ounce)
    }
};

// DOM elements
const inputValue = document.getElementById('inputValue');
const outputValue = document.getElementById('outputValue');
const fromUnit = document.getElementById('inputUnit');
const toUnit = document.getElementById('outputUnit');
const swapButton = document.getElementById('swapUnits');
const categoryButtons = document.querySelectorAll('.category-btn');
const container = document.querySelector('.container');

// Accuracy settings
let significantDigits = 4; // Change from 6 to 4 to match the initial UI display
const MIN_ACCURACY = 0; // Change from 2 to 0 to match the slider min
const MAX_ACCURACY = 10;
const accuracyValueDisplay = document.getElementById('accuracyValue');
const accuracyFill = document.querySelector('.accuracy-fill');
const decreaseAccuracyBtn = document.getElementById('decreaseAccuracy');
const increaseAccuracyBtn = document.getElementById('increaseAccuracy');

// Set initial accuracy display
updateAccuracyUI();

// Remove any event listeners that prevent focus
outputValue.removeEventListener('focus', function() {
    this.blur();
});

// Make output field fully editable
outputValue.readOnly = false;

// Ensure direct value setting without animations
function setOutputValue(value, skipFlag = false) {
    if (!skipFlag) isConverting = true;
    outputValue.style.transition = 'none';
    outputValue.value = value;
    void outputValue.offsetWidth;
    outputValue.style.transition = '';
    if (!skipFlag) setTimeout(() => { isConverting = false; }, 0);
}

function setInputValue(value, skipFlag = false) {
    if (!skipFlag) isConverting = true;
    inputValue.style.transition = 'none';
    inputValue.value = value;
    void inputValue.offsetWidth;
    inputValue.style.transition = '';
    if (!skipFlag) setTimeout(() => { isConverting = false; }, 0);
}

// Current category
let currentCategory = 'length';

// Flag to prevent conversion loop
let isConverting = false;

// Update unit options based on category
function updateUnitOptions(category) {
    const units = Object.keys(conversionFactors[category]);
    const options = units.map(unit => {
        const displayName = unit.charAt(0).toUpperCase() + unit.slice(1);
        return `<option value="${unit}">${displayName} (${getUnitSymbol(unit)})</option>`;
    }).join('');

    fromUnit.innerHTML = options;
    toUnit.innerHTML = options;
    
    // Update container with category-specific theme
    container.setAttribute('data-category', category);
}

// Get unit symbol
function getUnitSymbol(unit) {
    const symbols = {
        // Length
        meter: 'm',
        kilometer: 'km',
        centimeter: 'cm',
        millimeter: 'mm',
        micrometer: 'µm',
        nanometer: 'nm',
        picometer: 'pm',
        femtometer: 'fm',
        angstrom: 'Å',
        mile: 'mi',
        yard: 'yd',
        foot: 'ft',
        inch: 'in',
        nauticalMile: 'nmi',
        league: 'lea',
        fathom: 'ftm',
        chain: 'ch',
        rod: 'rd',
        furlong: 'fur',
        hand: 'h',
        span: 'spn',
        cubit: 'cbt',
        point: 'pt',
        pica: 'pc',
        lightYear: 'ly',
        astronomicalUnit: 'AU',
        parsec: 'pc',
        lightSecond: 'ls',
        lightMinute: 'lm',
        lightHour: 'lh',
        lightDay: 'ld',
        
        // Temperature
        celsius: '°C',
        fahrenheit: '°F',
        kelvin: 'K',
        rankine: '°R',
        reaumur: '°Ré',
        delisle: '°De',
        newton: '°N',
        romer: '°Rø',
        
        // Weight
        gram: 'g',
        kilogram: 'kg',
        milligram: 'mg',
        microgram: 'µg',
        nanogram: 'ng',
        picogram: 'pg',
        femtogram: 'fg',
        metricTon: 't',
        quintal: 'q',
        pound: 'lb',
        ounce: 'oz',
        stone: 'st',
        shortTon: 'ton',
        longTon: 'long ton',
        carat: 'ct',
        atomicMassUnit: 'u',
        electronVoltMass: 'eV/c²',
        planckMass: 'mₚ',
        solarMass: 'M☉',
        earthMass: 'M⊕',
        grain: 'gr',
        dram: 'dr',
        pennyweight: 'dwt',
        troy_ounce: 'oz t',
        troy_pound: 'lb t',
        scruple: 's',
        slug: 'slug',
        assay_ton: 'AT',
        dalton: 'Da',
        gamma: 'γ',
        talent: 'talent',
        tael: 'tael',
        mina: 'mina',
        kip: 'kip',
        catty: 'catty',
        hundredweight: 'cwt',
        
        // Volume
        liter: 'L',
        milliliter: 'mL',
        microliter: 'µL',
        nanoliter: 'nL',
        picoliter: 'pL',
        femtoliter: 'fL',
        cubicMeter: 'm³',
        cubicKilometer: 'km³',
        cubicCentimeter: 'cm³',
        cubicMillimeter: 'mm³',
        cubicMicrometer: 'µm³',
        cubicInch: 'in³',
        cubicFoot: 'ft³',
        cubicYard: 'yd³',
        gallon: 'gal',
        quart: 'qt',
        pint: 'pt',
        cup: 'c',
        fluidOunce: 'fl oz',
        tablespoon: 'tbsp',
        teaspoon: 'tsp',
        imperialGallon: 'imp gal',
        imperialQuart: 'imp qt',
        imperialPint: 'imp pt',
        imperialCup: 'imp c',
        imperialFluidOunce: 'imp fl oz',
        imperialTablespoon: 'imp tbsp',
        imperialTeaspoon: 'imp tsp',
        drop: 'gtt',
        barrel: 'bbl',
        oilBarrel: 'bbl',
        hogshead: 'hhd',
        bushel: 'bu',
        peck: 'pk',
        cord: 'cord',
        boardFoot: 'FBM',
        dram: 'fl dr',
        gill: 'gi',
        minim: 'min',
        firkin: 'fir',
        kilderkin: 'kil',
        jigger: 'jig',
        fifth: 'fifth',
        shot: 'shot',
        acreFoot: 'ac⋅ft',
        register_ton: 'RT',
        strike: 'strike',
        sack: 'sack',
        seam: 'seam',
        
        // Area
        squareMeter: 'm²',
        squareKilometer: 'km²',
        squareCentimeter: 'cm²',
        squareMillimeter: 'mm²',
        squareMicrometer: 'µm²',
        squareMile: 'mi²',
        squareYard: 'yd²',
        squareFoot: 'ft²',
        squareInch: 'in²',
        hectare: 'ha',
        acre: 'ac',
        barn: 'b',
        arpent: 'arpent',
        cuerda: 'cda',
        plaza: 'pz',
        homestead: 'homestead',
        rood: 'ro',
        township: 'twp',
        section: 'sec',
        circular_inch: 'circ in',
        circular_mil: 'cmil',
        guntha: 'guntha',
        hide: 'hide',
        rood_uk: 'ro',
        square_chain: 'sq ch',
        square_rod: 'sq rd',
        square_perch: 'sq perch',
        square_pole: 'sq pole',
        dunam: 'dunam',
        stremma: 'stremma',
        feddan: 'feddan',
        tatami: '畳',
        ping: '坪',
        pyeong: '평',
        tsubo: '坪',
        jerib: 'jerib',
        desyatina: 'desyatina',
        morgen: 'morgen',
        
        // Speed
        meterPerSecond: 'm/s',
        kilometerPerHour: 'km/h',
        milePerHour: 'mph',
        footPerSecond: 'ft/s',
        knot: 'kn',
        mach: 'M',
        speedOfLight: 'c',
        speedOfSound: 'a',
        centimeterPerSecond: 'cm/s',
        millimeterPerSecond: 'mm/s',
        kilometerPerSecond: 'km/s',
        milePerSecond: 'mps',
        inchPerSecond: 'ips',
        yardPerSecond: 'yd/s',
        fathomPerSecond: 'ftm/s',
        furlong_per_fortnight: 'f/f',
        lightSpeed: 'c',
        league_per_day: 'lea/day',
        nauticalMilePerHour: 'kn',
        beaufort: 'Bft',
        
        // Pressure
        pascal: 'Pa',
        kilopascal: 'kPa',
        megapascal: 'MPa',
        gigapascal: 'GPa',
        bar: 'bar',
        millibar: 'mbar',
        microbar: 'µbar',
        psi: 'psi',
        ksi: 'ksi',
        atmosphere: 'atm',
        torr: 'Torr',
        millimeterOfMercury: 'mmHg',
        inchOfMercury: 'inHg',
        centimeterOfWater: 'cmH₂O',
        inchOfWater: 'inH₂O',
        footOfWater: 'ftH₂O',
        millimeterOfWater: 'mmH₂O',
        dynePerSquareCentimeter: 'dyn/cm²',
        poundPerSquareFoot: 'psf',
        tonnePerSquareMeter: 't/m²',
        kilogramPerSquareCentimeter: 'kg/cm²',
        kilogramPerSquareMeter: 'kg/m²',
        hectopascal: 'hPa',
        standardAtmosphere: 'atm',
        technicalAtmosphere: 'at',
        barie: 'Ba',
        manometric: 'mwe',
        pieze: 'pz',
        mbar: 'mbar',
        barye: 'Ba',
        pz: 'pz',
        micron_of_mercury: 'µHg',
        fsw: 'fsw',
        msw: 'msw',
        
        // Energy
        joule: 'J',
        kilojoule: 'kJ',
        megajoule: 'MJ',
        gigajoule: 'GJ',
        calorie: 'cal',
        kilocalorie: 'kcal',
        thermochemicalCalorie: 'cal',
        nutritionalCalorie: 'Cal',
        wattHour: 'Wh',
        kilowattHour: 'kWh',
        megawattHour: 'MWh',
        gigawattHour: 'GWh',
        electronvolt: 'eV',
        kiloelectronvolt: 'keV',
        megaelectronvolt: 'MeV',
        gigaelectronvolt: 'GeV',
        teraelectronvolt: 'TeV',
        petaelectronvolt: 'PeV',
        britishThermalUnit: 'BTU',
        thousandBritishThermalUnit: 'MBTU',
        millionBritishThermalUnit: 'MMBTU',
        erg: 'erg',
        footPound: 'ft⋅lb',
        tonOfTnt: 't TNT',
        kilotonOfTnt: 'kt TNT',
        megatonOfTnt: 'Mt TNT',
        hartree: 'Eh',
        rydberg: 'Ry',
        barrel_of_oil_equivalent: 'BOE',
        therm: 'thm',
        thermie: 'th',
        quad: 'quad',
        gasoline_gallon_equivalent: 'GGE',
        hundredweight_of_tnt: 'cwt TNT',
        ton_hours_refrigeration: 'TR⋅h',
        cheval_vapeur_hour: 'cv⋅h',
        horsepower_hour: 'hp⋅h',
        natural_gas_therm: 'thm',
        
        // Power
        watt: 'W',
        kilowatt: 'kW',
        megawatt: 'MW',
        gigawatt: 'GW',
        terawatt: 'TW',
        milliwatt: 'mW',
        microwatt: 'µW',
        nanowatt: 'nW',
        picowatt: 'pW',
        femtowatt: 'fW',
        horsepower: 'hp',
        mechanicalHorsepower: 'hp',
        metricHorsepower: 'cv',
        electricalHorsepower: 'hp(E)',
        boilerHorsepower: 'bhp',
        hydraulicHorsepower: 'hhp',
        britishThermalUnitPerHour: 'BTU/h',
        britishThermalUnitPerMinute: 'BTU/min',
        britishThermalUnitPerSecond: 'BTU/s',
        footPoundPerSecond: 'ft⋅lb/s',
        footPoundPerMinute: 'ft⋅lb/min',
        caloriePerSecond: 'cal/s',
        caloriePerMinute: 'cal/min',
        ergPerSecond: 'erg/s',
        joulePerSecond: 'J/s',
        joulePerMinute: 'J/min',
        joulePerHour: 'J/h',
        electronvoltPerSecond: 'eV/s',
        voltAmpere: 'VA',
        solarLuminosity: 'L☉',
        tonOfRefrigeration: 'RT',
        poncelet: 'p',
        tonnage: 'RT',
        cheval_vapeur: 'cv',
        calorie_per_hour: 'cal/h',
        
        // Time
        second: 's',
        millisecond: 'ms',
        microsecond: 'µs',
        nanosecond: 'ns',
        picosecond: 'ps',
        femtosecond: 'fs',
        attosecond: 'as',
        minute: 'min',
        hour: 'h',
        day: 'd',
        week: 'wk',
        fortnight: 'fortnight',
        month: 'mo',
        year: 'yr',
        commonYear: 'yr',
        leapYear: 'leap yr',
        julianYear: 'j yr',
        decade: 'dec',
        century: 'c',
        millennium: 'mill',
        planckTime: 'tₚ',
        sidereal_day: 'd*',
        sidereal_year: 'yr*',
        tropical_year: 'yr',
        lunar_month: 'lun mo',
        lunar_year: 'lun yr',
        shake: 'shake',
        jiffy: 'jiffy',
        helek: 'helek',
        lustrum: 'lustrum',
        moment: 'moment',
        svedberg: 'S',
        septennial: 'septennial',
        octennial: 'octennial',
        novennial: 'novennial',
        quindecennial: 'quindecennial',
        indiction: 'indiction',
        jubilee: 'jubilee',
        
        // Data
        bit: 'b',
        byte: 'B',
        kilobit: 'kb',
        kilobyte: 'kB',
        megabit: 'Mb',
        megabyte: 'MB',
        gigabit: 'Gb',
        gigabyte: 'GB',
        terabit: 'Tb',
        terabyte: 'TB',
        petabit: 'Pb',
        petabyte: 'PB',
        exabit: 'Eb',
        exabyte: 'EB',
        zettabit: 'Zb',
        zettabyte: 'ZB',
        yottabit: 'Yb',
        yottabyte: 'YB',
        kibibit: 'Kib',
        kibibyte: 'KiB',
        mebibit: 'Mib',
        mebibyte: 'MiB',
        gibibit: 'Gib',
        gibibyte: 'GiB',
        tebibit: 'Tib',
        tebibyte: 'TiB',
        pebibit: 'Pib',
        pebibyte: 'PiB',
        exbibit: 'Eib',
        exbibyte: 'EiB',
        zebibit: 'Zib',
        zebibyte: 'ZiB',
        yobibit: 'Yib',
        yobibyte: 'YiB',
        nibble: 'nibble',
        crumb: 'crumb',
        word: 'word',
        doubleword: 'dword',
        quadword: 'qword',
        octaword: 'oword',
        sector: 'sector',
        block: 'block',
        page: 'page',
        cluster: 'cluster',
        cylinder: 'cyl',
        
        // Frequency
        hertz: 'Hz',
        kilohertz: 'kHz',
        megahertz: 'MHz',
        gigahertz: 'GHz',
        terahertz: 'THz',
        petahertz: 'PHz',
        exahertz: 'EHz',
        millihertz: 'mHz',
        microhertz: 'µHz',
        nanohertz: 'nHz',
        picohertz: 'pHz',
        cycle_per_second: 'cps',
        cycle_per_minute: 'cpm',
        cycle_per_hour: 'cph',
        revolution_per_minute: 'rpm',
        revolution_per_second: 'rps',
        revolution_per_hour: 'rph',
        radian_per_second: 'rad/s',
        degree_per_second: '°/s',
        bpm: 'bpm',
        frame_per_second: 'fps',
        sample_per_second: 'sps',
        cps: 'cps',
        mpm: 'mpm',
        fps: 'fps',
        
        // Angle
        degree: '°',
        radian: 'rad',
        gradian: 'grad',
        arcminute: '′',
        arcsecond: '″',
        milliarcsecond: 'mas',
        microarcsecond: 'µas',
        turn: 'turn',
        revolution: 'rev',
        circle: 'circ',
        quadrant: 'quad',
        rightAngle: 'right angle',
        sextant: 'sextant',
        octant: 'octant',
        sign: 'sign',
        pointDirection: 'point',
        hourAngle: 'h',
        mil: 'mil',
        mrad: 'mrad',
        gon: 'gon',
        minute: '′',
        second: '″',
        hourDMS: 'h',
        minuteDMS: 'm',
        secondDMS: 's',
        
        // Fuel Economy
        milesPerGallon: 'mpg',
        milesPerImperialGallon: 'mpg (imp)',
        kilometersPerLiter: 'km/L',
        litersPer100Kilometers: 'L/100km',
        milesPerLiter: 'mpl',
        gallonsPerMile: 'gpm',
        imperialGallonsPerMile: 'igpm',
        litersPerKilometer: 'L/km',
        litersPerMile: 'L/mi',
        kilometersPerGallon: 'kpg',
        kilometersPerImperialGallon: 'kpg (imp)',
        milesPerDieselGallon: 'mpdg',
        milesPerKilowattHour: 'mi/kWh',
        kilometersPerKilowattHour: 'km/kWh',
        wattHoursPerMile: 'Wh/mi',
        wattHoursPerKilometer: 'Wh/km',
        nauticalMilesPerGallon: 'nmpg',
        fuelConsumptionIndex: 'FCI',
        
        // Cooking
        teaspoon: 'tsp',
        tablespoon: 'tbsp',
        fluidOunce: 'fl oz',
        cup: 'c',
        pint: 'pt',
        quart: 'qt',
        gallon: 'gal',
        milliliter: 'mL',
        liter: 'L',
        gram: 'g',
        kilogram: 'kg',
        ounce: 'oz',
        pound: 'lb',
        imperialTeaspoon: 'imp tsp',
        imperialTablespoon: 'imp tbsp',
        imperialFluidOunce: 'imp fl oz',
        imperialCup: 'imp c',
        imperialPint: 'imp pt',
        imperialQuart: 'imp qt',
        imperialGallon: 'imp gal',
        dessertspoon: 'dstspn',
        saltspoon: 'ssp',
        dash: 'ds',
        pinch: 'pn',
        smidgen: 'smdg',
        drop: 'gtt',
        stick: 'stick',
        jigger: 'jig',
        gill: 'gi',
        fifthOfTeaspoon: '⅕ tsp',
        thirdOfTeaspoon: '⅓ tsp',
        halfTeaspoon: '½ tsp',
        coffeeSpoon: 'csp',
        demiTasse: 'demi',
        scant: 'scant',
        heaped: 'heaped',
        sifted: 'sifted',
        level: 'level',
        
        // Currency
        usd: '$',
        eur: '€',
        gbp: '£',
        jpy: '¥',
        aud: 'A$',
        cad: 'C$',
        chf: 'Fr',
        cny: '¥',
        inr: '₹',
        brl: 'R$',
        rub: '₽',
        zar: 'R',
        nzd: 'NZ$',
        sek: 'kr',
        nok: 'kr',
        dkk: 'kr',
        pln: 'zł',
        hkd: 'HK$',
        sgd: 'S$',
        krw: '₩',
        try: '₺',
        mxn: 'Mex$',
        ars: 'AR$',
        afn: '؋',
        all: 'L',
        dzd: 'DA',
        aoa: 'Kz',
        amd: '֏',
        azn: '₼',
        bhd: 'BD',
        bdt: '৳',
        bbd: 'Bds$',
        byn: 'Br',
        bzd: 'BZ$',
        bob: 'Bs',
        bam: 'KM',
        bwp: 'P',
        bnd: 'B$',
        bgn: 'лв',
        bif: 'FBu',
        khr: '៛',
        cve: '$',
        xaf: 'FCFA',
        xpf: '₣',
        clp: 'CLP$',
        cop: 'COL$',
        kmf: 'CF',
        cdf: 'FC',
        crc: '₡',
        hrk: 'kn',
        cup: '₱',
        czk: 'Kč',
        djf: 'Fdj',
        dop: 'RD$',
        egp: 'E£',
        ern: 'Nfk',
        etb: 'Br',
        fjd: 'FJ$',
        gmd: 'D',
        gel: '₾',
        ghs: 'GH₵',
        gtq: 'Q',
        gnf: 'FG',
        gyd: 'G$',
        htg: 'G',
        hnl: 'L',
        huf: 'Ft',
        isk: 'kr',
        idr: 'Rp',
        irr: '﷼',
        iqd: 'ع.د',
        ils: '₪',
        jmd: 'J$',
        jod: 'JD',
        kzt: '₸',
        kes: 'KSh',
        kwd: 'KD',
        kgs: 'сом',
        lak: '₭',
        lbp: 'L£',
        lsl: 'L',
        lrd: 'L$',
        lyd: 'LD',
        mga: 'Ar',
        mwk: 'MK',
        myr: 'RM',
        mvr: 'Rf',
        mru: 'UM',
        mur: '₨',
        mdl: 'L',
        mnt: '₮',
        mad: 'DH',
        mzn: 'MT',
        mmk: 'K',
        nad: 'N$',
        npr: '₨',
        nio: 'C$',
        ngn: '₦',
        mkd: 'ден',
        omr: 'OR',
        pkr: '₨',
        pab: 'B/.',
        pgk: 'K',
        pyg: '₲',
        pen: 'S/',
        php: '₱',
        qar: 'QR',
        ron: 'lei',
        rwf: 'FRw',
        svc: '₡',
        wst: 'WS$',
        stn: 'Db',
        sar: '﷼',
        rsd: 'din',
        scr: '₨',
        sll: 'Le',
        sbd: 'SI$',
        sos: 'Sh',
        lkr: '₨',
        sdg: 'SD£',
        srd: 'SR$',
        szl: 'L',
        syp: '£S',
        tjs: 'ЅМ',
        tzs: 'TSh',
        thb: '฿',
        top: 'T$',
        ttd: 'TT$',
        tnd: 'DT',
        tmt: 'm',
        ugx: 'USh',
        uah: '₴',
        aed: 'د.إ',
        uyu: '$U',
        uzs: 'so\'m',
        vuv: 'VT',
        vef: 'Bs.S',
        vnd: '₫',
        xof: 'CFA',
        yer: '﷼',
        zmw: 'ZK',
        zwl: 'Z$',
        btc: '₿',
        eth: 'Ξ',
        bnb: 'BNB',
        xau: 'XAU',
        xag: 'XAG',
        xpt: 'XPT',
        xpd: 'XPD',
    };
    return symbols[unit] || unit;
}

// Convert units from input to output
function convert() {
    if (isConverting) return;
    isConverting = true;
    
    const value = inputValue.value;
    if (value === '') {
        setOutputValue('', true);
        isConverting = false;
        return;
    }

    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
        setOutputValue('', true);
        isConverting = false;
        return;
    }

    let result;
    if (currentCategory === 'temperature') {
        const fromTemp = fromUnit.value;
        const toTemp = toUnit.value;
        result = conversionFactors.temperature[fromTemp][`to${toTemp.charAt(0).toUpperCase() + toTemp.slice(1)}`](numValue);
    } else if (currentCategory === 'currency') {
        const fromRate = conversionFactors.currency[fromUnit.value];
        const toRate = conversionFactors.currency[toUnit.value];
        result = (numValue / fromRate) * toRate;
    } else {
        const fromFactor = conversionFactors[currentCategory][fromUnit.value];
        const toFactor = conversionFactors[currentCategory][toUnit.value];
        result = (numValue * fromFactor) / toFactor;
    }

    // Format the result with appropriate significant figures
    if (result === 0) {
        setOutputValue('0', true);
        isConverting = false;
        return;
    }
    
    // For very small numbers, use scientific notation
    if (Math.abs(result) < 0.0001) {
        setOutputValue(result.toExponential(significantDigits - 1), true);
        animateResult();
        isConverting = false;
        return;
    }
    
    // For very large numbers, use scientific notation
    if (Math.abs(result) >= 1000000) {
        setOutputValue(result.toExponential(significantDigits - 1), true);
        animateResult();
        isConverting = false;
        return;
    }
    
    // For regular numbers, use the selected significant digits
    const magnitude = Math.floor(Math.log10(Math.abs(result)));
    const precision = Math.max(0, significantDigits - magnitude - 1);
    setOutputValue(result.toFixed(precision), true);
    animateResult();
    
    // Use timeout to allow UI update before resetting flag
    setTimeout(() => {
        isConverting = false;
    }, 10);
}

// Convert units from output to input
function reverseConvert() {
    if (isConverting) return;
    isConverting = true;
    
    const value = outputValue.value;
    if (value === '') {
        setInputValue('', true);
        isConverting = false;
        return;
    }

    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
        setInputValue('', true);
        isConverting = false;
        return;
    }

    let result;
    if (currentCategory === 'temperature') {
        const fromTemp = toUnit.value;
        const toTemp = fromUnit.value;
        result = conversionFactors.temperature[fromTemp][`to${toTemp.charAt(0).toUpperCase() + toTemp.slice(1)}`](numValue);
    } else if (currentCategory === 'currency') {
        const fromRate = conversionFactors.currency[toUnit.value];
        const toRate = conversionFactors.currency[fromUnit.value];
        result = (numValue / fromRate) * toRate;
    } else {
        const fromFactor = conversionFactors[currentCategory][toUnit.value];
        const toFactor = conversionFactors[currentCategory][fromUnit.value];
        result = (numValue * fromFactor) / toFactor;
    }

    // Format the result with appropriate significant figures
    if (result === 0) {
        setInputValue('0', true);
        isConverting = false;
        return;
    }
    
    // For very small numbers, use scientific notation
    if (Math.abs(result) < 0.0001) {
        setInputValue(result.toExponential(significantDigits - 1), true);
        animateInputResult();
        isConverting = false;
        return;
    }
    
    // For very large numbers, use scientific notation
    if (Math.abs(result) >= 1000000) {
        setInputValue(result.toExponential(significantDigits - 1), true);
        animateInputResult();
        isConverting = false;
        return;
    }
    
    // For regular numbers, use the selected significant digits
    const magnitude = Math.floor(Math.log10(Math.abs(result)));
    const precision = Math.max(0, significantDigits - magnitude - 1);
    setInputValue(result.toFixed(precision), true);
    animateInputResult();
    
    // Use timeout to allow UI update before resetting flag
    setTimeout(() => {
        isConverting = false;
    }, 10);
}

// Event listeners
inputValue.addEventListener('input', convert);
outputValue.addEventListener('input', reverseConvert);
fromUnit.addEventListener('change', convert);
toUnit.addEventListener('change', convert);

swapButton.addEventListener('click', () => {
    const tempFromUnit = fromUnit.value;
    const tempToUnit = toUnit.value;
    const tempFromValue = inputValue.value;
    const tempToValue = outputValue.value;
    
    // Animate the swap
    swapButton.querySelector('svg').style.animation = 'rotateSwap 0.4s ease-out';
    
    // First input group slides out right
    document.querySelectorAll('.input-group')[0].style.animation = 'slideOutRight 0.3s forwards';
    
    // Second input group slides out left
    document.querySelectorAll('.input-group')[1].style.animation = 'slideOutLeft 0.3s forwards';
    
    setTimeout(() => {
        // Swap the unit selectors
        fromUnit.value = tempToUnit;
        toUnit.value = tempFromUnit;
        
        // Swap values if both fields have values
        if (tempFromValue && tempToValue) {
            setInputValue(tempToValue, true);
            setOutputValue(tempFromValue, true);
        } else {
            // Perform conversion with the new units
            convert();
        }
        
        // Reset animations
        swapButton.querySelector('svg').style.animation = '';
        
        // Slide back in
        document.querySelectorAll('.input-group')[0].style.animation = 'slideInLeft 0.3s forwards';
        document.querySelectorAll('.input-group')[1].style.animation = 'slideInRight 0.3s forwards';
    }, 300);
});

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Get the previous active button
        const previousActive = document.querySelector('.category-btn.active');
        
        // Remove active class from all buttons
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Get the clicked category
        const clickedCategory = button.dataset.category;
        
        // If this is a different category, animate the transition
        if (currentCategory !== clickedCategory) {
            // Fade out the converter section
            document.querySelector('.converter').style.opacity = '0';
            document.querySelector('.converter').style.transform = 'translateY(-10px)';
            
            // Animate blobs when changing categories
            animateBackgroundBlobs();
            
            setTimeout(() => {
                // Update the category
                currentCategory = clickedCategory;
                updateUnitOptions(currentCategory);
                
                // Update the theme based on category
                document.body.setAttribute('data-category', currentCategory);
                
                // Clear the input and output fields
                inputValue.value = '';
                outputValue.value = '';
                
                // Fade in the converter section
                document.querySelector('.converter').style.opacity = '1';
                document.querySelector('.converter').style.transform = 'translateY(0)';
            }, 300);
        }
    });
});

// Function to animate background blobs when changing categories
function animateBackgroundBlobs() {
    const blobs = document.querySelectorAll('.background-blob');
    
    blobs.forEach((blob, index) => {
        // Add a quick pulse animation
        blob.style.transition = 'transform 0.5s, background-color 0.8s';
        blob.style.transform = 'scale(1.1)';
        
        setTimeout(() => {
            blob.style.transform = 'scale(1)';
        }, 500);
        
        // Randomize positions slightly for more dynamic feel
        const xShift = Math.random() * 10 - 5; // -5 to 5
        const yShift = Math.random() * 10 - 5; // -5 to 5
        
        if (index === 0) {
            blob.style.top = `calc(-15% + ${yShift}%)`;
            blob.style.right = `calc(-10% + ${xShift}%)`;
        } else if (index === 1) {
            blob.style.bottom = `calc(-10% + ${yShift}%)`;
            blob.style.left = `calc(-5% + ${xShift}%)`;
        } else if (index === 2) {
            blob.style.top = `calc(40% + ${yShift}%)`;
            blob.style.right = `calc(20% + ${xShift}%)`;
        }
    });
}

// Initialize
updateUnitOptions(currentCategory);
document.body.setAttribute('data-category', currentCategory);

// Add animation functions
function animateResult() {
    // Add highlight animation
    outputValue.style.animation = 'none';
    setTimeout(() => {
        outputValue.style.animation = 'highlightResult 1s ease-out';
    }, 0);
}

function animateInputResult() {
    inputValue.style.animation = 'none';
    setTimeout(() => {
        inputValue.style.animation = 'highlightResult 1s ease-out';
    }, 0);
}

// Add these keyframe animations to the document
const styleSheet = document.createElement('style');
styleSheet.textContent = `
@keyframes slideOutRight {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(20px); opacity: 0; }
}

@keyframes slideOutLeft {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(-20px); opacity: 0; }
}

@keyframes slideInLeft {
    from { transform: translateX(-20px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}

@keyframes slideInRight {
    from { transform: translateX(20px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}

.converter {
    transition: opacity 0.3s, transform 0.3s;
}
`;
document.head.appendChild(styleSheet);

// PWA installation logic
let deferredPrompt;
const installBtn = document.createElement('button');
installBtn.style.display = 'none';
installBtn.className = 'install-btn';
installBtn.textContent = 'Install App';
document.querySelector('.header').appendChild(installBtn);

// Style the install button
installBtn.style.backgroundColor = 'var(--primary-color)';
installBtn.style.color = 'white';
installBtn.style.border = 'none';
installBtn.style.padding = '0.5rem 1rem';
installBtn.style.borderRadius = 'var(--radius-sm)';
installBtn.style.marginLeft = '1rem';
installBtn.style.fontWeight = '500';
installBtn.style.transition = 'all var(--transition-duration) ease-in-out';
installBtn.style.cursor = 'pointer';

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later
    deferredPrompt = e;
    // Update UI to notify the user they can add to home screen
    installBtn.style.display = 'block';
});

installBtn.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    
    // Show the prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    // We've used the prompt, and can't use it again, so clear it
    deferredPrompt = null;
    
    // Hide the install button
    installBtn.style.display = 'none';
    
    // Log the outcome
    console.log(`User ${outcome === 'accepted' ? 'accepted' : 'dismissed'} the install prompt`);
});

// Handle installed app
window.addEventListener('appinstalled', (e) => {
    // Log install to analytics
    console.log('App was installed', e);
    // Hide the install button
    installBtn.style.display = 'none';
});

// Update accuracy UI based on current setting
function updateAccuracyUI() {
    // Update text display
    accuracyValueDisplay.textContent = `${significantDigits}`;
    
    // Update slider fill
    const percentage = ((significantDigits - MIN_ACCURACY) / (MAX_ACCURACY - MIN_ACCURACY)) * 100;
    accuracyFill.style.width = `${percentage}%`;
    
    // Update slider position
    document.getElementById('accuracySlider').value = significantDigits;
    
    // Update button states
    decreaseAccuracyBtn.classList.toggle('disabled', significantDigits <= MIN_ACCURACY);
    increaseAccuracyBtn.classList.toggle('disabled', significantDigits >= MAX_ACCURACY);
    
    // Reconvert with new accuracy if values exist
    if (inputValue.value) {
        convert();
    } else if (outputValue.value) {
        reverseConvert();
    }
}

// Increase accuracy
function increaseAccuracy() {
    if (significantDigits < MAX_ACCURACY) {
        significantDigits++;
        updateAccuracyUI();
    }
}

// Decrease accuracy
function decreaseAccuracy() {
    if (significantDigits > MIN_ACCURACY) {
        significantDigits--;
        updateAccuracyUI();
    }
}

// Event listeners for accuracy controls
decreaseAccuracyBtn.addEventListener('click', () => {
    if (significantDigits > MIN_ACCURACY) {
        decreaseAccuracy();
        
        // Add click animation
        decreaseAccuracyBtn.style.transform = 'scale(0.9)';
        setTimeout(() => {
            decreaseAccuracyBtn.style.transform = '';
        }, 100);
    }
});

increaseAccuracyBtn.addEventListener('click', () => {
    if (significantDigits < MAX_ACCURACY) {
        increaseAccuracy();
        
        // Add click animation
        increaseAccuracyBtn.style.transform = 'scale(0.9)';
        setTimeout(() => {
            increaseAccuracyBtn.style.transform = '';
        }, 100);
    }
});

// Make the slider clickable
document.querySelector('.accuracy-slider').addEventListener('click', (e) => {
    const sliderRect = e.currentTarget.getBoundingClientRect();
    const clickPosition = e.clientX - sliderRect.left;
    const percentage = clickPosition / sliderRect.width;
    
    // Calculate new accuracy value based on click position
    const newAccuracy = Math.round(MIN_ACCURACY + percentage * (MAX_ACCURACY - MIN_ACCURACY));
    
    // Update accuracy
    significantDigits = Math.max(MIN_ACCURACY, Math.min(MAX_ACCURACY, newAccuracy));
    updateAccuracyUI();
});

// Make the slider work properly
document.querySelector('.accuracy-slider').addEventListener('input', (e) => {
    // Update accuracy based on slider position
    significantDigits = parseInt(e.target.value);
    updateAccuracyUI();
});

// Initialize accuracy slider on DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
    // ...existing code from DOMContentLoaded if any...
    
    // Ensure the slider and fill are correctly set on page load
    updateAccuracyUI();
});

