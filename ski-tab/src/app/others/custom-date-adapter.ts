import { NativeDateAdapter } from '@angular/material/core';
import { Injectable } from '@angular/core';

/** Adapts the native JS Date for use with cdk-based components that work with dates. */
@Injectable()
export class CustomDateAdapter extends NativeDateAdapter {

  override getFirstDayOfWeek(): number {
    return 1;
  }
}