// 1. Import `extendTheme`
import { extendTheme, ThemeConfig } from "@chakra-ui/react"

// setting up theme config
const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
}

// 2. Call `extendTheme` and pass your custom values
// Pass theme config as first argument
export const theme = extendTheme({
  config,
  colors: {
    brand: {
      // Imessage blue
      100: "#3D84F7",
    },
  },
  // Setting custom styles
  styles: {
    global: () => ({
      body: {
        bg: "whiteAlpha.200"
      },
    }),
  },
})