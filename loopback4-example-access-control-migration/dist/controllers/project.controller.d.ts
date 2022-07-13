import { Project } from '../models';
import { ProjectRepository } from '../repositories';
export declare class ProjectController {
    projectRepository: ProjectRepository;
    constructor(projectRepository: ProjectRepository);
    listProjects(): Promise<Omit<Project, 'balance'>[]>;
    viewAll(): Promise<Project[]>;
    findById(id: number): Promise<Project>;
    donateById(id: number, amount: number): Promise<void>;
    withdrawById(id: number, amount: number): Promise<void>;
}
