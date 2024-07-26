import { Component } from '@angular/core';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-backoffice',
  templateUrl: './backoffice.component.html',
  styleUrl: './backoffice.component.scss',
})
export class BackofficeComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  users: any[] = [];
  isEditing: boolean = false;
  currentUserId: number | null = null;

  constructor(private userService: UserService) {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data;
        console.log('Usuários recebidos:', this.users);
      },
      (error) => {
        console.error('Erro ao buscar usuários:', error);
      }
    );
  }

  editUser(user: any) {
    this.isEditing = true;
    this.currentUserId = user.id;
    this.name = user.name;
    this.email = user.email;
    this.password = '';
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(
      (response) => {
        console.log('Resposta recebida:', response);
        alert(response.message || 'Usuário deletado com sucesso!');
        this.getUsers();
      },
      (error) => {
        console.error('Erro recebido:', error);
        alert(error.error?.error || 'Erro ao deletar usuário.');
      }
    );
  }

  resetForm() {
    this.name = '';
    this.email = '';
    this.password = '';
    this.isEditing = false;
    this.currentUserId = null;
  }
}
