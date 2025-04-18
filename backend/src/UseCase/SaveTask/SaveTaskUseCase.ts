import { Injectable, BadRequestException } from '@nestjs/common';
import { Task } from '@prisma/client';
import { UseCase } from '../../index';
import SaveTaskDto from './SaveTaskDto';
import TaskRepository from '../../Repositories/TaskRepository';

@Injectable()
export default class SaveTaskUseCase implements UseCase<Promise<Task>, [SaveTaskDto]> {
  constructor(private readonly taskRepository: TaskRepository) {}

  async handle(dto: SaveTaskDto): Promise<Task> {
    if (!dto.name || dto.name.trim() === '') {
      throw new BadRequestException('Le nom de la tâche est requis');
    }

    try {
      const taskData = { name: dto.name, id: dto.id };
      return await this.taskRepository.save(taskData);
    } catch (error) {
      throw new BadRequestException('Erreur lors de la sauvegarde de la tâche');
    }
  }
}
