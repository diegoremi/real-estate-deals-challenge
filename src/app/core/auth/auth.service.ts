import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly storageKey = 'termsheet_authenticated';

  login(username: string, password: string): boolean {
    const isValid =
      username === 'demo@termsheet.com' && password === 'termsheet123';

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
