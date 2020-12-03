import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AnimalsService } from './animals.service';
import { Animal } from '../../db/models/animal.entity';
import { CreateAnimalInput } from './dto/create-animal.input';
import { UpdateAnimalInput } from './dto/update-animal.input';
import { UsersService } from '../users/users.service';

@Resolver(() => Animal)
export class AnimalsResolver {
  constructor(private readonly animalsService: AnimalsService, private readonly usersService: UsersService) {}

  @Mutation(() => Animal, { nullable: true })
  async createAnimal(@Args('createAnimalInput') createAnimalInput: CreateAnimalInput) {
    const owner = await this.usersService.usersRepository.findOne(createAnimalInput.ownerId);
    if (!owner) return null;
    const newAnimal = {
      ...createAnimalInput,
      owner,
    };
    await this.animalsService.animalRepo.insert(newAnimal);
    return newAnimal;
  }

  @Query(() => [Animal], { name: 'animals' })
  findAll() {
    return this.animalsService.animalRepo.find({
      relations: ['owner'],
    });
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
}
