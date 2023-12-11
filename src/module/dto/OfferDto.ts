import OfferVariety from "../../core/model/OfferVariety";

export interface CreateOfferDto {
  name: string;
  cost: number;
  varieties: string;
  services: string;
  sales: string;
  images: any;
}
export interface GetOfferDto {
  varieties: Array<{ name: string; value: string }>;
}
export interface OfferDto {
  id: string;
  varietyMap: { [key: string]: string[] };
  serviceMap: { [key: string]: string[] };
}
export interface FindOfferByFilters {
  page: number;
  limit: number;
  varieties: OfferVariety[];
}
export interface FindOfferByFiltersResult {
  next: boolean;
  page: number;
  count: number;
  limit: number;
  offers: OfferDto[];
}
