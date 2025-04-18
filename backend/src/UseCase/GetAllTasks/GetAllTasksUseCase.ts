import { Injectable, BadRequestException } from '@nestjs/common';
import { Task } from '@prisma/client';
import { UseCase } from '../../index';
import TaskRepository from '../../Repositories/TaskRepository';

@Injectable()
export default class GetAllTasksUseCase implements UseCase<Promise<Task[]>, []> {
  constructor(private readonly taskRepository: TaskRepository) {}

  async handle(): Promise<Task[]> {
    try {
      return await this.taskRepository.findAll();
    } catch (error) {
      console.error('Error fetching tasks:', error);  // Log pour mieux comprendre l'erreur
      throw new BadRequestException(error.message);
    }
  }
}
