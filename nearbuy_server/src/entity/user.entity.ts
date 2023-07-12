import { Entity, Unique, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('text', { name: 'email', nullable: false })
  email!: string;

  @Column('text', { nullable: false })
  password_hash!: string;
}