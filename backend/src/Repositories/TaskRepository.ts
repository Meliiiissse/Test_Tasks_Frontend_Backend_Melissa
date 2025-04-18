import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { Prisma, Task } from '@prisma/client';

@Injectable()
export default class TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  // Récupérer toutes les tâches
  async findAll(): Promise<Task[]> {
    return this.prisma.task.findMany();
  }

  // Supprimer une tâche
  async delete(id: number): Promise<Task> {
    return this.prisma.task.delete({
      where: {
        id,
      },
    });
  }

  // Sauvegarder une tâche (création ou mise à jour)
  async save(
    data:
      | Prisma.XOR<Prisma.TaskCreateInput, Prisma.TaskUncheckedCreateInput>
      | Prisma.XOR<Prisma.TaskUpdateInput, Prisma.TaskUncheckedUpdateInput>,
  ): Promise<Task> {
    // Si l'ID est absent, on crée une nouvelle tâche
    if (!data.id) {
      return this.prisma.task.create({
        data: data as Prisma.TaskCreateInput, // Utilisation de `taskCreateInput` pour la création
      });
    } else {
      // Si l'ID est présent, on met à jour la tâche existante
      return this.prisma.task.update({
        where: { id: data.id as number }, // On s'assure que l'ID est un nombre
        data: data as Prisma.TaskUpdateInput, // Utilisation de `taskUpdateInput` pour la mise à jour
      });
    }
  }
}
