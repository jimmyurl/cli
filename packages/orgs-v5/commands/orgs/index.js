'use strict'

let cli = require('heroku-cli-util')
let co = require('co')
let Utils = require('../../lib/utils')

function * run (context, heroku) {
  let orgs = yield heroku.get('/organizations')

  if (context.flags.enterprise) {
    orgs = orgs.filter(o => o.type === 'enterprise')
  }

  if (context.flags.json) {
    Utils.printGroupsJSON(orgs)
  } else {
    Utils.printGroups(orgs, { label: 'Organizations' })
  }
}

module.exports = {
  topic: 'orgs',
  description: 'list the organizations that you are a member of',
  needsAuth: true,
  flags: [
    { name: 'json', description: 'output in json format' },
    { name: 'enterprise', hasValue: false, description: 'filter by enterprise orgs' },
    { name: 'teams', hasValue: false, description: 'filter by teams', hidden: true }
  ],
  run: cli.command(co.wrap(run))
}
