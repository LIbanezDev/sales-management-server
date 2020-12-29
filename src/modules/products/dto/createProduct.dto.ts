import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    description: 'Nombre de producto',
  })
  name: string;

  @ApiProperty({
    description: 'Stock actual',
  })
  stock: number;
}
