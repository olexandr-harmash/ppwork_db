import Uuid from "../../core/Uuid";
import Variety from "../../core/model/Veriety";

export interface CreateOfferDto {
  name: string;
  cost: number;
  categoryId: string;
  typeId: string;
  varieties: string;
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
  varieties: Uuid[];
  filters: {
    types: string[];
    varieties: string[];
  };
}
export interface FindOfferByFiltersResult {
  next: boolean;
  page: number;
  count: number;
  limit: number;
  offers: OfferDto[];
}
