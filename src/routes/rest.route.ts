import { Router } from 'express';
import { vehicleDataController } from '../controllers/vehicleData.controller';

export const restRoutes = (router: Router) => {
    router.get('/vehicle/:makeId', vehicleDataController.getVehicleDataByMakeId);
    router.get('/vehicles', vehicleDataController.getAllVehicleData);
};
