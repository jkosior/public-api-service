export default {
  uri: process.env.MONGODB_URI || 'mongodb://root:rootPassword@localhost:27018',
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  retryAttempts: 3,
};
