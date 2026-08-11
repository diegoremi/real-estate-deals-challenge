import { Deal } from '../models/deal.model';

export const MOCK_DEALS: readonly Deal[] = [
  {
    id: 'deal-001',
    name: 'Riverside Commons',
    purchasePrice: 6_250_000,
    address: '145 River St, Austin, TX',
    noi: 500_000,
  },
  {
    id: 'deal-002',
    name: 'Northgate Medical Plaza',
    purchasePrice: 3_850_000,
    address: '8200 Northgate Dr, Dallas, TX',
    noi: 269_500,
  },
  {
    id: 'deal-003',
    name: 'Cedar Point Apartments',
    purchasePrice: 12_400_000,
    address: '210 Cedar Ave, Denver, CO',
    noi: 1_116_000,
  },
  {
    id: 'deal-004',
    name: 'Atlas Logistics Center',
    purchasePrice: 8_900_000,
    address: '550 Industrial Blvd, Phoenix, AZ',
    noi: 667_500,
  },
  {
    id: 'deal-005',
    name: 'Lakeshore Offices',
    purchasePrice: 5_300_000,
    address: '88 Lakeshore Rd, Chicago, IL',
    noi: 344_500,
  },
];
