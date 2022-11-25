interface ICreateBannerDTO {
  name: string;
  link_banner: string;
  link_image: string;
  image: string;
  isMaster: boolean;
  dt_final: Date;
  dt_initial: Date;
  user_id: string;
}

export { ICreateBannerDTO };
