import { Args, Int, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { AnimalsService } from './animals.service';
import { Animal } from '../../db/models/animal.entity';
import { CreateAnimalInput } from './dto/create-animal.input';
import { UpdateAnimalInput } from './dto/update-animal.input';
import { PubSub } from 'apollo-server-express';

const pubSub = new PubSub();

@Resolver(() => Animal)
export class AnimalsResolver {
  constructor(private readonly animalsService: AnimalsService) {}

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
    await pubSub.publish('animals', animals);
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
    resolve: payload => {
      return payload;
    },
  })
  animalAdded() {
    return pubSub.asyncIterator('animals');
  }
}
