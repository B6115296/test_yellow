import { Column, DataType, Model, Table, Unique  } from "sequelize-typescript";

const CRYPTOCURRENCY_TABLE_NAME = "cryptocurrency";
const CRYPTOCURRENCY_ID = "id";
const CRYPTOCURRENCY_NAME = "name";
const CRYPTOCURRENCY_SYMBOL = "symbol";
const CRYPTOCURRENCY_PRICE = "price";

@Table({
  tableName: CRYPTOCURRENCY_TABLE_NAME,
  timestamps: true,
})
export class Cryptocurrencies extends Model {
  public static CRYPTOCURRENCY_TABLE_NAME = CRYPTOCURRENCY_TABLE_NAME;
  public static CRYPTOCURRENCY_ID = CRYPTOCURRENCY_ID;
  public static CRYPTOCURRENCY_NAME = CRYPTOCURRENCY_NAME;
  public static CRYPTOCURRENCY_SYMBOL = CRYPTOCURRENCY_SYMBOL;
  public static CRYPTOCURRENCY_PRICE = CRYPTOCURRENCY_PRICE;

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
    unique: true,
  })
  name!: string;

  @Column({
    type: DataType.STRING(255),
    field: CRYPTOCURRENCY_SYMBOL,
    unique: true,
  })
  symbol!: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    field: CRYPTOCURRENCY_PRICE,
  })
  price!: number;

}
