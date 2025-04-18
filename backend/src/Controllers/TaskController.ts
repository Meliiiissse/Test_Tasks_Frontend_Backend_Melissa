import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import DeleteTask from '../UseCase/DeleteTask/DeleteTask';
import GetAllTasksUseCase from '../UseCase/GetAllTasks/GetAllTasksUseCase';
import SaveTaskDto from '../UseCase/SaveTask/SaveTaskDto';
import UseCaseFactory from '../UseCase/UseCaseFactory';
import SaveTaskUseCase from '../UseCase/SaveTask/SaveTaskUseCase';

@Controller('tasks')
export default class TaskController {
  constructor(private readonly useCaseFactory: UseCaseFactory) {}

  /*@Get()
  async getAll() {
    return (await this.useCaseFactory.create(GetAllTasksUseCase)).handle();
  }*/
    @Get()
    async getAll() {
      console.log('Fetching all tasks...'); // Log de suivi
      const tasks = await (await this.useCaseFactory.create(GetAllTasksUseCase)).handle();
      console.log('Tasks fetched:', tasks); // Log des tâches récupérées
      return tasks;
    }
    

  @Post()
  async create(@Body() dto: SaveTaskDto) {
    // Création d'une nouvelle tâche
    return (await this.useCaseFactory.create(SaveTaskUseCase)).handle(dto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: SaveTaskDto) {
    // Mise à jour d'une tâche existante
    dto.id = Number(id); // Assigner l'ID
    return (await this.useCaseFactory.create(SaveTaskUseCase)).handle(dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return (await this.useCaseFactory.create(DeleteTask)).handle(Number(id));
  }
}
