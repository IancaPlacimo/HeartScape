import { Component } from '@angular/core';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private userService: UserService) {}

  onSubmit() {
    this.createUsers();
  }

  createUsers() {
    this.userService
      .createUser({
        username: this.username,
        email: this.email,
        password: this.password,
      })
      .subscribe(
        (response) => {
          console.log('Resposta recebida:', response);
          alert(response.message || 'Usuário criado com sucesso!');
        },
        (error) => {
          console.error('Erro ao criar usuário:', error);
          if (error.error instanceof ErrorEvent) {
            alert(`Erro: ${error.error.message}`);
          } else {
            alert(`Erro do servidor: ${error.status} ${error.message}`);
          }
        }
      );
  }
}
