
import Offer from "./Offer";
import Sale from "./Sale";
import Variety from "./Veriety";

describe("Entities Tests", () => {
  // ... Previous tests for Sale, OfferService, Variety, and BaseOfferData

  describe("Offer", () => {
    it("should create an Offer instance with correct properties", () => {
      const variety =  Variety.create({
        name: "key",
        value: "value",
        additionalCost: 0,
        multiplyCost: 1,
      });

      const offer = Offer.create({
        imgUrls: [],
        name: "Test Offer",
        cost: 100,
        sales: [
          Sale.create({
            varieties: [variety],
            multiply: 0,
          }),
        ],

        varieties: [
          variety,
        ],
      });
    });
  });
});
