import Offer from "../core/model/Offer";
import OfferVariety from "../core/model/OfferVariety";

export default interface OfferRepo {
  create(offer: Offer): Promise<void>;
  getByVariety(varities: OfferVariety[]): Promise<Offer[]>;
}
