import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductionSuggestionsPage from '../../pages/ProductionSuggestionPage';

describe('ProductionSuggestionsPage', () => {
  test('renders production suggestions title', () => {
    render(<ProductionSuggestionsPage />);
    expect(screen.getByText('Production Suggestions')).toBeInTheDocument();
  });

  test('shows calculate button', () => {
    render(<ProductionSuggestionsPage />);
    const button = screen.getByRole('button', { name: /Calculate Production Suggestions/i });
    expect(button).toBeInTheDocument();
  });

  test('displays instructions text', () => {
    render(<ProductionSuggestionsPage />);
    expect(screen.getByText(/Calculate what can be produced/i)).toBeInTheDocument();
  });

  test('displays help text', () => {
    render(<ProductionSuggestionsPage />);
    expect(screen.getByText(/Click the button above/i)).toBeInTheDocument();
  });

  test('displays system analysis description', () => {
    render(<ProductionSuggestionsPage />);
    expect(screen.getByText(/The system will analyze/i)).toBeInTheDocument();
  });
});