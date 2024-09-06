import { Request, Response } from 'express';
import { vehicleDataService } from '../services/vehicleData.service';

export const vehicleDataController = {
    getVehicleDataByMakeId: async (req: Request, res: Response) => {
        const { makeId } = req.params;
        try {
            const vehicleData = await vehicleDataService.getVehicleDataByMakeId(makeId);
            if (!vehicleData) {
                return res.status(404).json({ message: 'Vehicle data not found' });
            }
            res.json(vehicleData);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching vehicle data', error });
        }
    },

    getAllVehicleData: async (req: Request, res: Response) => {
        const { page, limit } = req.query;
        try {
            const pageNum = page ? parseInt(page as string) : undefined;
            const limitNum = limit ? parseInt(limit as string) : undefined;
            const vehicleData = await vehicleDataService.getAllVehicleData(pageNum, limitNum);
            const totalCount = await vehicleDataService.getTotalCount();
            res.json({
                data: vehicleData,
                totalCount,
                currentPage: pageNum || 1,
                totalPages: pageNum && limitNum ? Math.ceil(totalCount / limitNum) : 1
            });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching vehicle data', error });
        }
    }
};
