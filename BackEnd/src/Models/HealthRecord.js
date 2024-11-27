import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const Schema = mongoose.Schema;

const HealthRecordSchema = new Schema(
  {
    accountId: {
      type: Schema.Types.ObjectId,
      ref: "accounts",
      required: true, // Ràng buộc giá trị bắt buộc
    },
    ecg_analysis: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

HealthRecordSchema.plugin(mongoosePaginate);

const HealthRecord = mongoose.model("HealthRecord", HealthRecordSchema);
export default HealthRecord;
