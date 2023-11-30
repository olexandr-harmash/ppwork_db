// Import necessary classes
import OfferSale from './OfferSales';
import OfferService from './OfferServices';
import OfferVariety from './OfferVariety';

describe('Entities Tests', () => {
  describe('OfferSale', () => {
    it('should create an OfferSale instance with correct properties', () => {
      const offerSale = OfferSale.create({
        attributes: { key: 'value' },
        sale: 1.5,
      });

      expect(offerSale.getMultiply()).toBe(1.5);
    });
  });

  describe('OfferService', () => {
    it('should create an OfferService instance with correct properties', () => {
      const offerService = OfferService.create({
        attributes: { key: 'value' },
        cost: 20,
      });

      expect(offerService.getCost()).toBe(20);
    });
  });

  describe('OfferVariety', () => {
    it('should create an OfferVariety instance with correct properties', () => {
      const offerVariety = OfferVariety.create({
        attributes: { key: 'value' },
      });

      expect(offerVariety.getKeys()).toEqual(['key']);
    });
  });
});