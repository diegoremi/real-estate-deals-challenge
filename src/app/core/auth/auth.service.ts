import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly storageKey = 'deal_manager_authenticated';

  login(username: string, password: string): boolean {
    const isValid = username === 'demo@example.com' && password === 'demo1234';

    if (isValid) {
      sessionStorage.setItem(this.storageKey, 'true');
    }

    return isValid;
  }

  logout(): void {
    sessionStorage.removeItem(this.storageKey);
  }

  isAuthenticated(): boolean {
    return sessionStorage.getItem(this.storageKey) === 'true';
  }
}
