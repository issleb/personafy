import type { Task } from 'graphile-worker'

const task: Task = async () => {
  try {
    throw new Error('Worker error test')
  } catch (err) {
    console.error(err)
  }
}

module.exports = task
