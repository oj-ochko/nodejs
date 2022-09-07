import { Injectable } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'Americano',
      brand: 'TomnToms',
      flavors: ['prettyGirl', 'love'],
    },
  ];

  findAll() {
    return this.coffees;
  }

  findOne(id: string) {
    return this.coffees.find((item) => item.id === +id);
  }
  create(createCoffeeDto: any) {
    this.coffees.push(createCoffeeDto);
  }
  update(id: string, updateCoffeDto: any) {
    const existingCoffe = this.findOne(id);
    if (existingCoffe) {
      //update coffe
    }
  }
  remove(id: string) {
    const coffeeIndex = this.coffees.findIndex((item) => item.id === +id);
    if (coffeeIndex >= 0) {
      this.coffees.splice(coffeeIndex, 1);
    }
  }
}
