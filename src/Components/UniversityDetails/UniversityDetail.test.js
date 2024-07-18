import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import UniversityDetail from './UniversityDetail';

// Mock the react-icons
jest.mock('react-icons/fa', () => ({
  FaGlobeAmericas: () => <div data-testid="fa-globe-americas" />,
  FaMapMarkerAlt: () => <div data-testid="fa-map-marker-alt" />,
  FaLink: () => <div data-testid="fa-link" />,
  FaFlag: () => <div data-testid="fa-flag" />,
  FaArrowLeft: () => <div data-testid="fa-arrow-left" />,
}));

const mockUniversities = [
  {
    name: 'Test University',
    country: 'Test Country',
    state_province: 'Test State',
    web_pages: ['http://www.testuniversity.com'],
    alpha_two_code: 'TC'
  },
  {
    name: 'Another University',
    country: 'Another Country',
    web_pages: ['http://www.anotheruniversity.com'],
    alpha_two_code: 'AC'
  }
];

const renderComponent = (name) => {
  return render(
    <MemoryRouter initialEntries={[`/university/${name}`]}>
      <Routes>
        <Route path="/university/:name" element={<UniversityDetail universities={mockUniversities} />} />
      </Routes>
    </MemoryRouter>
  );
};

describe('UniversityDetail', () => {
  test('renders university details when university is found', () => {
    renderComponent('Test University');
    
    expect(screen.getByTestId('university-detail-name')).toHaveTextContent('Test University');
    expect(screen.getByText('Test Country, Test State')).toBeInTheDocument();
    expect(screen.getByText('Test Country')).toBeInTheDocument();
    expect(screen.getByText('Test State')).toBeInTheDocument();
    expect(screen.getByText('Visit Website')).toHaveAttribute('href', 'http://www.testuniversity.com');
    expect(screen.getByText('TC')).toBeInTheDocument();
  });

  test('renders not found message when university is not found', () => {
    renderComponent('Non-existent University');
    
    expect(screen.getByText('Oops!')).toBeInTheDocument();
    expect(screen.getByText('University not found')).toBeInTheDocument();
  });

  test('renders back to list link', () => {
    renderComponent('Test University');
    
    const backLink = screen.getByText('Back to List');
    expect(backLink).toBeInTheDocument();
    expect(backLink.closest('a')).toHaveAttribute('href', '/');
  });

  test('renders all icons', () => {
    renderComponent('Test University');
    
    expect(screen.getAllByTestId('fa-map-marker-alt')).toHaveLength(2);
    expect(screen.getByTestId('fa-globe-americas')).toBeInTheDocument();
    expect(screen.getByTestId('fa-link')).toBeInTheDocument();
    expect(screen.getByTestId('fa-flag')).toBeInTheDocument();
    expect(screen.getByTestId('fa-arrow-left')).toBeInTheDocument();
  });
});
