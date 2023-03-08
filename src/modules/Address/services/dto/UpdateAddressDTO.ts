export interface IUpdateAddressDTO {
    street?: string;
    street_type?: string;
    number?: string;
    obs?: string;
    country?: string;
    uf?: string;
    city?: string;
    neighborhood?: string;
    zip?: string;
    type_residence?: string;

    address_id: string;
    is_default?: boolean;
}