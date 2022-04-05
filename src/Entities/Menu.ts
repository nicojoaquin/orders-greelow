import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Restaurant, Category, Topping } from "./";

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.id)
  restaurant: Restaurant;

  @ManyToOne(() => Category, (category) => category.id)
  category: Category;

  @ManyToMany(() => Topping)
  @JoinTable()
  toppings: Topping[];

  @Column()
  description: string;

  @Column()
  dressing: string;

  @Column()
  price: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: string;
}
