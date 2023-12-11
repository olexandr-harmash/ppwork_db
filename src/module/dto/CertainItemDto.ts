export interface CertainItemDto {
  id: string;
  cost: number;
  name: string;
  imgUrls: string[];
};

export interface FindOfferByFiltersResult {
  next: boolean;
  page: number;
  count: number;
  limit: number;
  items: CertainItemDto[];
};
