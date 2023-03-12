export interface ICreateAddressRepositoryDTO {
  zip: string;
  street: string;
  street_type: string;
  uf: string;
  city: string;
  number: string;
  obs: string;
  type_residence: string;
  country: string;
  is_default: boolean;
  neighborhood: string;
  user_id: string;
}
