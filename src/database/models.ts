import mongoose from 'mongoose';

const vehiclesDataSchema = new mongoose.Schema({
    makeId: { type: String, required: true, unique: true },
    makeName: { type: String, required: true },
    vehicleTypes: [{
        typeId: { type: String, required: true },
        typeName: { type: String, required: true }
    }]
});

const makesSchema = new mongoose.Schema({
    makeId: { type: String, required: true, unique: true },
    makeName: { type: String, required: true }
});

const vehicleTypesSchema = new mongoose.Schema({
    makeId: { type: String, required: true },
    typeId: { type: String, required: true },
    typeName: { type: String, required: true }
});


vehiclesDataSchema.index({ makeId: 1, vehicleTypes: 1 }, { unique: true });
makesSchema.index({ makeId: 1 }, { unique: true });
vehicleTypesSchema.index({ makeId: 1, typeId: 1 }, { unique: true });

export const VehiclesData = mongoose.model('VehiclesData', vehiclesDataSchema);
export const Makes = mongoose.model('Makes', makesSchema);
export const VehicleTypes = mongoose.model('VehicleTypes', vehicleTypesSchema);
