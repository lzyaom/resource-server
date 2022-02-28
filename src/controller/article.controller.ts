import {JsonController, Param, Body, Get, Post, Put, Delete, Ctx} from 'routing-controllers'
import {Service} from 'typedi'
import { Context } from 'koa'

import ArticleService, {Query} from '../service/article.service'

import {Article, PageType, ResponseCode} from '../../types/global'

@JsonController()
@Service()
export class ArticleController {

  constructor (private articleService: ArticleService){
  }

  @Get('/articles')
  async all (@Ctx() ctx: Context) {
    const query = ctx.query as unknown as Partial<Query & PageType>

    const {title, classify, tags, encrypt, status, page = 1, size = 10} = query
    const params: Partial<Query> = {}
    if (title) {
      params['title'] = new RegExp(title, 'i') as any
    }
    if (classify) {
      params.classify = classify
    }
    if (tags && tags.length !== 0) {
      params.tags = tags
    }
    if (encrypt !== undefined) {
      params.encrypt = encrypt
    }
    if (status !== undefined) {
      params.status = status
    }
    try {
      const data = await this.articleService.findAll(params, page, size)
      return {
        code: ResponseCode.SUCCESS,
        data
      }
    } catch (error) {
      console.error(error)
      return {
        code: ResponseCode.ERROR,
        msg: '服务端错误'
      }
    }
  }

  @Get('/article/:id')
  async one (@Param('id') id: any, @Ctx() ctx: Context) {
    if (!id) {
      return {
        code: ResponseCode.NOTNULL,
        msg: 'id 不能为空'
      }
    }
    // todo: 防刷 （IP + client）
    // const ip = ctx.ip
    // const userAgent = ctx.headers['user-agent']

    try {
      const data = await this.articleService.findById(id)

      if (data && !data._id) {
        return {
          code: ResponseCode.NOTFOUND,
          msg: '该文章不存在'
        }
      }
      return {
        code: ResponseCode.SUCCESS,
        data
      }
    } catch (error) {
      console.error(error)
      return {
        code: ResponseCode.ERROR,
        msg: '服务端错误'
      }
    }
  }

  @Post('/article')
  async create (@Body() article: Partial<Article>) {
    if (!article.title || !article.content) {
      return {
        code: ResponseCode.NOTNULL,
        msg: '标题和内容不能为空'
      }
    }
    try {
      await this.articleService.create(article)
      return {
        code: ResponseCode.SUCCESS,
        msg: '创建成功'
      }
    } catch (error) {
      console.error(error)
      return {
        code: ResponseCode.ERROR,
        msg: '服务端错误'
      }
    }
  }

  @Put('/article/:id')
  async modify (@Param('id') id: any, @Body() article: Partial<Article>) {
    if (!id) {
      return {
        code: ResponseCode.NOTNULL,
        msg: 'id不能为空'
      }
    }
    try {
      await this.articleService.updateById(id, article)

      return {
        code: ResponseCode.SUCCESS,
        msg: '更新成功'
      }
    } catch (error) {
      console.error(error)
      return {
        code: ResponseCode.ERROR,
        msg: '服务端错误'
      }
    }
  }

  @Delete('/article/:id')
  async delOne (@Param('id') id: any) {
    if (!id) {
      return {
        code: ResponseCode.NOTNULL,
        msg: 'id不能为空'
      }
    }
    try {
      const flag = await this.articleService.deleteById(id)
      if (!flag) {
        return {
          code: ResponseCode.FAIL,
          msg: '删除失败'
        }
      }
      return {
        code: ResponseCode.SUCCESS,
        msg: '删除成功'
      }
    } catch (error) {
      console.error(error)
      return {
        code: ResponseCode.ERROR,
        msg: '服务端错误'
      }
    }
  }
}