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
