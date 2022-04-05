import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Menu } from "./";

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  phone_number: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: string;

  @OneToMany(() => Menu, (menu) => menu.id)
  menues: Menu[];
}
