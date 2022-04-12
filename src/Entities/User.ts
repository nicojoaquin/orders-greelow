import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Item } from "./Item";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @OneToMany(() => Item, (item) => item.id)
  items: Item[];

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  last_name: string;

  @Column()
  birth_date: String;

  @Column()
  password: string;

  @Column({
    default: false,
  })
  isAdmin: boolean;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: string;
}
