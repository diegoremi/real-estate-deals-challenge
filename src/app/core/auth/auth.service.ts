import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly storageKey = 'termsheet_authenticated';

  public login(username: string, password: string): boolean {
    const isValid = username === 'admin' && password === 'password';
    if (isValid) {
      sessionStorage.setItem(this.storageKey, 'true');
    }
    return isValid;
  }

  public logout(): void {
    sessionStorage.removeItem(this.storageKey);
  }

  isAuthenticated(): boolean {
    return sessionStorage.getItem(this.storageKey) === 'true';
  }
}
