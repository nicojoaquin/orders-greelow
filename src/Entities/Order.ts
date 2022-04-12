import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinTable,
  OneToMany,
} from "typeorm";
import { Item } from ".";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  date: string;

  @Column()
  comment: string;

  @Column()
  total: number;

  @OneToMany(() => Item, (item) => item.id)
  items: Item[];
}
