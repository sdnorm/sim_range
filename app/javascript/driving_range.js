import React from 'react';
import { createRoot } from 'react-dom/client';
import { DrivingRange } from './components';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('driving-range');
  if (container) {
    const root = createRoot(container);
    root.render(<DrivingRange />);
  } else {
    console.error('Could not find #driving-range container');
  }
});