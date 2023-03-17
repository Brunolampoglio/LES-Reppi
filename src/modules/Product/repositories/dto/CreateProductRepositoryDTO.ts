export interface ICreateProductRepositoryDTO {
  title: string;
  author: string;
  category: string;
  image_url: string;
  language: string;
  bar_code: string;
  year: string;
  pages_quantity: number;
  isbn: string;
  value: number;
  publishing_company: string;
  edition: string;
  dimensions: string;
  weight_in_grams: number;
  synopsis: string;
  stock_units: number;
  is_available: boolean;
}
