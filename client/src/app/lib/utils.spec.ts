import { getStatusText } from './utils';

describe('getStatusText', () => {
  it('should return "Completed" when completed is true', () => {
    const completed = true;
    const result = getStatusText(completed);
    expect(result).toBe('Completed');
  });

  it('should return "Incompleted" when completed is false', () => {
    const completed = false;
    const result = getStatusText(completed);
    expect(result).toBe('Incompleted');
  });
});
