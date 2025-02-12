import { CounterService } from './../counter.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
CounterService=inject(CounterService);
// constructor(private counterService: CounterService){
// }
ngOnInit() {
this.CounterService.getCounter().subscribe((response)=>console.log(response))
};
}
