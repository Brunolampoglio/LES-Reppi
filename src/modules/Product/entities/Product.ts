import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('products')
class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  category: string;

  @Column()
  image_url: string;

  @Column()
  language: string;

  @Column()
  bar_code: string;

  @Column()
  year: string;

  @Column()
  pages_quantity: number;

  @Column()
  isbn: string;

  @Column()
  value: number;

  @Column()
  publishing_company: string;

  @Column()
  edition: string;

  @Column()
  dimensions: string;

  @Column()
  weight_in_grams: number;

  @Column()
  synopsis: string;

  @Column()
  stock_units: number;

  @Column()
  is_available: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { Product };
