// src/main.jsx
import './App.css';
import { ViteReactSSG } from 'vite-react-ssg';
import routes from './routes';

export const createRoot = ViteReactSSG(
  { routes },
  // Optional hook for extra setup (e.g., fetch initial data)
  () => {},
);
