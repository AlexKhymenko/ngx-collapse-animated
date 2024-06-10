import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NgxCollapseAnimatedDirective} from 'ngx-collapse-animated'
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgxCollapseAnimatedDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'collapse-animated';

  visible = true;
}
