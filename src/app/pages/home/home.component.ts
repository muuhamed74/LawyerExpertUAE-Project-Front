import { NgFor, NgIf } from '@angular/common';
<<<<<<< HEAD
import { Component, AfterViewInit, ViewChild, ElementRef, OnDestroy, HostListener } from '@angular/core';
=======
import { Component, AfterViewInit, ViewChild, ElementRef, OnDestroy, HostListener, Inject, PLATFORM_ID } from '@angular/core';
>>>>>>> upstream/master
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import EmblaCarousel from 'embla-carousel';
import emailjs from 'emailjs-com';
import { ToastrService } from 'ngx-toastr';
<<<<<<< HEAD
=======
import { isPlatformBrowser } from '@angular/common';
>>>>>>> upstream/master

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, RouterLink, NgIf, FormsModule],
  templateUrl: './home.component.html',
<<<<<<< HEAD
  styleUrl: './home.component.css',
})
export class HomeComponent implements AfterViewInit, OnDestroy {

  constructor(private toastr: ToastrService) {}


=======
  styleUrls: ['./home.component.css'], // صححت typo
})
export class HomeComponent implements AfterViewInit, OnDestroy {

>>>>>>> upstream/master
  @ViewChild('embla') emblaRef!: ElementRef;
  embla: any;
  selectedIndex = 0;
  autoplayInterval: any;
  showButton = false;
<<<<<<< HEAD
=======
  isBrowser: boolean;
>>>>>>> upstream/master

  formData = {
    name: '',
    email: '',
    phone: '',
    message: ''
  };

<<<<<<< HEAD
=======
  resumes = [
    { image: 'assets/images/اتفاقية-وساطة-تجارية.webp' },
    { image: 'assets/images/اتفاقية-الغاء-رخصة-تجارية.docx.webp' },
    { image: 'assets/images/عقد-بيع-حصص-وفسخ-شراكة.webp' },
    { image: 'assets/images/عقد-تأسيس-شركة-اعمال-مدنية.webp' },
    { image: 'assets/images/عقـــد-بيع-محل-تجارى.webp' },
    { image: 'assets/images/عقد-تعيين-وكيل-خدمات-محلي.webp' },
    { image: 'assets/images/عقد-بيع حصص-وملحق-بتعديل-عقد-تأسيس.webp' },
  ];

  constructor(private toastr: ToastrService, @Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

>>>>>>> upstream/master
  isFormValid(): boolean {
    return this.formData.name.trim() !== '' &&
      this.formData.email.trim() !== '' &&
      this.formData.phone.trim() !== '' &&
      this.formData.message.trim() !== '';
  }

  sendEmail(event: Event) {
    event.preventDefault();

    if (!this.isFormValid()) {
      alert('⚠️ من فضلك املا كل الخانات قبل الإرسال');
      return;
    }

    emailjs.send(
<<<<<<< HEAD
      'service_j5k3889',   // حط الـ Service ID من EmailJS
      'template_h2r7kho',  // حط الـ Template ID من EmailJS
      this.formData,
      '57pj8qlkDabVqp8kH'    // حط الـ Public Key من EmailJS
    ).then(() => {
      this.toastr.success('تم إرسال رسالتك بنجاح ✅');
      this.formData = { name: '', email: '', phone: '', message: '' }; // مسح البيانات بعد الإرسال
    }).catch((error) => {
=======
      'service_j5k3889',
      'template_h2r7kho',
      this.formData,
      '57pj8qlkDabVqp8kH'
    ).then(() => {
      this.toastr.success('تم إرسال رسالتك بنجاح ✅');
      this.formData = { name: '', email: '', phone: '', message: '' };
    }).catch(() => {
>>>>>>> upstream/master
      this.toastr.error('حصل خطأ ما ❌');
    });
  }

<<<<<<< HEAD

  @HostListener('window:scroll', [])
  onWindowScroll() {
=======
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (!this.isBrowser) return;
>>>>>>> upstream/master
    const scrollY = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.showButton = scrollY > 300;
  }

  scrollToTop() {
<<<<<<< HEAD
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  resumes = [
    { image: 'assets/images/اتفاقية-وساطة-تجارية.webp' },
    { image: 'assets/images/اتفاقية-الغاء-رخصة-تجارية.docx.webp' },
    { image: 'assets/images/عقد-بيع-حصص-وفسخ-شراكة.webp' },
    { image: 'assets/images/عقد-تأسيس-شركة-اعمال-مدنية.webp' },
    { image: 'assets/images/عقـــد-بيع-محل-تجارى.webp' },
    { image: 'assets/images/عقد-تعيين-وكيل-خدمات-محلي.webp' },
    { image: 'assets/images/عقد-بيع حصص-وملحق-بتعديل-عقد-تأسيس.webp' },
  ];

  ngAfterViewInit() {
=======
    if (!this.isBrowser) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  ngAfterViewInit() {
    if (!this.isBrowser) return;

>>>>>>> upstream/master
    this.embla = EmblaCarousel(this.emblaRef.nativeElement, {
      direction: 'rtl',
      loop: true,
    });

    const updateSelected = () => {
      this.selectedIndex = this.embla.selectedScrollSnap();
<<<<<<< HEAD

=======
>>>>>>> upstream/master
      const slides = this.embla.slideNodes();
      slides.forEach((slide: HTMLElement, index: number) => {
        slide.classList.toggle('is-selected', index === this.selectedIndex);
      });
    };

    this.embla.on('select', updateSelected);
    updateSelected();

    this.autoplayInterval = setInterval(() => {
      if (!this.embla) return;
      if (!this.embla.canScrollNext()) {
        this.embla.scrollTo(0);
      } else {
        this.embla.scrollNext();
      }
    }, 7000);
  }

  ngOnDestroy() {
    clearInterval(this.autoplayInterval);
  }

  scrollPrev() {
<<<<<<< HEAD
=======
    if (!this.isBrowser) return;
>>>>>>> upstream/master
    this.embla.scrollPrev();
  }

  scrollNext() {
<<<<<<< HEAD
=======
    if (!this.isBrowser) return;
>>>>>>> upstream/master
    this.embla.scrollNext();
  }

  scrollTo(index: number) {
<<<<<<< HEAD
    this.embla.scrollTo(index);
  }
}
=======
    if (!this.isBrowser) return;
    this.embla.scrollTo(index);
  }
}
>>>>>>> upstream/master
