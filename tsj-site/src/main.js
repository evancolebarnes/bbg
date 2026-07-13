import registry from "./registry";

window.TSJ = {
  init(modules = []) {
    modules.forEach((name) => {
      registry[name]?.();
    });
  },
};
