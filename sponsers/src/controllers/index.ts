import { Request, Response, NextFunction } from 'express';
import Sponser, { ISponser } from '../models';

export function all(_req: Request, res:  Response, next: NextFunction) {
  Sponser.find({}, function (err: Error, sponsers: ISponser[]) {
    if (err) return next(err);
    res.send(sponsers);
  })
};
export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const {id, parentId} = req.body
    let sponser = new Sponser({id, parentId});
    sponser = await sponser.save()
    res.send(sponser);
    next();
  } catch (err) {
    next(err);
  }
};
export async function remove(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      await Sponser.remove({id})
      res.send('Sponser deleted successfully');
      next();
    } catch (err) {
      next(err);
    }
};
