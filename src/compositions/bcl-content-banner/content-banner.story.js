import dataDefault from "@openeuropa/bcl-content-banner/data/data.js";
import contentBanner from "@openeuropa/bcl-content-banner/content-banner.html.twig";
import defaultSprite from "@openeuropa/bcl-bootstrap/bootstrap-icons.svg";

const button = { ...dataDefault.button };

const getArgs = (data) => {
  return {
    background: "gray",
    action_button: false,
  };
};

const getArgTypes = () => {
  return {
    background: {
      type: { name: "select" },
      options: ["white", "gray"],
      description: "White or gray background",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "white" },
      },
    },
    action_button: {
      name: "Action button",
      type: { name: "boolean" },
      description: "Toggle button",
      table: {
        type: { summary: "object" },
        defaultValue: { summary: "{}" },
      },
    },
  };
};

const applyArgs = (data, args) => {
  if (args.action_button) {
    data.action_button = button;
  } else {
    delete data.action_button;
    data.attributes.removeClass(["col-md-10"]);
  }

  data.background = args.background;
  correctPaths(data);

  return data;
};

const correctPaths = (data) => {
  if (data.service_buttons) {
    data.service_buttons.forEach((btn) => {
      btn.icon.path = defaultSprite;
    });
  }

  return data;
};

export default {
  title: "Compositions/Content banner",
};

export const Default = (args) => contentBanner(applyArgs(dataDefault, args));

Default.args = getArgs();
Default.argTypes = getArgTypes();