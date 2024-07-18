import axios from 'axios';
import { fetchUniversities } from './universityService';

jest.mock('axios');

describe('fetchUniversities', () => {
  const BASE_URL = "http://universities.hipolabs.com/search";

  it('fetches universities successfully', async () => {
    const mockData = [
      {
        name: 'Test University',
        'state-province': 'Test State',
        domains: ['test.edu'],
        web_pages: ['http://test.edu'],
        country: 'Test Country',
        alpha_two_code: 'TC'
      }
    ];

    axios.get.mockResolvedValue({ data: mockData });

    const result = await fetchUniversities('Test Country');

    expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}?country=Test%20Country`);
    expect(result).toEqual([
      {
        name: 'Test University',
        stateProvince: 'Test State',
        domains: ['test.edu'],
        web_pages: ['http://test.edu'],
        country: 'Test Country',
        alpha_two_code: 'TC'
      }
    ]);
  });

  it('handles errors when fetching universities', async () => {
    const error = new Error('Network Error');
    axios.get.mockRejectedValue(error);

    console.error = jest.fn();

    await expect(fetchUniversities('Test Country')).rejects.toThrow('Network Error');
    expect(console.error).toHaveBeenCalledWith('Error fetching universities:', error);
  });

  it('encodes country name in URL', async () => {
    axios.get.mockResolvedValue({ data: [] });

    await fetchUniversities('United States');

    expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}?country=United%20States`);
  });

  it('maps university data correctly', async () => {
    const mockData = [
      {
        name: 'University A',
        'state-province': 'State A',
        domains: ['a.edu'],
        web_pages: ['http://a.edu'],
        country: 'Country A',
        alpha_two_code: 'CA'
      },
      {
        name: 'University B',
        'state-province': null,
        domains: ['b.edu'],
        web_pages: ['http://b.edu'],
        country: 'Country B',
        alpha_two_code: 'CB'
      }
    ];

    axios.get.mockResolvedValue({ data: mockData });

    const result = await fetchUniversities('Test');

    expect(result).toEqual([
      {
        name: 'University A',
        stateProvince: 'State A',
        domains: ['a.edu'],
        web_pages: ['http://a.edu'],
        country: 'Country A',
        alpha_two_code: 'CA'
      },
      {
        name: 'University B',
        stateProvince: null,
        domains: ['b.edu'],
        web_pages: ['http://b.edu'],
        country: 'Country B',
        alpha_two_code: 'CB'
      }
    ]);
  });
});
