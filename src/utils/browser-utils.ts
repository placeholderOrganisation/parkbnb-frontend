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

export const deleteURIParam = (param: string) => {
  try {
    const params = new URLSearchParams(window.location.search);
    params.delete(param);

    if (params.toString() === "") {
      window.history.replaceState({}, "", window.location.pathname);
    } else {
      window.history.replaceState(
        {},
        "",
        `${window.location.pathname}?${params.toString()}`
      );
    }
  } catch (error) {
    console.error("Error occurred while deleting URI param:", error);
  }
};
