import { Auth } from '@/common/decorators/auth.decorator';
import { CurrentUser } from '@/common/decorators/user.decorator';
import { IJwtPayload } from '@/common/interfaces/jwt.interface';
import { MetaService } from '@/modules/meta/meta.service';
import { Controller, Get } from '@nestjs/common';

@Controller('meta')
export class MetaController {
  constructor(readonly metaServices: MetaService) {}

  @Get('admin')
  @Auth('ADMIN')
  async adminStats() {
    const result = await this.metaServices.getAdminStats();

    return {
      message: "Admin's stats retrieved successfully",
      data: result,
    };
  }

  @Get('reader')
  @Auth('READER')
  async readerStats(@CurrentUser() user: IJwtPayload) {
    const result = await this.metaServices.getReaderStats(user.id);

    return {
      message: "Reader's stats retrieved successfully",
      data: result,
    };
  }
}
