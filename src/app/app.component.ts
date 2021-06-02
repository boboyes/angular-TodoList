import { Component } from '@angular/core';
import { v4 as uuidv4 } from 'uuid'

interface List {
  id: string,
  title: string
  completed: boolean
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})

export class AppComponent {
  title = 'angular-test';
  public username:string='';
  public list: List[]=[];
  public Alllist: List[]=[];
  public type: string = 'All'

  addData(){
    if (this.username.trim()) {
      this.Alllist.push({
        id: uuidv4(),
        title: this.username.trim(),
        completed: false
      });/*向数组推数据*/
      this.list = this.getList(this.type)
      this.username = ""
      console.log(this.list)
    }
      
  }
  deleteData (id: string) {
    let list = JSON.parse(JSON.stringify(this.Alllist))
    let index = list.findIndex((item: { id: string; }) => item.id === id)
    list.splice(index, 1)
    this.Alllist = list
    this.list = this.getList(this.type)
  }
  checkName ($event: boolean, id: string) {
    let list = JSON.parse(JSON.stringify(this.Alllist))
    let index = list.findIndex((item: { id: string; }) => item.id === id)
    list[index].completed = $event
    this.Alllist = list
    this.list = this.getList(this.type)
    console.log($event, id,index, this.list)
  }
  changeList (type: string) {
    if (this.type == type) return
    this.type = type
    this.list = this.getList(type)
    console.log(type, this.list)
  }
  getList (type: string) {
    let list = JSON.parse(JSON.stringify(this.Alllist))
    switch (type) {
      case 'Completed':
        return list.filter((item: { completed: any; }) => item.completed)
      case 'Doing':
        return list.filter((item: { completed: any; }) => !item.completed)
      default:
        return list
    }
  }
  clearList () {
    this.Alllist = []
    this.type = "All"
    this.list = this.getList(this.type)
  }
}
