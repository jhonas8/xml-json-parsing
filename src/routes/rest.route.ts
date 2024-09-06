import { Router } from 'express';
import { vehicleDataController } from '../controllers/vehicleData.controller';
import { asyncWrapper } from '../middlewares/httpMiddleware';

export const restRoutes = (router: Router) => {
    router.get('/vehicle/:makeId', asyncWrapper(vehicleDataController.getVehicleDataByMakeId));
    router.get('/vehicles', asyncWrapper(vehicleDataController.getAllVehicleData));
};
