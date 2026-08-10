import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-social-media',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section style="background-color: var(--primary-light); padding: 3.5rem 0;">
      <div className="container" style="text-align: center; max-width: 800px;">
        <span className="section-subtitle">{{ lang.ui().socialMedia }}</span>
        <h1 className="section-title">{{ lang.isRtl() ? 'منصات التواصل والبروفايل الأكاديمي' : 'Social Profiles & Academic Networks' }}</h1>
      </div>
    </section>

    <section style="padding: 5rem 0;">
      <div className="container">
        <div className="grid-2" style="gap: 2rem;">
          <div *ngFor="let item of data.socialLinks()" className="card" style="padding: 2rem; display: flex; align-items: center; justify-content: space-between; gap: 1.5rem;">
            <div>
              <h3 style="font-size: 1.3rem; color: var(--primary-dark); font-weight: 800; margin-bottom: 0.5rem;">
                {{ item.platform }}
              </h3>
              <p *ngIf="item.description" style="font-size: 0.95rem; color: var(--text-muted);">
                {{ lang.getText(item.description) }}
              </p>
            </div>

            <a [href]="item.url" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm" style="flex-shrink: 0;">
              <span>{{ lang.isRtl() ? 'زيارة الرابط' : 'Visit Profile' }}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  `
})
export class SocialMediaComponent {
  lang = inject(LanguageService);
  data = inject(DataService);
}
