import {
  Directive,
  ElementRef,
  HostBinding,
  inject,
  input,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  animate,
  AnimationBuilder,
  AnimationPlayer,
  keyframes,
  style,
} from '@angular/animations';

@Directive({
  selector: '[ngxCollapseAnimated]',
  standalone: true,
})
export class NgxCollapseAnimatedDirective implements OnChanges, OnInit {
  private static readonly SHOW_STYLE = 'show';
  private static readonly COLLAPSING = 'collapsing';

  @HostBinding('class')
  private readonly addCollapseClass = 'collapse';

  private el = inject(ElementRef);
  private builder = inject(AnimationBuilder);

  @Input('ngxCollapseAnimated')
  collapsed!: any;

  public skipClosingAnimation = input(false);

  private currentEffect!: AnimationPlayer | null;
  private _closeEffect!: AnimationPlayer | null;
  private _openEffect!: AnimationPlayer | null;

  private get getClassList() {
    const nativeElement = this.el.nativeElement as HTMLElement;
    return nativeElement.classList;
  }

  ngOnInit(): void {
    if (!this.collapsed) {
      this.getClassList.add(NgxCollapseAnimatedDirective.SHOW_STYLE);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['collapsed']) {
      const value = changes['collapsed'];
      if (
        (value.previousValue === true || value.previousValue === undefined) &&
        value.currentValue === false
      ) {
        this.startOpening();
      }
      if (
        (value.previousValue === false || value.previousValue === undefined) &&
        value.currentValue === true
      ) {
        this.startClosing();
      }
    }
  }

  //////////////////////////////////////// PRIVATE METHODS ////////////////////////////////////////////////////////////
  private get openEffect(): AnimationPlayer {
    if (!this._openEffect) {
      this._openEffect = this.builder
        .build(
          animate(
            '350ms',
            keyframes([style({ height: '0' }), style({ height: '*' })]),
          ),
        )
        .create(this.el.nativeElement);
    }
    this._openEffect.onDone(() => this.effectDone());
    return this._openEffect;
  }

  private get closeEffect(): AnimationPlayer {
    if (!this._closeEffect) {
      this._closeEffect = this.builder
        .build(
          animate(
            '350ms',
            keyframes([style({ height: '*' }), style({ height: '0' })]),
          ),
        )
        .create(this.el.nativeElement);
    }
    this._closeEffect.onDone(() => this.effectDone());
    return this._closeEffect;
  }

  private effectDone() {
    if (this.collapsed) {
      this.getClassList.remove(NgxCollapseAnimatedDirective.SHOW_STYLE);
    }
    this.getClassList.remove(NgxCollapseAnimatedDirective.COLLAPSING);
    if (this.currentEffect) {
      this.currentEffect.reset();
      this.currentEffect = null;
    }
  }

  private startOpening(): void {
    this.getClassList.add(NgxCollapseAnimatedDirective.SHOW_STYLE);
    const effect = this.openEffect;
    this.playEffect(effect);
  }

  private startClosing(): void {
    const effect = this.closeEffect;
    if (this.skipClosingAnimation()) {
      this.effectDone();
    } else {
      this.playEffect(effect);
    }
  }

  private playEffect(effect: AnimationPlayer) {
    if (!this.currentEffect) {
      this.getClassList.add(NgxCollapseAnimatedDirective.COLLAPSING);
      this.currentEffect = effect;
      this.currentEffect.play();
    }
  }
}
