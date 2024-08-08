import { appConfig } from './app-config'
import app from './express/app'

app.listen(appConfig.port, () => {
  console.log(`Servidor iniciado na porta ${appConfig.port}`)
})
