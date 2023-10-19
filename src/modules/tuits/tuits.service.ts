import { Injectable, NotFoundException } from '@nestjs/common';

import { Tuit } from './tuit.entity';
import { CreateTuitDto } from './dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TuitsService {
  constructor(@InjectRepository(Tuit) private readonly tuitRepository: Repository<Tuit>) {}

  async getTuits(): Promise<Tuit[]> {
    return await this.tuitRepository.find();
  }

  async getTuitById(id: number): Promise<Tuit> {
    const tuit = await this.tuitRepository.findOne({ where: { id: id } });

    if (!tuit) {
      throw new NotFoundException('Resource not found');
    }

    return tuit;
  }

  createTuit({ message }: CreateTuitDto) {
    const tuit = this.tuitRepository.create({ message });

    return this.tuitRepository.save(tuit);
  }

  async updateTuit(id: number, { message }: CreateTuitDto): Promise<Tuit> {
    const tuit: Tuit = await this.tuitRepository.preload({
      id,
      message,
    });

    if (!tuit) {
      throw new NotFoundException('Resourse not found');
    }

    return tuit;
  }

  async removeTuit(id: number): Promise<string> {
    const tuit: Tuit = await this.getTuitById(id);

    this.tuitRepository.remove(tuit);

    return 'Has been removed successfully';
  }
}
