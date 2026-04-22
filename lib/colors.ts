// path: lib/colors.ts
// this file defines the color scheme for the application. 
// Each color has a background, border, and text color associated with it. 
// The colors are used to visually differentiate between different sections and concepts in the application. 
// The ColorKey type is defined to ensure that only valid color keys can be used when referencing colors in the application.

// path: lib/colors.ts
export const colorMap = {
  blue: {
    bg: '#EBF5FB',      // Very pale blue
    border: '#D6EAF8',  // Soft blue border
    text: '#2874A6',    // Muted deep blue text
  },
  green: {
    bg: '#E9F7EF',      // Pastel mint
    border: '#D4EFDF',  // Soft green border
    text: '#1E8449',    // Deep forest green text
  },
  purple: {
    bg: '#F4ECF7',      // Pastel lavender
    border: '#E8DAEF',  // Soft purple border
    text: '#7D3C98',    // Deep plum text
  },
  yellow: {
    bg: '#FEF9E7',      // Pastel cream/yellow
    border: '#FCF3CF',  // Soft yellow border
    text: '#B7950B',    // Mustard text
  },
  gray: {
    bg: '#F8F9F9',      // Off-white gray
    border: '#EAEDED',  // Soft gray border
    text: '#566573',    // Slate text
  },
}

export type ColorKey = keyof typeof colorMap