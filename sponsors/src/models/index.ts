import { model, Schema, Document } from 'mongoose';

export interface ISponsor extends Document {
    id: string
    parentId: string
}
const SponsorSchema = new Schema({
    id: {type: String, required: true},
    parentId: {type: String, required: true},
});

export default model<ISponsor>('Sponsor', SponsorSchema);
