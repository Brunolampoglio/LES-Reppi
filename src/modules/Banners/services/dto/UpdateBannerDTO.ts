interface IUpdateBannerDTO {
  id: string;
  userId: string;
  isMaster: string;
  name: string;
  link_Banner: string;
  link_Image: string;
  dt_Initial: Date;
  dt_Final: Date;
  image: string;
}

export { IUpdateBannerDTO };
