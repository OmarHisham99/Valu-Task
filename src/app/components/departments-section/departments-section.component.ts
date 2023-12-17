import { Component,HostListener } from '@angular/core';
@Component({
  selector: 'app-departments-section',
  templateUrl: './departments-section.component.html',
  styleUrl: './departments-section.component.scss',
})
export class DepartmentsSectionComponent {
  // ***************** Variables ***************** //
  departments = [
    {
      title: 'Human Resources',
      details: 'Details about Department 1',
      flipped: false,
      image: 'assets/images/hr-dep.png',
    },
    {
      title: 'IT',
      details: 'Details about Department 2',
      flipped: false,
      image: 'assets/images/it.png',
    },
    {
      title: 'Finance',
      details: 'Details about Department 3',
      flipped: false,
      image: 'assets/images/finance.png',
    },
    {
      title: 'Marketing',
      details: 'Details about Department 4',
      flipped: false,
      image: 'assets/images/marketing.png',
    },
    {
      title: 'Research and Development',
      details: 'Details about Department 5',
      flipped: false,
      image: 'assets/images/research.png',
    },

    // Add more departments as needed
  ];
  slidesPerView: number = 3;
  // ***************** Constructor ***************** //
  constructor() {}
  // ***************** Functions ***************** //
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.updateSlidesPerView();
  }
  private updateSlidesPerView(): void {
    const screenWidth = window.innerWidth;

    if (screenWidth <= 768) {
      // Small screens, show 1 slide
      this.slidesPerView = 1;
    } else if (screenWidth <= 992) {
      // Medium screens, show 2 slides
      this.slidesPerView = 2;
    } else {
      // Larger screens, show 3 slides
      this.slidesPerView = 3;
    }
  }
  flipCard(id: number) {
    this.departments[id].flipped = !this.departments[id].flipped;
  }

  checkIfFliped(id: number): boolean {
    return this.departments[id].flipped;
  }
}
