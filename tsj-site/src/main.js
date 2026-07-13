import registry from "./registry";

window.TSJ = {
  async init(modules = []) {
    for (const name of modules) {
      const loader = registry[name];

      if (!loader) continue;

      const module = await loader();

      module.default();
    }
  },
};
