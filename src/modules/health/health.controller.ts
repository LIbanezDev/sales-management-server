import { Controller, Get } from '@nestjs/common';
import { DNSHealthIndicator, HealthCheck, HealthCheckService } from '@nestjs/terminus';
import { ConfigService } from '@nestjs/config';

@Controller('health')
export class HealthController {
  constructor(private health: HealthCheckService, private dns: DNSHealthIndicator, private configService: ConfigService) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([() => this.dns.pingCheck('sales-management', this.configService.get('url'))]);
  }
}
