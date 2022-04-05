import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  last_name: string;

  @Column({ type: "timestamp" })
  birth_date: Date;

  @Column()
  password: string;

  @Column({
    default: false,
  })
  isAdmin: boolean;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: string;
}
