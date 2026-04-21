import localFont from "next/font/local";

export const aeonikPro = localFont({
  src: [
    {
      path: "../public/fonts/AeonikPro-Trial/AeonikProTRIAL-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/AeonikPro-Trial/AeonikProTRIAL-LightItalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/AeonikPro-Trial/AeonikProTRIAL-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/AeonikPro-Trial/AeonikProTRIAL-RegularItalic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/AeonikPro-Trial/AeonikProTRIAL-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/AeonikPro-Trial/AeonikProTRIAL-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-aeonik-pro",
  display: "swap",
});
