import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const Schema = mongoose.Schema;

const GroupsSchema = new Schema(
  {
    name: {
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

GroupsSchema.plugin(mongoosePaginate);

const Groups = mongoose.model("groups", GroupsSchema);
export default Groups;
