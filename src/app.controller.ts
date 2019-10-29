import {Controller, Get, Post, Body, Put, Param} from '@nestjs/common';
import { AppService } from './app.service';
import { StoryDTO } from './story.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Post('story')
  async createStory(@Body() story: StoryDTO): Promise<any> {
    return await this.appService.createStory(story);
  }

  @Get('stories')
  async getStories(): Promise<any> {
    return await this.appService.getStories();
  }

  @Put('story/:id')
  async updateStory(@Param('id') id: string, @Body() story: StoryDTO) {
    await this.appService.updateStory(id, story);
    return {status: 'success'};
  }
}
