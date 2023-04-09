import { getMeFn } from "@/api/authApi";
import type { NavigationGuardNext } from "vue-router";

export default async function requireAuth({
    next,
    authStore,
}: {
    next: NavigationGuardNext;
    authStore: any;
}) {
  try {
      const respone = await getMeFn();
      const user = respone.data.user;
      authStore.setAuthUser(user);

      if (!user) {
          return next({
              name: 'login',
          });
      }
  } catch (error) {
      document.location.href = '/login';
  }

  return next();
}
