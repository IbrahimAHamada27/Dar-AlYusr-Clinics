import { Component, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';
import { DataService } from '../../core/services/data.service';
import { ArticleItem } from '../../core/models';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section style="background-color: var(--primary-light); padding: 3.5rem 0;">
      <div className="container" style="text-align: center; max-width: 800px;">
        <span className="section-subtitle">{{ lang.ui().articles }}</span>
        <h1 className="section-title">{{ lang.isRtl() ? 'المقالات الطبية والتوعية الصحية' : 'Medical Blog & Patient Education' }}</h1>
      </div>
    </section>

    <section style="padding: 5rem 0;">
      <div className="container">
        <!-- Article Detail View if selected -->
        <div *ngIf="selectedArticle" className="card" style="padding: 2.5rem; max-width: 900px; margin: 0 auto;">
          <button (click)="selectedArticle = null" className="btn btn-outline btn-sm" style="margin-bottom: 1.5rem;">
            ← {{ lang.isRtl() ? 'العودة لقائمة المقالات' : 'Back to Articles' }}
          </button>

          <span style="background-color: var(--accent-teal-light); color: var(--accent-teal); padding: 0.3rem 0.85rem; border-radius: var(--radius-full); font-weight: 700; font-size: 0.85rem; display: inline-block; margin-bottom: 1rem;">
            {{ lang.getText(selectedArticle.category) }}
          </span>

          <h2 style="font-size: 2rem; color: var(--primary-dark); font-weight: 800; margin-bottom: 1rem; line-height: 1.3;">
            {{ lang.getText(selectedArticle.title) }}
          </h2>

          <div style="display: flex; gap: 1.5rem; font-size: 0.9rem; color: var(--text-muted); margin-bottom: 2rem; border-bottom: 1px solid var(--border-light); padding-bottom: 1rem;">
            <span>{{ lang.getText(selectedArticle.author) }}</span>
            <span>•</span>
            <span>{{ selectedArticle.date }}</span>
            <span>•</span>
            <span>{{ selectedArticle.readingTime }}</span>
          </div>

          <div style="font-size: 1.1rem; color: var(--text-main); line-height: 1.85; white-space: pre-line;">
            {{ lang.getText(selectedArticle.content) }}
          </div>

          <!-- Medical Disclaimer Box -->
          <div style="margin-top: 3rem; background-color: var(--bg-alt); padding: 1.25rem; border-radius: var(--radius-md); font-size: 0.88rem; color: var(--text-muted);">
            <strong>{{ lang.ui().medicalDisclaimer }}:</strong> {{ lang.getText(data.getSettings().disclaimerNotice) }}
          </div>
        </div>

        <!-- Articles Grid List -->
        <div *ngIf="!selectedArticle" className="grid-2" style="gap: 2rem;">
          <div *ngFor="let article of data.getArticles()" className="card" style="padding: 2rem; display: flex; flex-direction: column;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
              <span style="background-color: var(--accent-teal-light); color: var(--accent-teal); padding: 0.25rem 0.75rem; border-radius: var(--radius-full); font-weight: 700; font-size: 0.825rem;">
                {{ lang.getText(article.category) }}
              </span>
              <span style="font-size: 0.85rem; color: var(--text-muted);">{{ article.readingTime }}</span>
            </div>

            <h3 style="font-size: 1.3rem; color: var(--primary-dark); font-weight: 800; margin-bottom: 1rem; line-height: 1.35;">
              {{ lang.getText(article.title) }}
            </h3>

            <p style="font-size: 0.95rem; color: var(--text-muted); line-height: 1.65; margin-bottom: 1.5rem; flex: 1;">
              {{ lang.getText(article.summary) }}
            </p>

            <button (click)="selectedArticle = article" className="btn btn-outline btn-sm" style="align-self: flex-start;">
              <span>{{ lang.ui().readMore }}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  `
})
export class ArticlesComponent {
  lang = inject(LanguageService);
  data = inject(DataService);

  selectedArticle: ArticleItem | null = null;
}
