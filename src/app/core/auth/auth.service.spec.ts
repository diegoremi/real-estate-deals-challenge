import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    sessionStorage.clear();
    service = new AuthService();
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  it('should authenticate with valid credentials', () => {
    const authenticated = service.login('demo@termsheet.com', 'termsheet123');

    expect(authenticated).toBeTrue();
    expect(service.isAuthenticated()).toBeTrue();
  });

  it('should reject invalid credentials', () => {
    const authenticated = service.login('demo@termsheet.com', 'wrong-password');

    expect(authenticated).toBeFalse();
    expect(service.isAuthenticated()).toBeFalse();
  });

  it('should log the user out', () => {
    service.login('demo@termsheet.com', 'termsheet123');

    service.logout();

    expect(service.isAuthenticated()).toBeFalse();
  });
});
