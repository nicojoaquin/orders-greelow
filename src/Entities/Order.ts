import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Item } from ".";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  date: string;

  @Column()
  comment: string;

  @Column({ default: 0 })
  total: number;

  @OneToMany(() => Item, (item) => item.id, {
    cascade: true,
  })
  items: Item[];
}
