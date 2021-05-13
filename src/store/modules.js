/* eslint-disable no-undef */
const moduleReducer = require.context('.', true, /reducer.js/);

const reducers = {};
moduleReducer.keys().forEach((file) => {
  if (file === './reducer.js') return;
  const module = moduleReducer(file);
  if (module.reducer) {
    reducers[module.namespace] = module.reducer;
  }
});

export default reducers;
