const textbg = document.querySelector(".textbg")
const color1 = document.querySelector("#color1")
const color2 = document.querySelector("#color2")
const copyButton = document.querySelector("#copy")
const generate = document.querySelector("#generate")
const body = document.querySelector("body")

const setColor1 = (color) => {
    if (!color1) return
    color1.innerText = color
    color1.style.color = setTextColor(getColor1())
}

const getColor1 = () => {
    if (!color1) return
    return color1.innerText
}

const setColor2 = (color) => {
    if (!color2) return
    color2.innerText = color
    color2.style.color = setTextColor(getColor2())
}

const getColor2 = () => {
    if (!color2) return
    return color2.innerText
}

const updateBody = () => {
    if (!(body && copyButton)) return
    // body.style.background = getUpdatedColor()
    setElemBackground(body, getUpdatedColor())
    copyButton.innerText = getUpdatedColor()
    console.log(getUpdatedColor())
}
function setTextColor(hex) {
    // Remove the '#' if present
    hex = hex.replace('#', '')
    // Convert hex to RGB
    const r = parseInt(hex.substr(0, 2), 16)
    const g = parseInt(hex.substr(2, 2), 16)
    const b = parseInt(hex.substr(4, 2), 16)
    // Calculate brightness
    const brightness = (0.299 * r + 0.587 * g + 0.114 * b)
    // Return dark text for light colors and light text for dark colors
    return brightness > 128 ? '#000000' : '#FFFFFF'
}

const randomColorGenerator = () => {
    var letter = "0123456789ABCDEF"
    var color = "#"
    for (var i = 0; i < 6; i++) {
        color += letter[Math.floor(Math.random() * 16)]
    }
    console.log(color)
    return color
}

const getUpdatedColor = () => {
    return `linear-gradient(to right, ${getColor1()}, ${getColor2()})`
}

const updateText = () => {
    if (!textbg) return
    textbg.style.backgroundImage = getUpdatedColor()
    textbg.style.backgroundClip = "text"
    textbg.style.color = "transparent"
}

const setTextBrightness = () => {
    if (!(copyButton && generate)) return

    if (setTextColor(getColor1()) === "#FFFFFF" || setTextColor(getColor2()) === "#FFFFFF") {
        copyButton.style.color = "#FFFFFF"
        generate.style.color = "#FFFFFF"
    } else {
        copyButton.style.color = "#000000"
        generate.style.color = "#000000"
    }
}

const generateNewCombo = (randomColor) => {
    if (!(color1 && color2 && body && copyButton && generate)) return console.log("Element not found")
    setColor1(randomColor())
    setColor2(randomColor())
    updateBody()
    setElemBackground(color1, getColor1())
    setElemBackground(color2, getColor2())
    setElemBackground(copyButton, getUpdatedColor())
    setElemBackground(generate, getUpdatedColor())
    setTextBrightness()
    updateText()
}

copyButton?.addEventListener('click', () => {
    navigator.clipboard.writeText(getUpdatedColor())
    copyButton.innerText = getUpdatedColor()
})

color1?.addEventListener('click', () => {
    if (!copyButton || !generate) return
    setColor1(randomColorGenerator())
    updateBody()
    // color1.style.background = getColor1()
    setElemBackground(color1, getColor1())
    updateText()
    setElemBackground(copyButton, getUpdatedColor())
    setElemBackground(generate, getUpdatedColor())
    setTextBrightness()
    // color1.style.boxshadow=`0px 0px 30px 30px ${getColor1()}, 0px 0px 30px 30px ${getColor1()}`
})

color2?.addEventListener('click', () => {
    if (!copyButton || !generate) return
    setColor2(randomColorGenerator())
    updateBody()
    // color2.style.background = getColor2()
    setElemBackground(color2, getColor2())
    updateText()
    setElemBackground(copyButton, getUpdatedColor())
    setElemBackground(generate, getUpdatedColor())
    setTextBrightness()
})

const setElemBackground = (/** @type {Element} */ elem, /** @type {string} */ color) => {
    elem.style.background = color
}

generate?.addEventListener('click', () => generateNewCombo(randomColorGenerator));
// IIFE to generate a new color combo on page load
(function (randomColor) { generateNewCombo(randomColor) })(randomColorGenerator)




// ChatGPT Code
// const elements = {
//     textbg: document.querySelector(".textbg"),
//     color1: document.querySelector("#color1"),
//     color2: document.querySelector("#color2"),
//     copyButton: document.querySelector("#copy"),
//     generate: document.querySelector("#generate"),
//     body: document.querySelector("body")
// };

// const setColor = (element, color) => {
//     if (!element) return;
//     element.innerText = color;
//     element.style.color = setTextColor(color);
// };

// const getColor = (element) => element?.innerText || "#000000";

// const setTextColor = (hex) => {
//     hex = hex.replace("#", "");
//     const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.substr(i, 2), 16));
//     return (0.299 * r + 0.587 * g + 0.114 * b) > 128 ? "#000000" : "#FFFFFF";
// };

// const randomColorGenerator = () => "#" + [...Array(6)].map(() => "0123456789ABCDEF"[Math.floor(Math.random() * 16)]).join("");

// const getGradient = () => `linear-gradient(to right, ${getColor(elements.color1)}, ${getColor(elements.color2)})`;

// const updateElementBackground = (element, color) => {
//     if (element) element.style.background = color;
// };

// const updateBody = () => {
//     if (!elements.body || !elements.copyButton) return;
//     const gradient = getGradient();
//     updateElementBackground(elements.body, gradient);
//     elements.copyButton.innerText = gradient;
// };

// const applyGradientEffect = () => {
//     if (!elements.textbg) return;
//     elements.textbg.style.backgroundImage = getGradient();
//     elements.textbg.style.backgroundClip = "text";
//     elements.textbg.style.color = "transparent";
// };

// const setButtonTextColor = () => {
//     if (!elements.copyButton || !elements.generate) return;
//     const color1Text = setTextColor(getColor(elements.color1));
//     const color2Text = setTextColor(getColor(elements.color2));
//     const textColor = (color1Text === "#FFFFFF" || color2Text === "#FFFFFF") ? "#FFFFFF" : "#000000";

//     elements.copyButton.style.color = textColor;
//     elements.generate.style.color = textColor;
// };

// const generateNewCombo = (randomColor) => {
//     if (!elements.color1 || !elements.color2 || !elements.body || !elements.copyButton || !elements.generate) {
//         console.error("Element not found");
//         return;
//     }

//     setColor(elements.color1, randomColor());
//     setColor(elements.color2, randomColor());

//     updateBody();
//     [elements.color1, elements.color2, elements.copyButton, elements.generate].forEach(el => updateElementBackground(el, getGradient()));

//     setButtonTextColor();
//     applyGradientEffect();
// };

// const handleColorClick = (element) => {
//     if (!elements.copyButton || !elements.generate) return;
//     setColor(element, randomColorGenerator());
//     updateBody();
//     updateElementBackground(element, getColor(element));
//     applyGradientEffect();
//     updateElementBackground(elements.copyButton, getGradient());
//     updateElementBackground(elements.generate, getGradient());
//     setButtonTextColor();
// };

// elements.copyButton?.addEventListener("click", () => {
//     if(!elements.copyButton) return;
//     navigator.clipboard.writeText(getGradient());
//     elements.copyButton.innerText = getGradient();
// });

// elements.color1?.addEventListener("click", () => handleColorClick(elements.color1));
// elements.color2?.addEventListener("click", () => handleColorClick(elements.color2));
// elements.generate?.addEventListener("click", () => generateNewCombo(randomColorGenerator));

// // IIFE to generate a new color combo on page load
// (() => generateNewCombo(randomColorGenerator))();



//Deepseek Code

// const elements = {
//     color1: document.querySelector("#color1"),
//     color2: document.querySelector("#color2"),
//     copyButton: document.querySelector("#copy"),
//     generateButton: document.querySelector("#generate"),
//     body: document.body,
//     colorValueDisplays: document.querySelectorAll(".color-value"),
//     gradientTexts: document.querySelectorAll(".gradient-text")
// }

// // Utility functions
// const setElementColor = (element, color) => {
//     if (!element) return
//     element.style.color = getContrastColor(color)
//     element.querySelector(".color-value").textContent = color.toUpperCase()
//     element.querySelector("i").style.color = getContrastColor(color)
// }

// const setElementBackground = (element, color) => {
//     if (element) element.style.background = color
// }

// const getContrastColor = (hex) => {
//     // Remove '#' if present
//     hex = hex.replace('#', '')
//     // Convert 3-digit hex to 6-digit if needed
//     if (hex.length === 3) {
//         hex = hex.split('').map(c => c + c).join('')
//     }
//     // Extract R, G, B and convert to 0-1 range
//     let r = parseInt(hex.substring(0, 2), 16) / 255
//     let g = parseInt(hex.substring(2, 4), 16) / 255
//     let b = parseInt(hex.substring(4, 6), 16) / 255
//     // Linearize sRGB values (inverse gamma correction)
//     r = (r <= 0.04045) ? (r / 12.92) : Math.pow((r + 0.055) / 1.055, 2.4)
//     g = (g <= 0.04045) ? (g / 12.92) : Math.pow((g + 0.055) / 1.055, 2.4)
//     b = (b <= 0.04045) ? (b / 12.92) : Math.pow((b + 0.055) / 1.055, 2.4)
//     const brightness = 0.2126 * r + 0.7152 * g + 0.0722 * b
//     return brightness > 128 ? '#000' : '#fff'
// }

// const generateRandomColor = () => '#' + Math.floor(Math.random() * 0x1000000).toString(16).padStart(6, '0')

// const updateGradient = () => {
//     if (!elements.color1 || !elements.color2 || !elements.body) return
//     const gradient = `linear-gradient(to right, ${elements.color1.dataset.color}, ${elements.color2.dataset.color})`

//     // Update background and text elements
//     elements.body.style.background = gradient
//     elements.gradientTexts.forEach(text =>
//         text.style.backgroundImage = gradient
//     )

//     // Update copy button text
//     // elements.copyButton.querySelector("span").textContent = "Copy CSS"
//     if (elements.copyButton) {
//         const span = elements.copyButton.querySelector("span")
//         if (span) {
//             span.textContent = "Copy CSS"
//         }
//     }
//     return gradient
// }

// // Event handlers
// const handleColorClick = (colorElement) => {
//     const newColor = generateRandomColor()
//     colorElement.dataset.color = newColor
//     setElementBackground(colorElement, newColor)
//     setElementColor(colorElement, newColor)
//     updateGradient()
// }

// const handleGenerateNew = () => {
//     [elements.color1, elements.color2].forEach(btn => {
//         const newColor = generateRandomColor()
//         btn.dataset.color = newColor
//         setElementBackground(btn, newColor)
//         setElementColor(btn, newColor)
//     })
//     updateGradient()
// }

// const handleCopy = async () => {
//     const gradient = updateGradient()
//     try {
//         await navigator.clipboard.writeText(gradient)
//         // elements.copyButton.querySelector("span").textContent = "Copied!"
//         if (elements.copyButton) {
//             const span = elements.copyButton.querySelector("span")
//             if (span) {
//                 span.textContent = "Copied!"
//             }
//         }
//         setTimeout(() => {
//             // elements.copyButton.querySelector("span").textContent = "Copy CSS"
//             if (elements.copyButton) {
//                 const span = elements.copyButton.querySelector("span")
//                 if (span) {
//                     span.textContent = "Copy CSS"
//                 }
//             }
//         }, 2000)
//     } catch (err) {
//         console.error('Failed to copy:', err)
//     }
// }

// // Initialize application
// const initializeApp = () => {
//     if (!elements.color1 || !elements.color2 || !elements.copyButton || !elements.generateButton || !elements.body) {
//         console.error("Element not found")
//         return
//     }
//     // Set initial colors
//     [elements.color1, elements.color2].forEach(btn => {
//         const initialColor = generateRandomColor()
//         btn.dataset.color = initialColor
//         setElementBackground(btn, initialColor)
//         setElementColor(btn, initialColor)
//     })

//     // Set initial gradient
//     updateGradient()

//     // Event listeners
//     elements.color1.addEventListener("click", () => handleColorClick(elements.color1))
//     elements.color2.addEventListener("click", () => handleColorClick(elements.color2))
//     elements.generateButton.addEventListener("click", handleGenerateNew)
//     elements.copyButton.addEventListener("click", handleCopy)
// }

// // Start the app
// document.addEventListener("DOMContentLoaded", initializeApp)