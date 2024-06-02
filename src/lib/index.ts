export const getPreferredScheme = () => {
  return window?.matchMedia?.("(prefers-color-scheme:dark)")?.matches ? "dark" : "light";
};
