import { IFacade } from "@modules/facade/IFacade";
import IHash from "@shared/interfaces/IHash";
import { IViewHelper } from "./viewHelper/interface/IViewHelper";
import { VHAddress } from "./viewHelper/VHAddress";
import { VHPerson } from "./viewHelper/VHPerson";
import { Request, Response } from "express";

class Controller {
  private vhs: IHash<IViewHelper> = {};
  constructor(private facade: IFacade) {
    this.vhs = {
      "persons": new VHPerson(),
      "addresses": new VHAddress(),
    };
 }

 create = async (req: Request, res: Response) => {
  const { route } = req.params

  if(!this.vhs[route]) {
    throw new Error(`Route ${route} não existe`);
  }

  const entity = this.vhs[route].getEntity(req);
  const msg = await this.facade.create(entity);

  return this.vhs[route].setView(req, res, msg);
 }

  update = async (req: Request, res: Response) => {
    const { route } = req.params

    if(!this.vhs[route]) {
      throw new Error(`Route ${route} não existe`);
    }

    const entity = this.vhs[route].getEntity(req);
    const msg = await this.facade.update(entity);

    return this.vhs[route].setView(req, res, msg);
  }

  delete = async (req: Request, res: Response) => {
    const { route } = req.params

    if(!this.vhs[route]) {
      throw new Error(`Route ${route} não existe`);
    }

    const entity = this.vhs[route].getEntity(req);
    const msg = await this.facade.delete(entity);

    return this.vhs[route].setView(req, res, msg);
  }

  show = async (req: Request, res: Response) => {
    const { route } = req.params

    if(!this.vhs[route]) {
      throw new Error(`Route ${route} não existe`);
      }

      const { entity , whereParams } = this.vhs[route].findEntity(req);
      const msg = await this.facade.findOne({ entity, whereParams });

      return this.vhs[route].setView(req, res, msg);
    }

    index = async (req: Request, res: Response) => {
      const { route } = req.params

      if(!this.vhs[route]) {
        throw new Error(`Route ${route} não existe`);
      }

      const { entity , whereParams } = this.vhs[route].findEntity(req);

      if(req.query.page || req.query.limit) {
        const { page, limit } = req.query;
        const result = await this.facade.index({
          entity,
          whereParams,
          page: Number(page)|| 1,
          limit: Number(limit) || 0
        });
        return this.vhs[route].setView(req, res, result);
      } else {
        const result = await this.facade.findMany({ entity, whereParams });
        return this.vhs[route].setView(req, res, result);
      }

    }
  }
export { Controller }
