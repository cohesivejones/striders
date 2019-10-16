import { model, Schema, Document } from 'mongoose';

export interface ISponser extends Document {
    id: string
    parentId: string
}
const SponserSchema = new Schema({
    id: {type: String, required: true},
    parentId: {type: String, required: true},
});

export default model<ISponser>('Sponser', SponserSchema);
