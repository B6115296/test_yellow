import { Column, DataType, Model, Table } from "sequelize-typescript";

const CRYPTOCURRENCY_TABLE_NAME = "cryptocurrency";
const CRYPTOCURRENCY_ID = "id";
const CRYPTOCURRENCY_NAME = "name";
const CRYPTOCURRENCY_SYMBOL = "symbol";
const CRYPTOCURRENCY_PRICE = "price";
const CRYPTOCURRENCY_CREATED_AT = "createdAt";
const CRYPTOCURRENCY_UPDATED_AT = "updatedAt";

@Table({
  tableName: CRYPTOCURRENCY_TABLE_NAME,
})
export class Cryptocurrencies extends Model {
  public static CRYPTOCURRENCY_TABLE_NAME = CRYPTOCURRENCY_TABLE_NAME;
  public static CRYPTOCURRENCY_ID = CRYPTOCURRENCY_ID;
  public static CRYPTOCURRENCY_NAME = CRYPTOCURRENCY_NAME;
  public static CRYPTOCURRENCY_SYMBOL = CRYPTOCURRENCY_SYMBOL;
  public static CRYPTOCURRENCY_PRICE = CRYPTOCURRENCY_PRICE;
  public static CRYPTOCURRENCY_CREATED_AT = CRYPTOCURRENCY_CREATED_AT;
  public static CRYPTOCURRENCY_UPDATED_AT = CRYPTOCURRENCY_UPDATED_AT;

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: CRYPTOCURRENCY_ID,
  })
  id!: number;

  @Column({
    type: DataType.STRING(100),
    field: CRYPTOCURRENCY_NAME,
  })
  name!: string;

  @Column({
    type: DataType.STRING(255),
    field: CRYPTOCURRENCY_SYMBOL,
  })
  symbol!: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    field: CRYPTOCURRENCY_PRICE,
  })
  price!: number;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
    field: CRYPTOCURRENCY_CREATED_AT,
  })
  createdAt!: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
    field: CRYPTOCURRENCY_UPDATED_AT,
  })
  updatedAt!: Date;
}
