
exports.fs = require('fs')
exports.Koa = require('koa')

exports.parse = require('co-body')
exports.multipartParse = require('co-busboy')

const { Nuxt, Builder } = require('nuxt')

exports.Nuxt = Nuxt
exports.Builder = Builder

exports.config = require('../../nuxt.config.js')

exports.translatePathToMethod = (path) => {
  path = path.split('-')
  if (path.length === 1) {
    return path[0]
  } else if (path.length > 1) {
    const parts = path.slice(1).map((part) => {
      return `${part[0].toUpperCase()}${part.slice(1)}`
    })
    return `${path[0]}${parts.join('')}`
  } else {
    return path
  }
}

exports.models = require('./models')
