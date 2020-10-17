import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import {delay} from 'rxjs/operators'
import {HttpClient} from '@angular/common/http'


  
class Item{

   
  name: string;
  surname: string;
  constructor(name: string, surname: string){
   
    this.name = name;
    this.surname = surname; 
    
  } 
  
  }
  export interface Todo {
    completed: boolean
    title: string
    id?: number
  }
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  todos: Todo[] = []

  loading = false

  todoTitle = ''
  name: string = "";
  surname: string = "";
  
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchTodos()
  }
    
   
  taxies = [];
  
      addItem(name: string, surname: string): void {
        if(name != "" && surname != ""){
          this.taxies.push(new Item(name, surname));
        }else{
          return;
        }  
        this.name = ""
        this.surname= ""    
       
  };
  removeItem(i: number): void {
    if(confirm("Are you agree to removing this element?")){
      this.taxies.splice(i, 1);  
    }
  }
  fetchTodos() {
      this.loading = true
      this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos?_limit=2')
        .pipe(delay(1500))
        .subscribe(todos => {
          this.todos = todos
          this.loading = false
        })
   }
  }