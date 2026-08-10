import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../../core/services/language.service';
import { DataService } from '../../core/services/data.service';
import { PublicationItem } from '../../core/models';

@Component({
  selector: 'app-publications',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div>
      <!-- Hero Header -->
      <section style="background-color: var(--primary-light); padding: 4rem 0;">
        <div className="container" style="text-align: center; max-width: 800px;">
          <span className="section-subtitle">{{ lang.isRtl() ? 'الأبحاث والمنشورات' : 'Peer-Reviewed Literature' }}</span>
          <h1 style="color: var(--primary-dark); margin-bottom: 1rem;">
            {{ lang.isRtl() ? 'المنشورات والأبحاث العلمية' : 'Publications & Research Output' }}
          </h1>
          <p style="font-size: 1.1rem; color: var(--text-muted);">
            {{ lang.isRtl() ? 'أبحاث سريرية محكمة في المجلات الطبية الدولية.' : 'Peer-reviewed research articles published in index-listed medical journals.' }}
          </p>
        </div>
      </section>

      <!-- Filter Controls Bar -->
      <section style="padding: 2rem 0; background-color: var(--bg-alt); border-bottom: 1px solid var(--border-light);">
        <div className="container">
          <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
            <!-- Search Bar -->
            <div style="flex: 2 1 260px;">
              <input
                type="text"
                [(ngModel)]="searchTerm"
                className="input-field"
                [placeholder]="lang.isRtl() ? 'بحث في الأبحاث والكلمات المفتاحية...' : 'Search title, abstract, keywords...'"
              />
            </div>

            <!-- Year Filter -->
            <div style="flex: 1 1 180px;">
              <select [(ngModel)]="selectedYear" className="input-field">
                <option value="ALL">{{ lang.isRtl() ? 'جميع السنوات' : 'All Years' }}</option>
                <option *ngFor="let y of years" [value]="y">{{ y }}</option>
              </select>
            </div>

            <!-- Type Filter -->
            <div style="flex: 1 1 180px;">
              <select [(ngModel)]="selectedType" className="input-field">
                <option value="ALL">{{ lang.isRtl() ? 'جميع الأنواع' : 'All Types' }}</option>
                <option *ngFor="let t of types" [value]="t">{{ t }}</option>
              </select>
            </div>

            <!-- Clear Button -->
            <button
              *ngIf="searchTerm || selectedYear !== 'ALL' || selectedType !== 'ALL'"
              (click)="searchTerm = ''; selectedYear = 'ALL'; selectedType = 'ALL';"
              className="btn btn-outline btn-sm"
            >
              {{ lang.isRtl() ? 'مسح الفلاتر' : 'Clear Filters' }}
            </button>
          </div>
        </div>
      </section>

      <!-- Publications List -->
      <section className="section" style="padding-top: 2rem;">
        <div className="container">
          <div style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 1.5rem;">
            {{ lang.isRtl() ? 'تم العثور على ' + getFilteredPubs().length + ' بحث علمي' : 'Showing ' + getFilteredPubs().length + ' research publications' }}
          </div>

          <div style="display: flex; flex-direction: column; gap: 1.5rem;">
            <div
              *ngFor="let pub of getFilteredPubs()"
              className="card card-hover"
              style="display: flex; flex-direction: column; gap: 0.75rem;"
            >
              <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem;">
                <div style="display: flex; gap: 0.5rem;">
                  <span className="badge badge-teal">{{ pub.type }}</span>
                  <span className="badge badge-navy">{{ pub.year }}</span>
                </div>
                <span style="font-size: 0.85rem; color: var(--text-light); font-family: monospace;">
                  DOI: {{ pub.doi }}
                </span>
              </div>

              <h3 style="font-size: 1.3rem; color: var(--primary-dark);">
                {{ lang.getText(pub.title) }}
              </h3>

              <div style="font-size: 0.92rem; color: var(--accent-teal); font-weight: 600;">
                ✍️ {{ pub.authors }} — <em style="color: var(--primary-dark);">{{ pub.journal }}</em>
              </div>

              <p style="font-size: 0.95rem; color: var(--text-muted); line-height: 1.6;">
                {{ lang.getText(pub.abstract) }}
              </p>

              <!-- Keywords Tags -->
              <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 0.25rem;">
                <span *ngFor="let kw of pub.keywords" style="font-size: 0.78rem; background-color: var(--bg-alt); padding: 0.2rem 0.6rem; border-radius: 4px; color: var(--text-muted);">
                  #{{ kw }}
                </span>
              </div>

              <div style="display: flex; gap: 0.75rem; margin-top: 0.5rem;">
                <button (click)="selectedPub = pub" className="btn btn-navy btn-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10"/><path d="M6 10h10"/></svg>
                  <span>{{ lang.isRtl() ? 'عرض البحث' : 'View Publication' }}</span>
                </button>

                <a *ngIf="pub.pdfUrl" [href]="pub.pdfUrl" target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
                  <span>DOI Link</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Publication Detail Modal -->
      <div *ngIf="selectedPub" className="modal-overlay" (click)="selectedPub = null">
        <div className="modal-content" (click)="$event.stopPropagation()" style="max-width: 750px;">
          <button (click)="selectedPub = null" style="position: absolute; top: 1.25rem; background: none; border: none; cursor: pointer;" [style.left]="lang.isRtl() ? '1.25rem' : 'auto'" [style.right]="lang.isRtl() ? 'auto' : '1.25rem'">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary-dark)" stroke-width="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>

          <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
            <span className="badge badge-teal">{{ selectedPub.type }}</span>
            <span className="badge badge-navy">{{ selectedPub.year }}</span>
          </div>

          <h2 style="font-size: 1.45rem; margin-bottom: 0.75rem; color: var(--primary-dark);">
            {{ lang.getText(selectedPub.title) }}
          </h2>

          <div style="font-size: 0.95rem; color: var(--accent-teal); font-weight: 700; margin-bottom: 0.5rem;">
            {{ selectedPub.authors }}
          </div>
          <div style="font-size: 0.95rem; font-style: italic; margin-bottom: 1.25rem; color: var(--primary-dark);">
            Published in: {{ selectedPub.journal }} ({{ selectedPub.year }})
          </div>

          <div style="background-color: var(--bg-alt); padding: 1.25rem; border-radius: var(--radius-md); margin-bottom: 1.5rem;">
            <h4 style="margin-bottom: 0.5rem; color: var(--primary-dark);">
              {{ lang.isRtl() ? 'الملخص الطبي (Abstract):' : 'Abstract:' }}
            </h4>
            <p style="font-size: 0.95rem; line-height: 1.7; color: var(--text-muted);">
              {{ lang.getText(selectedPub.abstract) }}
            </p>
          </div>

          <div style="margin-bottom: 1.5rem;">
            <h4 style="font-size: 0.9rem; margin-bottom: 0.4rem; color: var(--primary-dark);">Keywords:</h4>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
              <span *ngFor="let kw of selectedPub.keywords" className="badge badge-navy">
                {{ kw }}
              </span>
            </div>
          </div>

          <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
            <a *ngIf="selectedPub.pdfUrl" [href]="selectedPub.pdfUrl" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
              <span>{{ lang.isRtl() ? 'عرض الورقة بموقع المجلة' : 'Read Publisher Article' }}</span>
            </a>
            <button (click)="selectedPub = null" className="btn btn-outline btn-sm">
              {{ lang.isRtl() ? 'إغلاق' : 'Close' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class PublicationsComponent {
  lang = inject(LanguageService);
  data = inject(DataService);

  searchTerm = '';
  selectedYear = 'ALL';
  selectedType = 'ALL';
  selectedPub: PublicationItem | null = null;

  years = [2023, 2022, 2021, 2020];
  types = ['Original Research', 'Review Article', 'Clinical Study', 'Case Report'];

  getFilteredPubs(): PublicationItem[] {
    return this.data.getPublications().filter(pub => {
      const matchesSearch = !this.searchTerm ||
        this.lang.getText(pub.title).toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        this.lang.getText(pub.abstract).toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        pub.keywords.some(k => k.toLowerCase().includes(this.searchTerm.toLowerCase()));

      const matchesYear = this.selectedYear === 'ALL' || pub.year.toString() === this.selectedYear;
      const matchesType = this.selectedType === 'ALL' || pub.type === this.selectedType;

      return matchesSearch && matchesYear && matchesType;
    });
  }
}
