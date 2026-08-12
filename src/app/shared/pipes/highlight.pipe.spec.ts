import { HighlightPipe } from './highlight.pipe';

describe('HighlightPipe', () => {
  let pipe: HighlightPipe;

  beforeEach(() => {
    pipe = new HighlightPipe();
  });

  it('should return the original text when search term is empty', () => {
    const result = pipe.transform('Riverside Commons', '');

    expect(result).toEqual([
      {
        text: 'Riverside Commons',
        match: false,
      },
    ]);
  });

  it('should highlight matches case-insensitively', () => {
    const result = pipe.transform('Riverside Commons', 'river');

    expect(result).toEqual([
      {
        text: 'River',
        match: true,
      },
      {
        text: 'side Commons',
        match: false,
      },
    ]);
  });

  it('should highlight multiple matches', () => {
    const result = pipe.transform('Nice deal with a nice location', 'nice');

    expect(result).toEqual([
      {
        text: 'Nice',
        match: true,
      },
      {
        text: ' deal with a ',
        match: false,
      },
      {
        text: 'nice',
        match: true,
      },
      {
        text: ' location',
        match: false,
      },
    ]);
  });

  it('should safely handle regex special characters', () => {
    const result = pipe.transform('Deal 1.0 - Building A', '.');

    expect(result).toEqual([
      {
        text: 'Deal 1',
        match: false,
      },
      {
        text: '.',
        match: true,
      },
      {
        text: '0 - Building A',
        match: false,
      },
    ]);
  });

  it('should ignore surrounding whitespace in the search term', () => {
    const result = pipe.transform('Cedar Point Apartments', '  point  ');

    expect(result).toEqual([
      {
        text: 'Cedar ',
        match: false,
      },
      {
        text: 'Point',
        match: true,
      },
      {
        text: ' Apartments',
        match: false,
      },
    ]);
  });
});
