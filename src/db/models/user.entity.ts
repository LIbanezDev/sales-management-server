import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Animal } from './animal.entity';

@ObjectType()
@Entity({ name: 'users' })
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Field(() => Int)
  @Column()
  age: number;

  @Field(() => Product)
  @OneToMany(() => Product, product => product.user)
  products: Product[];

  @Field(() => [Animal])
  @OneToMany(() => Animal, animal => animal.owner)
  animals: Animal[];
}
