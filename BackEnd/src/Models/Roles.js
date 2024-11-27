import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const Schema = mongoose.Schema;

const RolesSchema = new Schema(
  {
    url: {
      type: String,
      required: true, // Ràng buộc giá trị bắt buộc
    },
    description: {
      type: String,
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

RolesSchema.plugin(mongoosePaginate);

const Roles = mongoose.model("roles", RolesSchema);
export default Roles;
