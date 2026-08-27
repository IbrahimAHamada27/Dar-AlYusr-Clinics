import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';
import { DataService } from '../../core/services/data.service';
import { ArticleItem } from '../../core/models';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <!-- Hero Header -->
      <section style="background-color: var(--primary-light); padding: 4rem 0;">
        <div class="container" style="text-align: center; max-width: 800px;">
          <span class="section-subtitle">{{ lang.isRtl() ? 'التوعية والإرشاد' : 'Patient Health Education' }}</span>
          <h1 style="color: var(--primary-dark); margin-bottom: 1rem;">
            {{ lang.isRtl() ? 'المقالات والدلائل التثقيفية' : 'Health Articles & Medical Guides' }}
          </h1>
          <p style="font-size: 1.1rem; color: var(--text-muted);">
            {{ lang.isRtl()
              ? 'مقالات ودلائل توعوية موثقة للوقاية وتعزيز الصحة العامة.'
              : 'Evidence-based health articles and patient education guides for better wellness.' }}
          </p>
        </div>
      </section>

      <!-- Category Pills Bar -->
      <section class="section" style="padding-top: 2rem; padding-bottom: 1rem;">
        <div class="container">
          <div style="display: flex; gap: 0.75rem; flex-wrap: wrap; justify-content: center;">
            <button
              *ngFor="let cat of categories"
              (click)="selectedCategory = cat.en"
              [class]="selectedCategory === cat.en ? 'btn btn-primary btn-sm' : 'btn btn-outline btn-sm'"
            >
              {{ lang.isRtl() ? cat.ar : cat.en }}
            </button>
          </div>
        </div>
      </section>

      <!-- Articles Cards Grid -->
      <section class="section" style="padding-top: 1.5rem;">
        <div class="container">
          <div class="grid-3">
            <div
              *ngFor="let art of getFilteredArticles()"
              class="card card-hover"
              style="display: flex; flex-direction: column; justify-content: space-between; padding: 0; overflow: hidden;"
            >
              <!-- Cover Image -->
              <div style="height: 200px; width: 100%; overflow: hidden; position: relative;">
                <img
                  [src]="art.coverImage"
                  [alt]="lang.getText(art.title)"
                  style="width: 100%; height: 100%; object-fit: cover;"
                />
                <div style="position: absolute; top: 1rem;" [style.right]="lang.isRtl() ? '1rem' : 'auto'" [style.left]="lang.isRtl() ? 'auto' : '1rem'">
                  <span class="badge badge-teal" style="background-color: rgba(255,255,255,0.92);">
                    {{ lang.getText(art.category) }}
                  </span>
                </div>
              </div>

              <!-- Body Content -->
              <div style="padding: 1.5rem; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <div style="font-size: 0.825rem; color: var(--text-light); margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.75rem;">
                    <span style="display: inline-flex; align-items: center; gap: 0.25rem;">
                      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                      {{ lang.getText(art.author) }}
                    </span>
                    <span>•</span>
                    <span style="display: inline-flex; align-items: center; gap: 0.25rem;">
                      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      {{ art.readingTime }}
                    </span>
                  </div>

                  <h3 style="font-size: 1.2rem; margin-bottom: 0.75rem; line-height: 1.4; color: var(--primary-dark);">
                    {{ lang.getText(art.title) }}
                  </h3>

                  <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 1.25rem;">
                    {{ lang.getText(art.summary) }}
                  </p>
                </div>

                <button (click)="activeArticle = art" class="btn btn-navy btn-sm" style="width: 100%; justify-content: center;">
                  <span>{{ lang.isRtl() ? 'قراءة المقال' : 'Read Article' }}</span>
                  <svg *ngIf="!lang.isRtl()" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  <svg *ngIf="lang.isRtl()" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Full Article Reader Modal -->
      <div *ngIf="activeArticle" class="modal-overlay" (click)="activeArticle = null">
        <div class="modal-content" (click)="$event.stopPropagation()" style="max-width: 850px; max-height: 92vh; overflow-y: auto;">
          <button (click)="activeArticle = null" style="position: absolute; top: 1.25rem; background: none; border: none; cursor: pointer; z-index: 10;" [style.left]="lang.isRtl() ? '1.25rem' : 'auto'" [style.right]="lang.isRtl() ? 'auto' : '1.25rem'">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--primary-dark)" stroke-width="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>

          <!-- Medical Education Disclaimer Warning -->
          <div
            style="background-color: var(--accent-teal-light); border: 1px solid rgba(13, 148, 136, 0.3); border-radius: var(--radius-md); padding: 0.85rem 1rem; margin-bottom: 1.5rem; font-size: 0.85rem; color: var(--accent-teal-hover); display: flex; align-items: center; gap: 0.6rem;"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
            <span>
              {{ lang.isRtl()
                ? 'إخلاء مسؤولية: المقالات التثقيفية مخصصة للتوعية ولا تغني بأي حال عن الاستشارة والمتابعة الطبية المباشرة.'
                : 'Medical Disclaimer: Educational articles do not replace professional diagnosis or direct medical consultation.' }}
            </span>
          </div>

          <div style="display: flex; gap: 0.5rem; margin-bottom: 0.75rem;">
            <span class="badge badge-teal">{{ lang.getText(activeArticle.category) }}</span>
            <span class="badge badge-navy">{{ activeArticle.readingTime }} read</span>
          </div>

          <h1 style="font-size: 1.8rem; color: var(--primary-dark); margin-bottom: 0.75rem; line-height: 1.3;">
            {{ lang.getText(activeArticle.title) }}
          </h1>

          <div style="font-size: 0.88rem; color: var(--text-light); margin-bottom: 1.5rem;">
            By {{ lang.getText(activeArticle.author) }} • Published on {{ activeArticle.date }}
          </div>

          <!-- Cover Photo -->
          <div style="border-radius: var(--radius-md); overflow: hidden; margin-bottom: 2rem; max-height: 350px;">
            <img
              [src]="activeArticle.coverImage"
              [alt]="lang.getText(activeArticle.title)"
              style="width: 100%; height: 100%; object-fit: cover; display: block;"
            />
          </div>

          <!-- Article Content Render -->
          <div
            style="font-size: 1.05rem; line-height: 1.85; color: var(--text-main); white-space: pre-line; margin-bottom: 2rem;"
          >
            {{ lang.getText(activeArticle.content) }}
          </div>

          <!-- References -->
          <div *ngIf="activeArticle.references && activeArticle.references.length > 0" style="background-color: var(--bg-alt); padding: 1.25rem; border-radius: var(--radius-md); margin-bottom: 2rem;">
            <h4 style="margin-bottom: 0.5rem; color: var(--primary-dark);">
              {{ lang.isRtl() ? 'المراجع والمصادر الطبية:' : 'Medical References:' }}
            </h4>
            <ul style="padding-left: 1.25rem; font-size: 0.88rem; color: var(--text-muted);">
              <li *ngFor="let ref of activeArticle.references">{{ ref }}</li>
            </ul>
          </div>

          <button (click)="activeArticle = null" class="btn btn-outline btn-sm" style="width: 100%; justify-content: center;">
            {{ lang.isRtl() ? 'إغلاق' : 'Close' }}
          </button>
        </div>
      </div>
    </div>
  `
})
export class ArticlesComponent {
  lang = inject(LanguageService);
  data = inject(DataService);

  selectedCategory = 'ALL';
  activeArticle: ArticleItem | null = null;

  categories = [
    { en: 'ALL', ar: 'الكل' },
    { en: 'Obstetrics & Gynecology', ar: 'النساء والتوليد' },
    { en: 'Anatomy & Embryology', ar: 'التشريح وعلم الأجنة' },
    { en: 'Reproductive Health', ar: 'الصحة الإنجابية' },
    { en: 'Histology & Cellular Science', ar: 'علوم الأنسجة والخلية' }
  ];

  getFilteredArticles(): ArticleItem[] {
    const articles = this.data.getArticles();
    if (this.selectedCategory === 'ALL') return articles;
    return articles.filter(a => a.category.en === this.selectedCategory);
  }
}
