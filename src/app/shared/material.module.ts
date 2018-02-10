import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
	MatToolbarModule,
	MatCardModule,
	MatInputModule,
	MatButtonModule,
	MatFormFieldModule,
	MatIconModule,
	MatDividerModule,
	MatSnackBarModule,
	MatMenuModule
} from '@angular/material';


@NgModule({
	imports: [ CommonModule ],
	exports: [
		FormsModule,
		ReactiveFormsModule,
		MatToolbarModule,
		MatCardModule,
		MatInputModule,
		MatButtonModule,
		MatFormFieldModule,
		MatIconModule,
		MatDividerModule,
		MatSnackBarModule,
		MatMenuModule
	]
})
export class MaterialModule {}
