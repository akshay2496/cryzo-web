import React from 'react';
import ReactDOM from 'react-dom/client';

/** Hydrates pre-rendered HTML in production; renders from scratch in dev. */
export function mount(element) {
  const root = document.getElementById('root');
  const app = <React.StrictMode>{element}</React.StrictMode>;
  if (root.firstElementChild) ReactDOM.hydrateRoot(root, app);
  else ReactDOM.createRoot(root).render(app);
}
