// Import necessary classes
import Offer from "./Offer";
import OfferSale from "./OfferSale";
import OfferService from "./OfferService";
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
            varieties: [OfferVariety.create({ name: "key", value: "value" })],
            sale: 0,
          }),
        ],
       
        varieties: [
          OfferVariety.create({
            name: "key",
            value: "value",
          }),
        ],
        services: [
          OfferService.create({
            name: "key",
            value: "value",
            cost: 50,
          })
        ]
      });

      expect(offer.getOfferMap()).toEqual({ key: ["value"] });
      expect(offer.getCostsMap()).toEqual({ key: ["value"] });
    });
  });
});
