// path: lib/colors.ts
// this file defines the color scheme for the application. 
// Each color has a background, border, and text color associated with it. 
// The colors are used to visually differentiate between different sections and concepts in the application. 
// The ColorKey type is defined to ensure that only valid color keys can be used when referencing colors in the application.

export const colorMap = {
  blue: {
    bg: '#EFF6FF',
    border: '#BFDBFE',
    text: '#1E40AF',
  },
  green: {
    bg: '#F0FDF4',
    border: '#BBF7D0',
    text: '#166534',
  },
  purple: {
    bg: '#FAF5FF',
    border: '#E9D5FF',
    text: '#6B21A8',
  },
  yellow: {
    bg: '#FEFCE8',
    border: '#FDE68A',
    text: '#854D0E',
  },
  gray: {
    bg: '#F9FAFB',
    border: '#E5E7EB',
    text: '#374151',
  },
}

export type ColorKey = keyof typeof colorMap