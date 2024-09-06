import mongoose from 'mongoose';

const vehiclesDataSchema = new mongoose.Schema({
    makeId: { type: String, required: true, unique: true },
    makeName: { type: String, required: true },
    vehicleTypes: [{
        typeId: { type: String, required: true },
        typeName: { type: String, required: true }
    }]
});


vehiclesDataSchema.index({ makeId: 1, vehicleTypes: 1 }, { unique: true });

export const VehiclesData = mongoose.model('VehiclesData', vehiclesDataSchema);
