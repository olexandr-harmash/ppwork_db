import Uuid from "../core/Uuid";
import Offer from "../core/model/Offer";

export interface OfferOptions {
  limit: number;
  page: number;
}
export interface OfferFilters {
  types: Uuid[];
  varieties: Uuid[];
}
export interface SeachResult {
  offers: Offer[];
  amount: number;
  limit: number;
  page: number;
}
export default interface OfferRepo {
  create(offer: Offer): Promise<void>;
  getByFilters(
    filters: OfferFilters,
    options: OfferOptions
  ): Promise<SeachResult>;
}
