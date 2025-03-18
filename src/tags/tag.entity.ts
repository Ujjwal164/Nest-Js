import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 200,
    unique: true,
  })
  name: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 512,
    unique: true,
  })
  slug: string;

  @Column({
    type: 'text',
    nullable: false,
    unique: true,
  })
  description: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  schema: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 1024
  })
  featuredImageUrl: string;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;
}
