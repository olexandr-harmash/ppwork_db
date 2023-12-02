// Import necessary classes
import OfferService from "./OfferService";
import OfferVariety from "./OfferVariety";

describe("Entities Tests", () => {
  describe("OfferSale", () => {
    it("should create an OfferSale instance with correct properties", () => {
      const offerSale = OfferVariety.create({
        name: "name",
        value: "value",
      });

      expect(offerSale.getName()).toBe("name");
    });
  });

  describe("OfferService", () => {
    it("should create an OfferService instance with correct properties", () => {
      const offerService = OfferService.create({
        name: "name",
        value: "value",
        cost: 20,
      });

      expect(offerService.getCost()).toBe(20);
    });
  });
});
