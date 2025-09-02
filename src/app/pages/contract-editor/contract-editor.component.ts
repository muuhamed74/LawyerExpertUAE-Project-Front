import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ActivatedRoute } from '@angular/router';
import * as mammoth from 'mammoth';
import { ContractServiceService } from '../../shared/Services/contract-service.service';
import { ContractItem } from '../../shared/interfaces/contracts-list-response';

@Component({
  selector: 'app-contract-editor',
  standalone: true,
  imports: [CommonModule, AngularEditorModule, FormsModule],
  templateUrl: './contract-editor.component.html',
  styleUrls: ['./contract-editor.component.css']
})
export class ContractEditorComponent implements OnInit {
  htmlContent: string = '';
  activeTitle: string = '';
  activeContract!: ContractItem | null;
  isBrowser: boolean;

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '250px',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    toolbarPosition: 'top',
    defaultFontName: 'Arial',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'tahoma', name: 'Tahoma' }
    ],
    sanitize: false
  };

  constructor(
    private route: ActivatedRoute,
    private contractService: ContractServiceService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (!this.isBrowser) return; // ما ننفذش على السيرفر

    this.route.queryParams.subscribe(params => {
      const title = params['title'];
      if (title) {
        this.loadContractByTitle(title);
      }
    });
  }

  loadContractByTitle(title: string): void {
    if (!this.isBrowser) return;

    this.contractService.getContracts().subscribe({
      next: (contracts: ContractItem[]) => {
        const contract = contracts.find(c => c.title === title);
        if (contract) {
          this.activeContract = contract;
          this.activeTitle = contract.title;

          fetch(contract.fileUrl)
            .then(response => response.arrayBuffer())
            .then(buffer => {
              mammoth.convertToHtml({ arrayBuffer: buffer })
                .then(result => {
                  this.htmlContent = result.value;
                })
                .catch(err => console.error('Error parsing DOCX:', err));
            })
            .catch(err => console.error('Error fetching DOCX:', err));
        } else {
          console.error('Contract not found for title:', title);
        }
      },
      error: (err) => console.error('Error fetching contracts:', err)
    });
  }

  downloadPdf() {
    if (!this.isBrowser) return;

    import('html2canvas').then(html2canvas => {
      import('jspdf').then(jsPDF => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = this.htmlContent;
        tempDiv.style.direction = 'rtl';
        tempDiv.style.fontFamily = 'Cairo, sans-serif';
        tempDiv.style.padding = '20px';
        tempDiv.style.width = '800px';
        tempDiv.style.background = '#fff';
        document.body.appendChild(tempDiv);

        html2canvas.default(tempDiv, { scale: 2, useCORS: true }).then(canvas => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF.default('p', 'mm', 'a4');

          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = pdf.internal.pageSize.getHeight();
          const marginX = 10;
          const contentWidth = pdfWidth - marginX * 2;
          const contentHeight = (canvas.height * contentWidth) / canvas.width;

          let position = 0;
          let heightLeft = contentHeight;
          let pageHeight = pdfHeight - 20;

          while (heightLeft > 0) {
            pdf.addImage(imgData, 'PNG', marginX, position + 10, contentWidth, contentHeight);
            heightLeft -= pageHeight;
            position -= pageHeight;

            if (heightLeft > 0) {
              pdf.addPage();
              position = 0;
            }
          }

          pdf.save(`${this.activeTitle || 'contract'}.pdf`);
          document.body.removeChild(tempDiv);
        });
      });
    });
  }
}
