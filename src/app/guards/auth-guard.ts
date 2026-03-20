// guards/auth.guard.ts
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('tk');

  if (token) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};