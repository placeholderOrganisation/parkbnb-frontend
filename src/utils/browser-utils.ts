import { Location } from "react-router-dom";

export const openInNewTab = (href: string) => {
  Object.assign(document.createElement("a"), {
    target: "_blank",
    rel: "noopener noreferrer",
    href: href,
  }).click();
};

export const copyToClipboard = (text: string) => {
  if (!navigator.clipboard) {
    return Promise.resolve(false);
  }

  return navigator.clipboard
    .writeText(text)
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
};

export const getURIParams = () => {
  try {
    const location = window.location;
    const searchParams = new URLSearchParams(location.search);
    const params = Object.fromEntries(searchParams.entries());
    return params;
  } catch (error) {
    console.error("Error occurred while getting URI params:", error);
    return {};
  }
};
