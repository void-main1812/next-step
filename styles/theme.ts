import { colors } from './colors';

// SECTION lightTheme
export const lightTheme = {
  colors,
  components: {
    // ANCHOR Style for Text component
    Text: {
      title: colors.Neutral[950],
      heading_1: colors.Neutral[900],
      heading_2: colors.Neutral[900],
      heading_3: colors.Neutral[900],
      special: colors.Black,
      body: colors.Neutral[600],
      body_small: colors.Neutral[600],
    },

    // ANCHOR Style for Background component
    Background: {
      color: colors.Neutral[100],
    },

    // ANCHOR Style for StatusBar component
    Statusbar: {
      color: colors.White,
    },

    // ANCHOR Style for Header component
    Header: {
      backgroundColor: colors.White,
      iconColor: colors.Neutral[800],
      shadowColor: colors.Neutral[500],
    },

    // ANCHOR Style for Input component
    Input: {
      backgroundColor: colors.White,
      color: colors.Neutral[900],
      placeholderColor: colors.Neutral[400],
      labelColor: colors.Neutral[600],
    },

    // ANCHOR Style for Button component
    Button: {
      primary: {
        background: colors.Neutral[900],
        textColor: colors.White,
        rippleColor: colors.Neutral[600],
      },
      secondary: {
        background: colors.Neutral[200],
        textColor: colors.Neutral[900],
        rippleColor: colors.Neutral[500],
      },
      link: {
        background: 'transparent',
        textColor: colors.Neutral[900],
        rippleColor: colors.Neutral[300],
      },
      danger: {
        background: colors.Rose[200],
        textColor: colors.Rose[700],
        rippleColor: colors.Rose[300],
      },
    },

    // ANCHOR Style for Icons component
    Icons: {
      normal: {
        background: colors.Neutral[200],
        color: colors.Neutral[900],
      },
      success: {
        background: colors.Emerald[200],
        color: colors.Emerald[700],
      },
      info: {
        background: colors.Blue[200],
        color: colors.Blue[700],
      },
      danger: {
        background: colors.Rose[200],
        color: colors.Rose[700],
      },
      warning: {
        background: colors.Amber[100],
        color: colors.Amber[700],
      },
    },

    // ANCHOR Style for Chip component
    Chip: {
      normal: {
        background: colors.Neutral[200],
        color: colors.Neutral[900],
      },
      favourable: {
        background: colors.Emerald[200],
        color: colors.Emerald[700],
      },
    },

    // ANCHOR Style for DialogueBox component
    DialogueBox: {
      backgroundColor: colors.White,
      titleColor: colors.Neutral[900],
      shadowColor: colors.Neutral[600],
    },

    // ANCHOR Style for Loading Bar
    LoadingBar: {
      backgroundColor: colors.Neutral[200],
      shadoColor: colors.Neutral[600],
    },

    // ANCHOR Style for Saperator component
    Saperator: {
      backgroundColor: colors.Neutral[400],
    },

    backdrop: {
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },

    tabBarIcons: {
      active: colors.Neutral[900],
      inactive: colors.Neutral[400],
    },
  },
  margins: {},
} as const;

// SECTION darkTheme
export const darkTheme = {
  colors,
  components: {
    // ANCHOR Style for Text component
    Text: {
      title: colors.Neutral[50],
      heading_1: colors.Neutral[100],
      heading_2: colors.Neutral[100],
      heading_3: colors.Neutral[100],
      special: colors.White,
      body: colors.Neutral[400],
      body_small: colors.Neutral[400],
    },

    // ANCHOR Style for Background component
    Background: {
      color: colors.Black,
    },

    // ANCHOR Style for StatusBar component
    Statusbar: {
      color: colors.Neutral[800],
    },

    // ANCHOR Style for Header component
    Header: {
      backgroundColor: colors.Neutral[800],
      iconColor: colors.Neutral[200],
      shadowColor: 'transparent',
    },

    // ANCHOR Style for Input component
    Input: {
      backgroundColor: colors.Neutral[900],
      color: colors.Neutral[100],
      placeholderColor: colors.Neutral[600],
      labelColor: colors.Neutral[400],
    },

    // ANCHOR Style for Button component
    Button: {
      primary: {
        background: colors.Neutral[100],
        textColor: colors.Black,
        rippleColor: colors.Neutral[400],
      },
      secondary: {
        background: colors.Neutral[800],
        textColor: colors.Neutral[100],
        rippleColor: colors.Neutral[600],
      },
      link: {
        background: 'transparent',
        textColor: colors.Neutral[100],
        rippleColor: colors.Neutral[700],
      },
      danger: {
        background: colors.Rose[950],
        textColor: colors.Rose[500],
        rippleColor: colors.Rose[800],
      },
    },

    // ANCHOR Style for Icons component
    Icons: {
      normal: {
        background: colors.Neutral[600],
        color: colors.Neutral[100],
      },
      success: {
        background: colors.Emerald[950],
        color: colors.Emerald[500],
      },
      info: {
        background: colors.Blue[950],
        color: colors.Blue[500],
      },
      danger: {
        background: colors.Rose[950],
        color: colors.Rose[500],
      },
      warning: {
        background: colors.Amber[950],
        color: colors.Amber[500],
      },
    },

    // ANCHOR Style for Chip component
    Chip: {
      normal: {
        background: colors.Neutral[800],
        color: colors.Neutral[100],
      },
      favourable: {
        background: colors.Emerald[950],
        color: colors.Emerald[500],
      },
    },

    // ANCHOR Style for DialogueBox component
    DialogueBox: {
      backgroundColor: colors.Neutral[900],
      titleColor: colors.Neutral[100],
      shadowColor: colors.Neutral[950],
    },

    // ANCHOR Style for Loading Bar
    LoadingBar: {
      backgroundColor: colors.Neutral[900],
      shadoColor: 'transparent',
    },

    // ANCHOR Style for Saperator component
    Saperator: {
      backgroundColor: colors.Neutral[600],
    },

    backdrop: {
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },

    tabBarIcons: {
      active: colors.Neutral[100],
      inactive: colors.Neutral[600],
    },
  },
  margins: {},
} as const;
