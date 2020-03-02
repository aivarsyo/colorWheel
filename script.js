let colorWheel = document.querySelector("#favcolor");
let hexColor = document.querySelector("#texts > div:nth-child(3) > .hex span");

let hue;
let sat;
let lum;

let red;
let green;
let blue;


colorWheel.addEventListener("input", changeColor);



function changeColor() {

    let chosenColor = colorWheel.value;
    hexColor.textContent = chosenColor;

    // takes the color from color picker and makes the middle square like it
    const colorSquare = document.querySelector("#squares > div:nth-child(3)");
    colorSquare.style.setProperty("--colorSquare", this.value);
    // sets h to chosen color for the function
    let h = this.value;


    function hexToRGB(h) {
        let r = 0, g = 0, b = 0;

        // 3 digits
        if (h.length == 4) {
            r = "0x" + h[1] + h[1];
            g = "0x" + h[2] + h[2];
            b = "0x" + h[3] + h[3];

            // 6 digits
        } else if (h.length == 7) {
            r = "0x" + h[1] + h[2];
            g = "0x" + h[3] + h[4];
            b = "0x" + h[5] + h[6];
        }
        red = r;
        green = g;
        blue = b;
        return "rgb(" + +r + "," + +g + "," + +b + ")";
    }
    // sets rgb text content to chosen color
    let rgb = document.querySelector("#texts > div:nth-child(3) > .rgb span").textContent = hexToRGB(h);

    function RGBToHSL(red, green, blue) {

        // Make r, g, and b fractions of 1
        red /= 255;
        green /= 255;
        blue /= 255;

        // Find greatest and smallest channel values
        let cmin = Math.min(red, green, blue),
            cmax = Math.max(red, green, blue),
            delta = cmax - cmin,
            h = 0,
            s = 0,
            l = 0;

        // Calculate hue
        // No difference
        if (delta == 0)
            h = 0;
        // Red is max
        else if (cmax == red)
            h = ((green - blue) / delta) % 6;
        // Green is max
        else if (cmax == green)
            h = (blue - red) / delta + 2;
        // Blue is max
        else
            h = (red - green) / delta + 4;

        h = Math.round(h * 60);

        // Make negative hues positive behind 360°
        if (h < 0)
            h += 360;

        // Calculate lightness
        l = (cmax + cmin) / 2;

        // Calculate saturation
        s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

        // Multiply l and s by 100
        s = +(s * 100).toFixed(1);
        l = +(l * 100).toFixed(1);

        hue = h;
        sat = s;
        lum = l;

        return "hsl(" + h + "," + s + "%," + l + "%)";

    }
    // sets hsl text content to chosen color
    let hsl = document.querySelector("#texts > div:nth-child(3) > .hsl span").textContent = RGBToHSL(red, green, blue);

    function HSLToHex(hue, sat, lum) {
        sat /= 100;
        lum /= 100;

        let c = (1 - Math.abs(2 * lum - 1)) * sat,
            x = c * (1 - Math.abs((hue / 60) % 2 - 1)),
            m = lum - c / 2,
            r = 0,
            g = 0,
            b = 0;

        if (0 <= hue && hue < 60) {
            r = c; g = x; b = 0;
        } else if (60 <= hue && hue < 120) {
            r = x; g = c; b = 0;
        } else if (120 <= hue && hue < 180) {
            r = 0; g = c; b = x;
        } else if (180 <= hue && hue < 240) {
            r = 0; g = x; b = c;
        } else if (240 <= hue && hue < 300) {
            r = x; g = 0; b = c;
        } else if (300 <= hue && hue < 360) {
            r = c; g = 0; b = x;
        }
        // Having obtained RGB, convert channels to hex
        r = Math.round((r + m) * 255).toString(16);
        g = Math.round((g + m) * 255).toString(16);
        b = Math.round((b + m) * 255).toString(16);

        // Prepend 0s, if necessary
        if (r.length == 1)
            r = "0" + r;
        if (g.length == 1)
            g = "0" + g;
        if (b.length == 1)
            b = "0" + b;

        return "#" + r + g + b;
    }



    function HSLToRGB(hue, sat, lum) {
        // Must be fractions of 1
        sat /= 100;
        lum /= 100;

        let c = (1 - Math.abs(2 * lum - 1)) * sat,
            x = c * (1 - Math.abs((hue / 60) % 2 - 1)),
            m = lum - c / 2,
            r = 0,
            g = 0,
            b = 0;

        if (0 <= hue && hue < 60) {
            r = c; g = x; b = 0;
        } else if (60 <= hue && hue < 120) {
            r = x; g = c; b = 0;
        } else if (120 <= hue && hue < 180) {
            r = 0; g = c; b = x;
        } else if (180 <= hue && hue < 240) {
            r = 0; g = x; b = c;
        } else if (240 <= hue && hue < 300) {
            r = x; g = 0; b = c;
        } else if (300 <= hue && hue < 360) {
            r = c; g = 0; b = x;
        }
        r = Math.round((r + m) * 255);
        g = Math.round((g + m) * 255);
        b = Math.round((b + m) * 255);

        return "rgb(" + r + "," + g + "," + b + ")";
    }

    if (document.querySelector("#options").value == "analogous") {
        analogous();
    } else if (document.querySelector("#options").value == "monochromatic") {
        monochromatic();
    } else if (document.querySelector("#options").value == "triad") {
        triad();
    }


    function analogous() {

        // defines squares for analogous colors
        let square1 = HSLToHex(hue + 12, sat, lum);
        let square2 = HSLToHex(hue + 6, sat, lum);
        let square4 = HSLToHex(hue - 6, sat, lum);
        let square5 = HSLToHex(hue - 12, sat, lum);

        let square1rgb = HSLToRGB(hue + 12, sat, lum);
        let square2rgb = HSLToRGB(hue + 6, sat, lum);
        let square4rgb = HSLToRGB(hue - 6, sat, lum);
        let square5rgb = HSLToRGB(hue - 12, sat, lum);

        let hue1 = hue + 12;
        let hue2 = hue + 6;
        let hue4 = hue - 6;
        let hue5 = hue - 12;

        let square1hsl = "hsl(" + hue1 + "," + sat + "%," + lum + "%)";
        let square2hsl = "hsl(" + hue2 + "," + sat + "%," + lum + "%)";
        let square4hsl = "hsl(" + hue4 + "," + sat + "%," + lum + "%)";
        let square5hsl = "hsl(" + hue5 + "," + sat + "%," + lum + "%)";

        const colorSquare1 = document.querySelector("#squares > div:nth-child(1)");
        colorSquare1.style.setProperty("--colorSquare", square1);
        let hex1 = document.querySelector("#texts > div:nth-child(1) > .hex span").textContent = square1;
        let rgb1 = document.querySelector("#texts > div:nth-child(1) > .rgb span").textContent = square1rgb;
        let hsl1 = document.querySelector("#texts > div:nth-child(1) > .hsl span").textContent = square1hsl;

        const colorSquare2 = document.querySelector("#squares > div:nth-child(2)");
        colorSquare2.style.setProperty("--colorSquare", square2);
        let hex2 = document.querySelector("#texts > div:nth-child(2) > .hex span").textContent = square2;
        let rgb2 = document.querySelector("#texts > div:nth-child(2) > .rgb span").textContent = square2rgb;
        let hsl2 = document.querySelector("#texts > div:nth-child(2) > .hsl span").textContent = square2hsl;

        const colorSquare4 = document.querySelector("#squares > div:nth-child(4)");
        colorSquare4.style.setProperty("--colorSquare", square4);
        let hex4 = document.querySelector("#texts > div:nth-child(4) > .hex span").textContent = square4;
        let rgb4 = document.querySelector("#texts > div:nth-child(4) > .rgb span").textContent = square4rgb;
        let hsl4 = document.querySelector("#texts > div:nth-child(4) > .hsl span").textContent = square4hsl;

        const colorSquare5 = document.querySelector("#squares > div:nth-child(5)");
        colorSquare5.style.setProperty("--colorSquare", square5);
        let hex5 = document.querySelector("#texts > div:nth-child(5) > .hex span").textContent = square5;
        let rgb5 = document.querySelector("#texts > div:nth-child(5) > .rgb span").textContent = square5rgb;
        let hsl5 = document.querySelector("#texts > div:nth-child(5) > .hsl span").textContent = square5hsl;

    }

    function monochromatic() {
        let random1 = Math.floor(Math.random() * 101);
        let random2 = Math.floor(Math.random() * 101);
        let random4 = Math.floor(Math.random() * 101);
        let random5 = Math.floor(Math.random() * 101);
        // defines squares for analogous colors
        let square1 = HSLToHex(hue, sat = random1, lum);
        let square2 = HSLToHex(hue, sat = random2, lum);
        let square4 = HSLToHex(hue, sat = random4, lum);
        let square5 = HSLToHex(hue, sat = random5, lum);

        let square1rgb = HSLToRGB(hue, sat = random1, lum);
        let square2rgb = HSLToRGB(hue, sat = random2, lum);
        let square4rgb = HSLToRGB(hue, sat = random4, lum);
        let square5rgb = HSLToRGB(hue, sat = random5, lum);

        let sat1 = sat = random1;
        let sat2 = sat = random2;
        let sat4 = sat = random4;
        let sat5 = sat = random5;

        let square1hsl = "hsl(" + hue + "," + sat1 + "%," + lum + "%)";
        let square2hsl = "hsl(" + hue + "," + sat2 + "%," + lum + "%)";
        let square4hsl = "hsl(" + hue + "," + sat4 + "%," + lum + "%)";
        let square5hsl = "hsl(" + hue + "," + sat5 + "%," + lum + "%)";

        const colorSquare1 = document.querySelector("#squares > div:nth-child(1)");
        colorSquare1.style.setProperty("--colorSquare", square1);
        let hex1 = document.querySelector("#texts > div:nth-child(1) > .hex span").textContent = square1;
        let rgb1 = document.querySelector("#texts > div:nth-child(1) > .rgb span").textContent = square1rgb;
        let hsl1 = document.querySelector("#texts > div:nth-child(1) > .hsl span").textContent = square1hsl;

        const colorSquare2 = document.querySelector("#squares > div:nth-child(2)");
        colorSquare2.style.setProperty("--colorSquare", square2);
        let hex2 = document.querySelector("#texts > div:nth-child(2) > .hex span").textContent = square2;
        let rgb2 = document.querySelector("#texts > div:nth-child(2) > .rgb span").textContent = square2rgb;
        let hsl2 = document.querySelector("#texts > div:nth-child(2) > .hsl span").textContent = square2hsl;

        const colorSquare4 = document.querySelector("#squares > div:nth-child(4)");
        colorSquare4.style.setProperty("--colorSquare", square4);
        let hex4 = document.querySelector("#texts > div:nth-child(4) > .hex span").textContent = square4;
        let rgb4 = document.querySelector("#texts > div:nth-child(4) > .rgb span").textContent = square4rgb;
        let hsl4 = document.querySelector("#texts > div:nth-child(4) > .hsl span").textContent = square4hsl;

        const colorSquare5 = document.querySelector("#squares > div:nth-child(5)");
        colorSquare5.style.setProperty("--colorSquare", square5);
        let hex5 = document.querySelector("#texts > div:nth-child(5) > .hex span").textContent = square5;
        let rgb5 = document.querySelector("#texts > div:nth-child(5) > .rgb span").textContent = square5rgb;
        let hsl5 = document.querySelector("#texts > div:nth-child(5) > .hsl span").textContent = square5hsl;
    }

    function triad() {
        // defines squares for analogous colors
        let square1 = HSLToHex(hue, sat - 20, lum);
        let square2 = HSLToHex(hue - 60, sat, lum);
        let square4 = HSLToHex(hue - 120, sat, lum);
        let square5 = HSLToHex(hue - 120, sat - 20, lum);

        let square1rgb = HSLToRGB(hue, sat - 20, lum);
        let square2rgb = HSLToRGB(hue - 60, sat, lum);
        let square4rgb = HSLToRGB(hue - 120, sat, lum);
        let square5rgb = HSLToRGB(hue - 120, sat - 20, lum);

        let sat1 = sat - 20;
        let hue2 = hue - 60;
        let hue4 = hue - 120;
        let hue5 = hue - 120;
        let sat5 = sat - 20;

        let square1hsl = "hsl(" + hue + "," + sat1 + "%," + lum + "%)";
        let square2hsl = "hsl(" + hue2 + "," + sat + "%," + lum + "%)";
        let square4hsl = "hsl(" + hue4 + "," + sat + "%," + lum + "%)";
        let square5hsl = "hsl(" + hue5 + "," + sat5 + "%," + lum + "%)";

        const colorSquare1 = document.querySelector("#squares > div:nth-child(1)");
        colorSquare1.style.setProperty("--colorSquare", square1);
        let hex1 = document.querySelector("#texts > div:nth-child(1) > .hex span").textContent = square1;
        let rgb1 = document.querySelector("#texts > div:nth-child(1) > .rgb span").textContent = square1rgb;
        let hsl1 = document.querySelector("#texts > div:nth-child(1) > .hsl span").textContent = square1hsl;

        const colorSquare2 = document.querySelector("#squares > div:nth-child(2)");
        colorSquare2.style.setProperty("--colorSquare", square2);
        let hex2 = document.querySelector("#texts > div:nth-child(2) > .hex span").textContent = square2;
        let rgb2 = document.querySelector("#texts > div:nth-child(2) > .rgb span").textContent = square2rgb;
        let hsl2 = document.querySelector("#texts > div:nth-child(2) > .hsl span").textContent = square2hsl;

        const colorSquare4 = document.querySelector("#squares > div:nth-child(4)");
        colorSquare4.style.setProperty("--colorSquare", square4);
        let hex4 = document.querySelector("#texts > div:nth-child(4) > .hex span").textContent = square4;
        let rgb4 = document.querySelector("#texts > div:nth-child(4) > .rgb span").textContent = square4rgb;
        let hsl4 = document.querySelector("#texts > div:nth-child(4) > .hsl span").textContent = square4hsl;

        const colorSquare5 = document.querySelector("#squares > div:nth-child(5)");
        colorSquare5.style.setProperty("--colorSquare", square5);
        let hex5 = document.querySelector("#texts > div:nth-child(5) > .hex span").textContent = square5;
        let rgb5 = document.querySelector("#texts > div:nth-child(5) > .rgb span").textContent = square5rgb;
        let hsl5 = document.querySelector("#texts > div:nth-child(5) > .hsl span").textContent = square5hsl;
    }
}

