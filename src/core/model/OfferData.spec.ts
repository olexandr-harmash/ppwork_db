// Import necessary classes
import Offer from "./Offer";
import CertainItem from "./CertainItem";
import OfferSale from "./OfferSales";
import OfferService from "./OfferServices";
import OfferVariety from "./OfferVariety";

describe("Entities Tests", () => {
  // ... Previous tests for OfferSale, OfferService, OfferVariety, and BaseOfferData

  describe("Offer", () => {
    it("should create an Offer instance with correct properties", () => {
      const offer = Offer.create({
        name: "Test Offer",
        cost: 100,
        sales: [
          OfferSale.create({
            attributes: { key: "value" },
            sale: 20,
          }),
        ],
        services: [
          OfferService.create({
            attributes: { key: "value" },
            cost: 20,
          }),
        ],
        offers: [
          OfferVariety.create({
            attributes: { key: "value" },
          }),
        ],
      });

      expect(offer.getOfferMap()).toEqual({ key: ["value"] });
      expect(offer.getCostsMap()).toEqual({ key: ["value"] });
    });

    it("should divide the offer into a CertainItem with correct properties", () => {
      const offer = Offer.create({
        name: "Test Offer",
        cost: 100,
        sales: [OfferSale.create({ attributes: { key: "value" }, sale: 20 })],
        services: [
          OfferService.create({ attributes: { key: "value" }, cost: 20 }),
        ],
        offers: [
          OfferVariety.create({
            attributes: { key: "value" },
          }),
        ],
      });

      const attributesToDivideBy = OfferVariety.create({
        attributes: { key: "value" },
      });
      const certainItem = offer.devideByAttributes(attributesToDivideBy);

      expect(certainItem.getCost()).toBe(100);
    });
  });

  describe("CertainItem", () => {
    it("should create a CertainItem instance with correct properties", () => {
      const certainItem = CertainItem.create({
        cost: 50,
        name: "Test CertainItem",
        sale: OfferSale.create({ attributes: { key: "value" }, sale: 20 }),
        propCosts: [
          OfferService.create({ attributes: { key: "value" }, cost: 20 }),
        ],
        offers: [
          OfferVariety.create({
            attributes: { key: "value" },
          }),
        ],
      });

      expect(certainItem.getCost()).toBe(50);
    });
  });
});
