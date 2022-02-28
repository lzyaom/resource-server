import {Service} from 'typedi'
import {Model, ObjectId} from 'mongoose'
import {Project} from '../../types/global'
import ProjectModel from '../db/model/project'

export type Query = Pick<Project, 'name' | 'status'>

@Service()
export default class ProjectService {

  private model: Model<Project> = ProjectModel

  async findAll (query: Partial<Query>, page: number, size: number) {
    const skip = (page - 1) * size
    try {
      const data = await this.model.find(query).sort({createTime: -1}).limit(size).skip(skip).exec()
      const total = await this.model.count(query).exec()

      return {
        data,
        total
      }
    } catch (error) {
      throw error
    }
  }

  async create (project: Partial<Project>) {
    try {
      await this.model.create(project)
      return true
    } catch (error) {
      throw error
    }
  }
  
  async updateById (id: ObjectId, project: Partial<Project>) {
    try {
      await this.model.findByIdAndUpdate(id, project)
      return true
    } catch (error) {
      throw error
    }
  }
}