import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';

export type IUserAttributes = {
  email: string;
  password: string;
};

@Table({ tableName: 'users', timestamps: true })
export class User extends Model<User, IUserAttributes> {
  @Column({
    field: 'id',
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @Column({
    field: 'email',
    type: DataType.STRING,
    allowNull: false,
  })
  declare email: string;

  @Column({
    field: 'password',
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;

  @CreatedAt
  @Column({ field: 'created_at' })
  declare createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  declare updatedAt: Date;
}

export default User;
