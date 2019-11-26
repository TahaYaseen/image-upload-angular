import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { trigger, state, style, transition, animate } from '@angular/animations';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,private http: HttpClient) { }

public username: string;
public password: string;

  ngOnInit() {
    console.log('ng on init');
  }

  login() {
    debugger;
  //   this.http.post('http://localhost:8080/upload', body)
  // .subscribe(
  //   // Admire results
  //   (data) => {console.log(data)},
  //   // Or errors :-(
  //   error => console.log(error),
  //   // tell us if it's finished
  //   () => { console.log("completed") }
  // );
    console.log('Username', this.username);
    if(this.username == 'admin' && this.password.valueOf() == 'admin'){
      this.router.navigate(["image-upload"]);
     }else {
       alert("Invalid credentials");
     }
    
  }

}
