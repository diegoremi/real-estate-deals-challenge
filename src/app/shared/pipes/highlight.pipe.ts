import { Pipe, PipeTransform } from '@angular/core';

export interface HighlightSegment {
  readonly text: string;
  readonly match: boolean;
}

@Pipe({
  name: 'highlight',
  standalone: true,
})
export class HighlightPipe implements PipeTransform {
  transform(value: string, searchTerm: string): HighlightSegment[] {
    const normalizedSearchTerm = searchTerm.trim();

    if (!normalizedSearchTerm) {
      return [{ text: value, match: false }];
    }

    const escapedSearchTerm = normalizedSearchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    const regex = new RegExp(`(${escapedSearchTerm})`, 'gi');

    return value
      .split(regex)
      .filter(Boolean)
      .map((text) => ({
        text,
        match: text.toLowerCase() === normalizedSearchTerm.toLowerCase(),
      }));
  }
}
