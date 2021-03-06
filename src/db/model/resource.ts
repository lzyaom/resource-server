import {Schema, model} from "mongoose"

import {Resource} from '../../../types/global'

const resourceScheme = new Schema<Resource>({
  name: String,
  img: String,
  link: String,
  classify: String,
  summary: String,
  encrypt: {type: Number, default: 1},
  psw: {type: String, maxlength: 10, minlength: 6, select: false},
  status: {type: Number, default: 1},
  deleted: {type: Boolean, default: false, select: false}
}, {
  versionKey: false,
  timestamps: {createdAt: 'createTime', updatedAt: 'updateTime'},
  id: true,
  toJSON: {virtuals: true},
  toObject: {virtuals: true}
})

export default model<Resource>('resource', resourceScheme)