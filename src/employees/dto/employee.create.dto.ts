import { Matches } from 'class-validator';

export class CreateEmployeeDto {
  nome: string;
  cpf: string;
  email: string;
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%])/, {
    message:
      'A senha deve ter pelo menos uma letra minúscula, uma letra maiúscula, um número e um caracter especial.',
  })
  senha: string;
}
