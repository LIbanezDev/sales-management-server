import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

export enum ANIMAL_TYPE {
  CAT,
  DOG,
  PLATYPUS,
}

registerEnumType(ANIMAL_TYPE, {
  name: 'ANIMAL_TYPE',
});

@ObjectType()
@Entity({ name: 'animals' })
export class Animal {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Field(() => ANIMAL_TYPE)
  @Column({ type: 'enum', enum: ANIMAL_TYPE })
  type: ANIMAL_TYPE;

  @Field(() => User)
  @ManyToOne(() => User, user => user.animals)
  owner: User;
}
