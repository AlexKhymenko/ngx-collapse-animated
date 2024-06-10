# NgxCollapse

Bootstrap-like collapse for Angular


## Installation

- Simply run `npm i ngx-collapse-animated`.
- Add animation provider to your project
  `providers: [provideAnimations(),
  provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes)]`

- Add the following in styles.scss of your application
````
.collapse:not(.show) {
  display: none;
}

.collapsing {
  height: 0;
  overflow: hidden;
  transition: height 0.35s ease;
}
````

or import scss file
`````
  @use 'ngx-collapse-animated';
`````
if You are using bootstrap no need to add styles

## Usage
Add ngxCollapseAnimated directive to where the content should be visible
`````
  <main class="container">
  <div class="item">
    <button (click)="visible = !visible">Show animation</button>
    <div [ngxCollapseAnimated]="visible">
      Hello to You!
    </div>
  </div>
</main>
`````

Import  NgxCollapseAnimatedDirective in Your component
````` 
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
`````
