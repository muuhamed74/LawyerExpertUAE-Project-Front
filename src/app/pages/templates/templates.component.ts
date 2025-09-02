import {
  Component,
  ElementRef,
  ViewChildren,
  QueryList,
  Renderer2,
  Inject,
  PLATFORM_ID
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
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
  activeContract: ContractItem | null = null;
  searchQuery: string = '';
  hoveredContract: ContractItem | null = null;
  isBrowser: boolean;

  @ViewChildren('resumeImg') resumeImages!: QueryList<ElementRef>;

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private contractService: ContractServiceService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.loadContracts();
  }

  loadContracts(): void {
    this.contractService.getContracts().subscribe({
      next: (res: ContractItem[]) => {
        this.allContracts = res;

        if (this.allContracts.length > 0) {
          this.activeContract = this.allContracts[0];
        }

        // فقط على المتصفح
        if (this.isBrowser) {
          this.allContracts.forEach(contract => {
            const encodedUrl = encodeURI(contract.fileUrl);
            fetch(encodedUrl)
              .then(resp => {
                if (!resp.ok) throw new Error('الرابط غير متاح!');
                console.log('العقد موجود ويمكن تحميله:', contract.title);
              })
              .catch(err => console.error('مشكلة في الرابط:', contract.title, err));
          });
        }
      },
      error: (err) => console.error('Error fetching contracts:', err)
    });
  }

  get filteredContracts(): ContractItem[] {
    const query = this.searchQuery.trim().toLowerCase();
    if (!query) return this.allContracts;
    return this.allContracts.filter(contract =>
      contract.title.toLowerCase().includes(query)
    );
  }

  selectContract(contract: ContractItem): void {
    this.activeContract = contract;
    this.toggleImages(contract.title);
  }

  onMouseEnter(contract: ContractItem): void {
    this.hoveredContract = contract;
    this.toggleImages(contract.title);
  }

  onMouseLeave(): void {
    this.hoveredContract = null;
    if (this.activeContract) this.toggleImages(this.activeContract.title);
  }

  toggleImages(contractTitle: string): void {
    if (!this.isBrowser) return; // حماية من SSR

    const id = this.contractToId(contractTitle);
    this.resumeImages.forEach((imgRef) => {
      const img = imgRef.nativeElement as HTMLElement;
      this.renderer.removeClass(img, 'show');
      if (img.id === id) {
        this.renderer.addClass(img, 'show');
      }
    });
  }

  contractToId(contractTitle: string): string {
    return contractTitle.trim().replace(/\s+/g, '-');
  }

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
