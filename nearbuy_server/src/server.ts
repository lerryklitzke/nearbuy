import App from './app';
import { AppDataSource } from './utils/dataSource';

AppDataSource.initialize()
  .then(async () => {
    console.log('Connected to database.');
    App.listen(process.env.SERVER_PORT, () => console.log(`Server running on port ${process.env.SERVER_PORT}...`));
  })