const { MONGO_LIVE_URI } = process.env;

export const dbConnection = {
  url: `${MONGO_LIVE_URI}`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
};
