import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Restaurant, Category, Topping, Item } from "./";

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  id: string;

  @OneToMany(() => Item, (item) => item.id)
  items: Item[];

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.id)
  @JoinColumn()
  restaurant: Restaurant;

  @ManyToOne(() => Category, (category) => category.id)
  @JoinColumn()
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
