import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
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

  @ManyToMany(() => Item)
  @JoinTable()
  toppings: Item[];
}
