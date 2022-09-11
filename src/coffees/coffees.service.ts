import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from 'src/events/entities/event.entity';
@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeReppository: Repository<Coffee>,
  ) {}

  findAll() {
    return this.coffeeReppository.find({
      relations: ['flavors'],
    });
  }

  async findOne(id: any) {
    const coffee = await this.coffeeReppository.findOne({
      where: { id },
      relations: ['flavor'],
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }
  create(createCoffeeDto: CreateCoffeeDto) {
    const coffee = this.coffeeReppository.create(createCoffeeDto);
    return this.coffeeReppository.save(coffee);
  }

  async update(id: string, updateCoffeDto: UpdateCoffeeDto) {
    const coffee = await this.coffeeReppository.preload({
      id: +id,
      ...updateCoffeDto,
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return this.coffeeReppository.save(coffee);
  }
  async remove(id: string) {
    const coffee = await this.findOne({ where: { id } });
    return this.coffeeReppository.remove(coffee);
  }
}
