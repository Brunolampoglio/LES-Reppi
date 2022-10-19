interface IUpdateBannerDTO {
  id: string;
  userId: string;
  isMaster: boolean;
  name: string;
  link_banner: string;
  link_image: string;
  dt_Initial: Date;
  dt_Final: Date;
  image: string;
}

export { IUpdateBannerDTO };
