// importar User = entities.
import User from '@modules/users/infra/typeorm/entities/User';

// importar o ICreateUserDTO para aplicar ao create()
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '../dtos/IFindAllProvidersDTO';

export default interface IUsersRepository {
  // passo as informações que o novo metodo findById
  findById(id: string): Promise<User | undefined>;
  // passo as informações que o novo metodo findByEmail
  findByEmail(email: string): Promise<User | undefined>;
  /**
   * Criar uma pasta de dtos == para informações a serem usadas no método create
   */
  create(data: ICreateUserDTO): Promise<User>;
  /**
   * Método save para criar um usuario salvar no banco
   */
  save(user: User): Promise<User>;
  // Criando método de listagem com excesão
  findAllProviders(data: IFindAllProvidersDTO): Promise<User[]>;
}
