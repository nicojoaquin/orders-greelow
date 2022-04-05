import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  Column,
} from "typeorm";
import { Menu, User, Order } from "./";

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToOne(() => Menu)
  @JoinColumn()
  menu: Menu;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: string;
}
