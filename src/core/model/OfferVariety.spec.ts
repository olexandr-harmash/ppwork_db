// Import necessary classes
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

  describe("OfferVariety", () => {
    it("should create an OfferVariety instance with correct properties", () => {
      const offerService = OfferVariety.create({
        name: "name",
        value: "value",
      });

      expect(offerService.getValue).toBe("value");
    });
  });
});
