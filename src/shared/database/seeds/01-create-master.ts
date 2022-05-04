import { v4 as uuidV4 } from 'uuid';
import { Connection } from 'typeorm';
import { Seeder, Factory } from 'typeorm-seeding';
import { User } from '@modules/User/entities/User';
import { hashSync } from 'bcrypt';

export default class CreateMasterUser implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          id: uuidV4(),
          name: 'Master',
          email: 'master@booat.com',
          password: hashSync('123456789', 8),
          role: 'Master',
        },
      ])
      .execute();
  }
}
