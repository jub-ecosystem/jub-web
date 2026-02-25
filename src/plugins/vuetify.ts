/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

const jubTheme = {
  dark: false,
  colors: {
    // Semantic Backgrounds & Surfaces
    background: '#EFF3F6', 
    surface: '#FFFFFF',
    
    // Core Brand Colors
    primary: '#00ABDC',    
    secondary: '#0089B8',  
    
    // Custom Brand Variants
    'primary-darken-1': '#004873', 
    'primary-darken-2': '#002B53', 
    'primary-lighten-1': '#0089B8', 
    
    // Neutral Text/Accents
    'text-grey': '#354954', 
    'surface-variant': '#99AEBB',
    
    'primary-blue': '#0a192f',
    'secondary-blue': '#0089B8',
    'surface-light': '#d1d5db',
    
    // Standard States
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
}


// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'jubTheme',
    themes: {
      jubTheme,
    },
  },
})
