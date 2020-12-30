import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'Nombre de producto',
  })
  @IsString()
  name: string;

  @IsInt()
  @ApiProperty({
    description: 'Stock actual',
  })
  stock: number;
}
