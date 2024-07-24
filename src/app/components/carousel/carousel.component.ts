import { Component, ElementRef, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
})
export class CarouselComponent {
  private isMouseDown = false;
  private currentMousePos = 0;
  private lastMousePos = 0;
  private lastMoveTo = 0;
  private moveTo = 0;
  private autoRotateSpeed = 0.3; // Velocidade de rotação automática

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.initEvents();
    this.createCarousel();
  }

  private createCarousel(): void {
    const container = this.el.nativeElement.querySelector('.container');
    const containerCarousel = container.querySelector('.container-carrossel');
    const carousel = container.querySelector('.carrossel');
    const carouselItems = carousel.querySelectorAll('.carrossel-item');
    const carouselProps = this.onResize();
    const length = carouselItems.length;
    const degrees = 360 / length;
    const gap = 20;
    const tz = this.distanceZ(carouselProps.w, length, gap);

    const fov = this.calculateFov(carouselProps, containerCarousel);
    const height = this.calculateHeight(tz);

    container.style.width = tz * 2 + gap * length + 'px';
    container.style.height = height + 'px';

    carouselItems.forEach((item: HTMLElement, i: number) => {
      const degreesByItem = degrees * i + 'deg';
      item.style.setProperty('--rotatey', degreesByItem);
      item.style.setProperty('--tz', tz + 'px');
    });
  }

  private lerp(a: number, b: number, n: number): number {
    return n * (a - b) + b;
  }

  private distanceZ(widthElement: number, length: number, gap: number): number {
    return widthElement / 2 / Math.tan(Math.PI / length) + gap;
  }

  private calculateHeight(z: number): number {
    const t = Math.atan((90 * Math.PI) / 180 / 2);
    return t * 2 * z;
  }

  private calculateFov(carouselProps: any, containerCarousel: any): number {
    const perspective = parseFloat(
      window.getComputedStyle(containerCarousel).perspective.split('px')[0]
    );
    const length =
      Math.sqrt(carouselProps.w * carouselProps.w) +
      Math.sqrt(carouselProps.h * carouselProps.h);
    return 2 * Math.atan(length / (2 * perspective)) * (180 / Math.PI);
  }

  private getPosX(x: number): void {
    this.currentMousePos = x;
    this.moveTo =
      this.currentMousePos < this.lastMousePos
        ? this.moveTo - 2
        : this.moveTo + 2;
    this.lastMousePos = this.currentMousePos;
  }

  private update(): void {
    if (!this.isMouseDown) {
      this.moveTo += this.autoRotateSpeed; // Incrementa a rotação automaticamente
    }
    this.lastMoveTo = this.lerp(this.moveTo, this.lastMoveTo, 0.05);
    const carousel = this.el.nativeElement.querySelector('.carrossel');
    carousel.style.setProperty('--rotatey', this.lastMoveTo + 'deg');
    requestAnimationFrame(() => this.update());
  }

  private onResize(): any {
    const containerCarousel = this.el.nativeElement.querySelector(
      '.container-carrossel'
    );
    const boundingCarousel = containerCarousel.getBoundingClientRect();
    return {
      w: boundingCarousel.width,
      h: boundingCarousel.height,
    };
  }

  private initEvents(): void {
    const carousel = this.el.nativeElement.querySelector('.carrossel');
    const container = this.el.nativeElement.querySelector('.container');

    carousel.addEventListener('mousedown', () => {
      this.isMouseDown = true;
      carousel.style.cursor = 'grabbing';
    });

    carousel.addEventListener('mouseup', () => {
      this.isMouseDown = false;
      carousel.style.cursor = 'grab';
    });

    container.addEventListener('mouseleave', () => {
      this.isMouseDown = false;
    });

    carousel.addEventListener('mousemove', (e: MouseEvent) => {
      if (this.isMouseDown) {
        this.getPosX(e.clientX);
      }
    });

    carousel.addEventListener('touchstart', () => {
      this.isMouseDown = true;
      carousel.style.cursor = 'grabbing';
    });

    carousel.addEventListener('touchend', () => {
      this.isMouseDown = false;
      carousel.style.cursor = 'grab';
    });

    container.addEventListener('touchmove', (e: TouchEvent) => {
      if (this.isMouseDown) {
        this.getPosX(e.touches[0].clientX);
      }
    });

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', () => this.createCarousel());
    }

    this.update();
    this.createCarousel();
  }

  ngOnDestroy(): void {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', () => this.createCarousel());
    }
  }
}
