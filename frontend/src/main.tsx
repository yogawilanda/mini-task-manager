/*
 * -------------- Yoga Wilanda Documentation V.1.0.0 -----------------
 *
 * <meta_config>
 * Author__________________: yogawilanda <eayogawilanda@gmail.com>
 * Path____________________: frontend\src\main.tsx
 * Purpose_________________: Initialize the React application entry point
 * Version_________________: 1.0.0
 * Status__________________: active
 * </meta_config>
 *
 * Function               : React Application Bootstrap
 * Loc                    : main.tsx
 *
 * Responsibilities:
 * - Initialize the React application root.
 * - Load global application styles.
 * - Render the App component in React StrictMode.
 *
 * -------------------------------------------------------------------
 */

import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

import "./index.css";

import "./App.css";

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

