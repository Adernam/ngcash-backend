import { dataSource } from './data-source'
import { app, port } from './app'

dataSource
  .initialize()
  .then(async () => {
    console.log('Database connected successfully!')
    app.listen(port, () => {
      console.info(`Server listening on ${port}`)
    })
  })
  .catch((error) => console.log(error))
