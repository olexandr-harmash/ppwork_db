// Import necessary classes

import Variety from "./Veriety";


describe("Entities Tests", () => {
  describe("OfferSale", () => {
    it("should create an OfferSale instance with correct properties", () => {
      const offerSale = Variety.create({
        name: "name",
        value: "value",
        additionalCost: 0,
        multiplyCost: 0.25,
      });

      expect(offerSale.getName()).toBe("name");
    });
  });

  describe("OfferVariety", () => {
    it("should create an OfferVariety instance with correct properties", () => {
      const offerService = Variety.create({
        name: "name",
        value: "value",
        additionalCost: 0,
        multiplyCost: 1,
      });

      expect(offerService.getValue()).toBe("value");
    });
  });
});
