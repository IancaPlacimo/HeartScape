import { Component } from '@angular/core';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss',
})
export class CadastroComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private userService: UserService) {}

  onSubmit() {
    this.createUsers();
  }

  createUsers() {
    if (this.name && this.email && this.password) {
      this.userService
        .createUser({
          name: this.name,
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
            alert(error.error?.error || 'Erro ao criar usuário.');
          }
        );
    } else {
      alert('Preencha todos os campos.');
    }
  }
}
