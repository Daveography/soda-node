import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SodaClient } from './client';
import { HttpClientModule, HttpClient } from '@angular/common/http';

export * from "./client";
export * from "./datatypes";
export * from "./soql-query";

@NgModule({
  imports: [CommonModule, HttpClientModule],
  exports: [HttpClientModule]
})
export class SodaClientModule {
  static forRoot(): ModuleWithProviders<SodaClientModule> {
    return {
      ngModule: SodaClientModule,
      providers: [
        SodaClient
      ],
    };
  }
}
