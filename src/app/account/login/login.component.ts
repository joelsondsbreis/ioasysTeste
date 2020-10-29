import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../shared/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login = {
    email: '',
    password: ''
  }

  constructor(
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  async onSubmit() {
    try {
      const result = await this.accountService.login(this.login);
      if(result) {
      console.log(`Login efetuado: ${result}`);
      // navega para a rota vazia novamente
      this.router.navigate(['/home']);
      }

    } catch (error) {
      console.error(error);
    }
  }
  onIsError(): any {
    throw new Error('Method not implemented.');
  }
}
