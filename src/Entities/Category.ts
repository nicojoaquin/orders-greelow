import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Menu } from "./";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  description: string;

  @OneToMany(() => Menu, (menu) => menu.id)
  menues: Menu[];

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: string;
}
