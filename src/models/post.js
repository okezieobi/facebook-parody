export default (Schema) => {
  const schema = new Schema({
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  }, { timestamps: true });

  return schema;
};
