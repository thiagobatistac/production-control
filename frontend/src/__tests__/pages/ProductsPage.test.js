import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ProductsPage from '../../pages/ProductsPage';
import productsReducer from '../../redux/slices/productsSlice';

const mockStore = configureStore({
  reducer: {
    products: productsReducer
  },
  preloadedState: {
    products: {
      items: [
        { id: 1, name: 'Test Product', price: 100.00 },
        { id: 2, name: 'Another Product', price: 200.00 }
      ],
      loading: false,
      error: null
    }
  }
});

const renderWithProvider = (component) => {
  return render(
    <Provider store={mockStore}>
      {component}
    </Provider>
  );
};

describe('ProductsPage', () => {
  test('renders products management title', () => {
    renderWithProvider(<ProductsPage />);
    expect(screen.getByText('Products Management')).toBeInTheDocument();
  });

  test('displays products in table', () => {
    renderWithProvider(<ProductsPage />);
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Another Product')).toBeInTheDocument();
  });

  test('shows search input', () => {
    renderWithProvider(<ProductsPage />);
    const searchInput = screen.getByPlaceholderText('Search products by name...');
    expect(searchInput).toBeInTheDocument();
  });

  test('shows new product button', () => {
    renderWithProvider(<ProductsPage />);
    expect(screen.getByText('+ New Product')).toBeInTheDocument();
  });

  test('opens form when new product button is clicked', () => {
    renderWithProvider(<ProductsPage />);
    const newButton = screen.getByText('+ New Product');
    fireEvent.click(newButton);
    expect(screen.getByText('New Product')).toBeInTheDocument();
    expect(screen.getByLabelText('Product Name *')).toBeInTheDocument();
  });

  test('displays edit and delete buttons for each product', () => {
    renderWithProvider(<ProductsPage />);
    const editButtons = screen.getAllByText('Edit');
    const deleteButtons = screen.getAllByText('Delete');
    expect(editButtons).toHaveLength(2);
    expect(deleteButtons).toHaveLength(2);
  });
});