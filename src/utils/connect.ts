import mongoose from 'mongoose';
import config from 'config';
import log from './logger';

async function connect() {
  const dbString = config.get<string>('dbString');

  try {
    await mongoose.connect(dbString, {
      dbName: 'rest-api-tutorial',
    });
    log.info('Connected to DB');
  } catch (error) {
    log.error('could not connect to db');
    process.exit(1);
  }
}

export default connect;
