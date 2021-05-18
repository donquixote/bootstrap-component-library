import { withDesign } from "storybook-addon-designs";
import navbar from "./navbar.html.twig";
import "!!null-loader!@oe/theme-oe/scss/_navbar.scss";
import "!!null-loader!@oe/theme-ecl/scss/_navbar.scss";

// Controls
const getArgTypes = (data) => {
  return {
    color_set: {
      name: "color set",
      type: { name: "select" },
      defaultValue: "light",
      description: "Available set of color",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "light" },
        category: "Style",
      },
      control: {
        type: "select",
        options: ["light", "dark"],
      },
    },
  };
};

// Decoration
const darkMode = (story, controls) => {
  const demo = story();
  return controls.args.color_set === "dark"
    ? `<div class="bg-dark">${demo}</div>`
    : demo;
};

// Stories
export default {
  title: "Components/Navbar",
  decorators: [withDesign],
};

export const Navbar = (args) => navbar(args);

Navbar.storyName = "default";
Navbar.argTypes = getArgTypes();
Navbar.decorators = [darkMode, withDesign];
Navbar.parameters = {
  cssresources: [
    {
      id: "oe",
      code: `<link rel="stylesheet" type="text/css" href="oe.min.css" />`,
      picked: true,
      hideCode: true,
    },
  ],
  design: {
    type: "figma",
    url: "https://www.figma.com/file/vIqhmdQGAgfcDfFs6vb2vZ/OE-Wireframe-kit?node-id=2896%3A0",
  },
};

const NavbarECLArgs = {
  logo_src:
    "https://ec.europa.eu/info/sites/info/themes/europa/images/svg/logo/logo--en.svg",
  logo_width: "240",
  logo_height: "60",
  color_set: "dark",
};

export const NavbarECL = (args) => navbar(NavbarECLArgs);

NavbarECL.storyName = "ECL branding";
NavbarECL.argTypes = {};
NavbarECL.parameters = {
  cssresources: [
    {
      id: "oe-ecl",
      code: `<link rel="stylesheet" type="text/css" href="oe-ecl.min.css" />`,
      picked: true,
      hideCode: true,
    },
  ],
  design: {
    type: "figma",
    url: "https://www.figma.com/file/vIqhmdQGAgfcDfFs6vb2vZ/OE-Wireframe-kit?node-id=2896%3A0",
  },
};
