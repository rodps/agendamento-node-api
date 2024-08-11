import app from './express/app'
import { appConfig } from './main/config/app.config'

app.listen(appConfig.port, () => {
  console.log(`Servidor iniciado na porta ${appConfig.port}`)
})
