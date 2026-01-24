import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
    description: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
  });

  //index to optimize search by name
  categorySchema.index({ name: 'text' });
  
  const Category = mongoose.model("Category", categorySchema);
  
  export default Category;