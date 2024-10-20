import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { inject } from '@angular/core';
import { Filter } from '../../../common/interface/Filter';
import moment from 'moment';

export const routerParamsGuard: CanActivateFn = (route: ActivatedRouteSnapshot,
                                                 state: RouterStateSnapshot) => {
  const router = inject(Router);
  const activatedRoute = inject(ActivatedRoute);

  const { title, author, startDate, endDate, page, pageSize } = route.queryParams;

  const missingParams = !endDate || !page || !pageSize;

  if(missingParams) {
    const filter: Filter = {
      title: title,
      author: author,
      startDate: startDate,
      endDate: endDate ?? moment().format('YYYYMM'),
      page: page ?? 0,
      pageSize: pageSize ?? 10
    };

    router.navigate([], {
      relativeTo: activatedRoute,
      queryParams: filter,
      queryParamsHandling: 'merge'
    }).catch(console.error);

    return false;
  }

  return true;
};
