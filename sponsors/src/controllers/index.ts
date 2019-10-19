import { Request, Response, NextFunction } from 'express';
import Sponsor, { ISponsor } from '../models';

export function all(_req: Request, res:  Response, next: NextFunction) {
  Sponsor.find({}, function (err: Error, sponsors: ISponsor[]) {
    if (err) return next(err);
    res.send(sponsors);
  })
};
export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const {id, parentId} = req.body
    let sponsor = new Sponsor({id, parentId});
    sponsor = await sponsor.save()
    res.send(sponsor);
    next();
  } catch (err) {
    next(err);
  }
};
export async function remove(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      await Sponsor.remove({id})
      res.send('Sponsor deleted successfully');
      next();
    } catch (err) {
      next(err);
    }
};
