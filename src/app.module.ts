import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProdutosModule } from './produtos/produtos.module'

//é obrigatória a importação deste módulo, para que o nest enxergue a rota na request
@Module({
  imports: [ ProdutosModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
