import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { MediaService } from './media.service';
import { UpdateMediaDto } from './dto/update-media.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateMediaDto } from './dto/create-media.dto';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { Media } from './entities/media.entity';
import { ApiPaginationQuery } from '../decorators/ApiPaginationQuery.decorator';
import { BearAuthToken } from '../decorators/BearerAuth.decorator';

@Controller('media')
@BearAuthToken()
@ApiTags('Media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get()
  @ApiResponse({ status: 200, type: Paginated<Media> })
  @ApiPaginationQuery({ canSelect: true })
  findAll(@Paginate() query: PaginateQuery): Promise<Paginated<Media>> {
    return this.mediaService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mediaService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File to upload',
    type: UpdateMediaDto,
  })
  update(
    @Param('id') id: string,
    @Body() updateMediaDto?: UpdateMediaDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.mediaService.update(id, updateMediaDto, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mediaService.remove(id);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File to upload',
    type: CreateMediaDto,
  })
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() createMediaDto: CreateMediaDto,
  ) {
    return this.mediaService.create(createMediaDto, file);
  }
}
