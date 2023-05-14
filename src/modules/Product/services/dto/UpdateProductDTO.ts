export interface IUpdateProductDTO {
  product_id: string;
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
  stock_units: number;
  synopsis: string;
}

export interface IUpdateProductStatusDTO {
  product_id: string;
  is_available: boolean;
}
