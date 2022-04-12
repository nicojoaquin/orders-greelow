import {
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { Menu, User, Order } from "./";

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Menu, (menu) => menu.id)
  @JoinColumn()
  menu: Menu;

  @ManyToOne(() => Order, (order) => order.id)
  @JoinColumn()
  order: Order;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: string;
}
