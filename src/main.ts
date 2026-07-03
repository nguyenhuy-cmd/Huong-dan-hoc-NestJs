import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  //Đưa ValidationPipe vào toàn cục 
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,// bất kì thuộc tính nào không có trong DTO thì sẽ bị loại bỏ ,
    forbidNonWhitelisted:true, // nếu có thuộc tính không có trong DTO thì ném về lỗi 
    transform:true, // tự động chuyển dữ liệu input theo DTO 
  }
  ));

  // Cấu hình Swagger
  const config = new DocumentBuilder()
    .setTitle('API') // Tiêu đề của API
    .setDescription('API Description') // Mô tả của API
    .setVersion('1.0') // Phiên bản của API
    .setTermsOfService('')// điều khoản sử dụng 
    .setLicense('Apache 2.0', 'https://www.apache.org/licenses/LICENSE-2.0.html')// giấy phép
    .addServer('http://localhost:3000') // thêm server swagger
    .addTag('cats') // Thẻ của API
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);



  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
