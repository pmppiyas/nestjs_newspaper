import { Auth } from '@/common/decorators/auth.decorator';
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
}
