import Offer from "../core/model/Offer";
import OfferVariety from "../core/model/OfferVariety";

export interface OfferRepoOptions {
  limit: number;
  page: number;
};
export interface OfferRepoFilters {
  varieties: OfferVariety[];
};
export interface OfferSeachResult {
  offers: Offer[];
  amount: number;
  limit: number;
  page: number;
};
export default interface OfferRepo {
  create(offer: Offer): Promise<void>;
  getByFilters(
    filters: OfferRepoFilters,
    options: OfferRepoOptions
  ): Promise<OfferSeachResult>;
}
