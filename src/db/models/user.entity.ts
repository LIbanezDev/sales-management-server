import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Product } from './product.entity';
import { Animal } from './animal.entity';

/*import { Message } from '../Message/Message';
import { UserToTeam } from './UserToTeam';
import { FriendRequest } from '../FriendRequest/FriendRequest';
import { UserToProject } from './UserToProject';*/

@ObjectType({ description: 'Registered users' })
@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ length: 100, nullable: false })
  name!: string;

  @Field()
  age!: number;

  @Column()
  bornDate!: Date;

  @Field(() => String)
  @Column({ default: '', length: 500 })
  description!: string;

  @Field()
  @Column({ default: false })
  google!: boolean;

  @Field()
  @Column({ default: false })
  github!: boolean;

  @Field()
  @Column({ length: 150, unique: true, nullable: false })
  email!: string;

  @Column()
  password!: string;

  @Field(() => [Product])
  @OneToMany(() => Product, p => p.user)
  products: Product[];

  @Field(() => [Animal])
  @OneToMany(() => Animal, a => a.owner)
  animals: Animal[];

  /*@OneToMany(() => FriendRequest, sender => sender.sender)
  sentFriendRequests!: FriendRequest[];

  @OneToMany(() => FriendRequest, receiver => receiver.receiver)
  receivedFriendRequests!: FriendRequest[];

  @Field(() => [User])
  friends!: this[];

  @Field(() => [Message])
  @OneToMany(() => Message, sender => sender.sender)
  sentMessages!: Message[];

  @Field(() => [Message])
  @OneToMany(() => Message, receiver => receiver.receiver)
  receivedMessages!: Message[];

  @Field(() => [UserToTeam])
  @OneToMany(() => UserToTeam, teams => teams.user)
  teams!: UserToTeam[];

  @Field(() => [UserToProject])
  @OneToMany(() => UserToProject, utp => utp.user)
  projects!: UserToProject[];*/
}
