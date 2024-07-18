import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import UniversityList from './UniversityList/UniversityList';

const mockUniversities = [
  { name: 'University A', country: 'Country A', web_pages: ['http://www.universitya.com'] },
  { name: 'University B', country: 'Country B', web_pages: ['http://www.universityb.com'] },
  { name: 'University C', country: 'Country C', web_pages: ['http://www.universityc.com'] },
];

const mockOnDelete = jest.fn();

const renderComponent = (props = {}) => {
  return render(
    <Router>
      <UniversityList universities={mockUniversities} onDelete={mockOnDelete} {...props} />
    </Router>
  );
};

describe('UniversityList', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('renders the university list title', () => {
    renderComponent();
    expect(screen.getByTestId('university-list-title')).toHaveTextContent('University List');
  });

  test('renders all universities', () => {
    renderComponent();
    mockUniversities.forEach(university => {
      expect(screen.getByText(university.name)).toBeInTheDocument();
    });
  });

  test('filters universities based on search term', () => {
    renderComponent();
    const searchInput = screen.getByPlaceholderText('Search universities...');
    fireEvent.change(searchInput, { target: { value: 'University A' } });
    expect(screen.getByText('University A')).toBeInTheDocument();
    expect(screen.queryByText('University B')).not.toBeInTheDocument();
  });

  test('sorts universities in ascending order', () => {
    renderComponent();
    const sortSelect = screen.getByRole('combobox');
    fireEvent.change(sortSelect, { target: { value: 'asc' } });
    const universityNames = screen.getAllByRole('heading', { level: 3 }).map(h => h.textContent);
    expect(universityNames).toEqual(['University A', 'University B', 'University C']);
  });

  test('sorts universities in descending order', () => {
    renderComponent();
    const sortSelect = screen.getByRole('combobox');
    fireEvent.change(sortSelect, { target: { value: 'desc' } });
    const universityNames = screen.getAllByRole('heading', { level: 3 }).map(h => h.textContent);
    expect(universityNames).toEqual(['University C', 'University B', 'University A']);
  });

  test('calls onDelete when delete button is clicked and confirmed', () => {
    window.confirm = jest.fn(() => true);
    renderComponent();
    const deleteButtons = screen.getAllByTitle('Delete');
    fireEvent.click(deleteButtons[0]);
    expect(window.confirm).toHaveBeenCalledWith('Are you sure you want to delete University A?');
    expect(mockOnDelete).toHaveBeenCalledWith('University A');
  });

  test('does not call onDelete when delete is canceled', () => {
    window.confirm = jest.fn(() => false);
    renderComponent();
    const deleteButtons = screen.getAllByTitle('Delete');
    fireEvent.click(deleteButtons[0]);
    expect(window.confirm).toHaveBeenCalledWith('Are you sure you want to delete University A?');
    expect(mockOnDelete).not.toHaveBeenCalled();
  });

  test('displays "No universities found" when there are no results', () => {
    renderComponent({ universities: [] });
    expect(screen.getByText('No universities found.')).toBeInTheDocument();
  });

  test('saves search term to localStorage', () => {
    renderComponent();
    const searchInput = screen.getByPlaceholderText('Search universities...');
    fireEvent.change(searchInput, { target: { value: 'Test Search' } });
    expect(localStorage.getItem('searchTerm')).toBe('Test Search');
  });

  test('saves sort order to localStorage', () => {
    renderComponent();
    const sortSelect = screen.getByRole('combobox');
    fireEvent.change(sortSelect, { target: { value: 'desc' } });
    expect(localStorage.getItem('sortBy')).toBe('desc');
  });
});