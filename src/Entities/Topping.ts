import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Topping {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  description: string;

  @Column({
    default: false,
  })
  noTacc: boolean;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: string;
}
