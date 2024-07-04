import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

import { createDataSourceOptions } from './data-source';

export default new DataSource(createDataSourceOptions());
