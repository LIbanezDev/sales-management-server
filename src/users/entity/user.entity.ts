import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../products/entity/product.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Column()
  age: number;

  @OneToMany(() => Product, product => product.user)
  @JoinColumn({ name: 'productId' })
  products: Product[];
}
