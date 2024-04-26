export const openInNewTab = (href: string) => {
  Object.assign(document.createElement("a"), {
    target: "_blank",
    rel: "noopener noreferrer",
    href: href,
  }).click();
};

export const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};
