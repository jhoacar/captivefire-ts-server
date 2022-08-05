import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return 'Hola';
  }

  @Post('/openwrt')
  garantAccessOpenWRT(@Req() request: Request, @Res() response: Response): Response<any, Record<string, any>> {
    const authorizationHeaders = request.headers.authorization;
    if (!authorizationHeaders)
      return response.status(403).json({ error: "Authorization headers missed" });
    if (!authorizationHeaders.includes('Bearer'))
      return response.status(403).json({ error: "Bearer missed in header" });

    const token = authorizationHeaders.split('Bearer').pop()?.trim();

    if (!token)
      return response.status(403).json({ error: "token missed" });

    
      console.log(token);

    return response.status(202).json({
      body: 'ok'
    })
  }

  @Post('/openwrt/update')
  updateOpenWRT(@Req() request: Request, @Res() response: Response): Response<any, Record<string, any>>| void{
    const authorizationHeaders = request.headers.authorization;
    if (!authorizationHeaders)
      return response.status(403).json({ error: "Authorization headers missed" });
    if (!authorizationHeaders.includes('Bearer'))
      return response.status(403).json({ error: "Bearer missed in header" });

    const token = authorizationHeaders.split('Bearer').pop()?.trim();

    if (!token)
      return response.status(403).json({ error: "token missed" });

    const pathPhar = require("path").resolve(__dirname + '/../../captivefire-openwrt-server/build/index.phar');
    response.status(202).sendFile(pathPhar);
  }
}
