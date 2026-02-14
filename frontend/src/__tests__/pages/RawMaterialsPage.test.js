import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import RawMaterialsPage from '../../pages/RawMaterialsPage';
import rawMaterialsReducer from '../../redux/slices/rawMaterialsSlice';

const mockStore = configureStore({
  reducer: {
    rawMaterials: rawMaterialsReducer
  },
  preloadedState: {
    rawMaterials: {
      items: [
        { id: 1, name: 'Steel', stockQuantity: 100 },
        { id: 2, name: 'Wood', stockQuantity: 50 }
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

describe('RawMaterialsPage', () => {
  test('renders raw materials management title', () => {
    renderWithProvider(<RawMaterialsPage />);
    expect(screen.getByText('Raw Materials Management')).toBeInTheDocument();
  });

  test('displays raw materials in table', () => {
    renderWithProvider(<RawMaterialsPage />);
    expect(screen.getByText('Steel')).toBeInTheDocument();
    expect(screen.getByText('Wood')).toBeInTheDocument();
  });

  test('shows filter buttons', () => {
    renderWithProvider(<RawMaterialsPage />);
    expect(screen.getByText('Show All')).toBeInTheDocument();
    expect(screen.getByText('Show Only In Stock')).toBeInTheDocument();
  });

  test('shows new raw material button', () => {
    renderWithProvider(<RawMaterialsPage />);
    expect(screen.getByText('+ New Raw Material')).toBeInTheDocument();
  });

  test('opens form when new raw material button is clicked', () => {
    renderWithProvider(<RawMaterialsPage />);
    const newButton = screen.getByText('+ New Raw Material');
    fireEvent.click(newButton);
    expect(screen.getByText('New Raw Material')).toBeInTheDocument();
  });

  test('displays edit and delete buttons for each raw material', () => {
    renderWithProvider(<RawMaterialsPage />);
    const editButtons = screen.getAllByText('Edit');
    const deleteButtons = screen.getAllByText('Delete');
    expect(editButtons).toHaveLength(2);
    expect(deleteButtons).toHaveLength(2);
  });
});