import { Args, Int, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { AnimalsService } from './animals.service';
import { Animal } from '../../db/models/animal.entity';
import { CreateAnimalInput } from './dto/create-animal.input';
import { UpdateAnimalInput } from './dto/update-animal.input';
import { PubSub } from 'apollo-server-express';
import { Inject } from '@nestjs/common';

@Resolver(() => Animal)
export class AnimalsResolver {
  constructor(private readonly animalsService: AnimalsService, @Inject('PUB_SUB') private pubSub: PubSub) {}

  @Mutation(() => Animal, { nullable: true })
  async createAnimal(@Args() createAnimal: CreateAnimalInput) {
    const owner = await this.animalsService.usersRepo.findOne(createAnimal.ownerId);
    if (!owner) return null;
    const newAnimal = {
      ...createAnimal,
      owner,
    };
    await this.animalsService.animalRepo.insert(newAnimal);
    return newAnimal;
  }

  @Query(() => [Animal], { name: 'animals' })
  async findAll() {
    const animals = await this.animalsService.animalRepo.find({
      relations: ['owner'],
    });
    await this.pubSub.publish('animals', animals);
    return animals;
  }

  @Query(() => Animal, { name: 'animal' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.animalsService.animalRepo.findOne(id);
  }

  @Mutation(() => Animal)
  updateAnimal(@Args('updateAnimalInput') updateAnimalInput: UpdateAnimalInput) {
    return this.animalsService.animalRepo.update({ id: updateAnimalInput.id }, updateAnimalInput);
  }

  @Mutation(() => Animal)
  removeAnimal(@Args('id', { type: () => Int }) id: number) {
    return this.animalsService.animalRepo.delete({
      id,
    });
  }

  @Subscription(() => [Animal], {
    resolve: payload => payload,
  })
  animalAdded() {
    return this.pubSub.asyncIterator('animals');
  }

  @Query(() => Boolean)
  async sendMicro() {
    await this.pubSub.publish('saludando', 'try_fast');
    return true;
  }

  @Subscription(() => String, {
    resolve: payload => {
      if (payload.pattern) {
        // Si es un evento enviado desde un Client proxy de @nest/microservices
        return payload.data;
      }
      return payload;
    },
  })
  async microservice() {
    return this.pubSub.asyncIterator('saludando');
  }
}
