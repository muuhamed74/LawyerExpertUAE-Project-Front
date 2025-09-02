import {
  Component,
  ElementRef,
  ViewChildren,
  QueryList,
<<<<<<< HEAD
  Renderer2
} from '@angular/core';
import { CommonModule } from '@angular/common';
=======
  Renderer2,
  Inject,
  PLATFORM_ID
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
>>>>>>> upstream/master
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ContractItem } from '../../shared/interfaces/contracts-list-response';
import { ContractServiceService } from '../../shared/Services/contract-service.service';

@Component({
  selector: 'app-templates',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent {
  allContracts: ContractItem[] = [];
<<<<<<< HEAD
  activeContract!: ContractItem;
  searchQuery: string = '';
  hoveredContract: ContractItem | null = null;
=======
  activeContract: ContractItem | null = null;
  searchQuery: string = '';
  hoveredContract: ContractItem | null = null;
  isBrowser: boolean;
>>>>>>> upstream/master

  @ViewChildren('resumeImg') resumeImages!: QueryList<ElementRef>;

  constructor(
    private router: Router,
    private renderer: Renderer2,
<<<<<<< HEAD
    private contractService: ContractServiceService
  ) {
    this.loadContracts();
  }

  // **تحميل العقود من السيرفر**
=======
    private contractService: ContractServiceService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.loadContracts();
  }

  // تحميل العقود والتأكد من الروابط
>>>>>>> upstream/master
  loadContracts(): void {
    this.contractService.getContracts().subscribe({
      next: (res: ContractItem[]) => {
        this.allContracts = res;

        if (this.allContracts.length > 0) {
          this.activeContract = this.allContracts[0];
        }

<<<<<<< HEAD
        // ✅ فحص صلاحية الروابط
        // ✅ فحص صلاحية الروابط مع ترميز URL
        this.allContracts.forEach(contract => {
          const encodedUrl = encodeURI(contract.fileUrl); // ترميز الرابط بالكامل
          console.log('رابط العقد:', encodedUrl);

          fetch(encodedUrl)
            .then(resp => {
              if (!resp.ok) throw new Error('الرابط غير متاح!');
              console.log('العقد موجود ويمكن تحميله:', contract.title);
            })
            .catch(err => console.error('مشكلة في الرابط:', contract.title, err));
        });
=======
        // التحقق من الروابط فقط على المتصفح
        if (this.isBrowser) {
          this.allContracts.forEach(contract => {
            // تحويل الرابط لـ https لو هو http
            let url = contract.fileUrl;
            if (url.startsWith('http://')) {
              url = url.replace('http://', 'https://');
            }

            const encodedUrl = encodeURI(url);
            fetch(encodedUrl)
              .then(resp => {
                if (!resp.ok) throw new Error('الرابط غير متاح!');
                console.log('العقد موجود ويمكن تحميله:', contract.title);
              })
              .catch(err => console.error('مشكلة في الرابط:', contract.title, err));
          });
        }
>>>>>>> upstream/master
      },
      error: (err) => console.error('Error fetching contracts:', err)
    });
  }

<<<<<<< HEAD
  // **فلترة العقود حسب نص البحث**
  get filteredContracts(): ContractItem[] {
    const query = this.searchQuery.trim();
    if (!query) return this.allContracts;
    return this.allContracts.filter(contract =>
      contract.title.includes(query)
    );
  }

  // **اختيار عقد**
=======
  // الفلترة حسب البحث
  get filteredContracts(): ContractItem[] {
    const query = this.searchQuery.trim().toLowerCase();
    if (!query) return this.allContracts;
    return this.allContracts.filter(contract =>
      contract.title.toLowerCase().includes(query)
    );
  }

  // اختيار العقد النشط
>>>>>>> upstream/master
  selectContract(contract: ContractItem): void {
    this.activeContract = contract;
    this.toggleImages(contract.title);
  }

<<<<<<< HEAD
  // **تأثير Hover**
=======
  // عند مرور الماوس على العقد
>>>>>>> upstream/master
  onMouseEnter(contract: ContractItem): void {
    this.hoveredContract = contract;
    this.toggleImages(contract.title);
  }

  // عند مغادرة الماوس
  onMouseLeave(): void {
    this.hoveredContract = null;
    if (this.activeContract) this.toggleImages(this.activeContract.title);
  }

<<<<<<< HEAD
  // **تبديل الصور**
  toggleImages(contractTitle: string): void {
=======
  // إظهار صورة العقد النشط أو الحالي
  toggleImages(contractTitle: string): void {
    if (!this.isBrowser) return;

>>>>>>> upstream/master
    const id = this.contractToId(contractTitle);
    this.resumeImages.forEach((imgRef) => {
      const img = imgRef.nativeElement as HTMLElement;
      this.renderer.removeClass(img, 'show');
      if (img.id === id) {
        this.renderer.addClass(img, 'show');
      }
    });
  }

<<<<<<< HEAD
  // **تحويل العنوان إلى ID**
=======
  // تحويل اسم العقد إلى ID صالح
>>>>>>> upstream/master
  contractToId(contractTitle: string): string {
    return contractTitle.trim().replace(/\s+/g, '-');
  }

<<<<<<< HEAD
  // **استخدام العقد**
=======
  // استخدام العقد النشط
>>>>>>> upstream/master
  onUseContract(): void {
    const token = localStorage.getItem('userToken');

    if (token && this.activeContract) {
      this.router.navigate(['/contract-editor'], {
        queryParams: { title: this.activeContract.title }
      });
    } else {
      this.router.navigate(['/register']);
    }
  }
}
