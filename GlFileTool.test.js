import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import GlFileTool from './src/pages/other/GlTool';
import { ToastContainer } from 'react-toastify';

test('renders GL File Tool component', () => {
  render(<GlFileTool />);
  expect(screen.getByText(/Optimize your GL Files/i)).toBeInTheDocument();
});

test('shows error message when no files are selected for upload', async () => {
  render(
    <>
      <GlFileTool />
      <ToastContainer />
    </>
  );

  fireEvent.click(screen.getByText(/Upload Files/i));
  await waitFor(() => {
    expect(screen.getByText(/No files chosen!/i)).toBeInTheDocument();
  });
});

