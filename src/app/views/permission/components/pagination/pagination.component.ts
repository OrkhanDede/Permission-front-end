import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface PaginationValue {
  page: number;
  pageSize: number;
}
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit, OnChanges {
  public totalPages: number = 0;
  public visiblePages: number[] = [];

  @Input() value: PaginationValue = { page: 1, pageSize: 10 };
  @Input() total = 10;
  @Input() visibleRangeLength = 5;
  @Output() onChange: EventEmitter<PaginationValue> = new EventEmitter();

  ngOnInit(): void {
    this.updateVisiblePages();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['total'] || changes['value']) {
      this.updateTotalPages();
      this.updateVisiblePages();
    }
  }
  public selectPage(page: number): void {
    this.value = { ...this.value, page };
    this.updateVisiblePages();
    this.onChange.emit(this.value);
  }
  private updateVisiblePages(): void {
    if (this.totalPages) {
      const length = Math.min(this.totalPages, this.visibleRangeLength);

      const startIndex = Math.max(
        Math.min(
          this.value.page - Math.ceil(length / 2),
          this.totalPages - length
        ),
        0
      );

      this.visiblePages = Array.from(
        new Array(length).keys(),
        (item) => item + startIndex + 1
      );
    }
  }

  private updateTotalPages(): void {
    this.totalPages = Math.ceil(this.total / this.value.pageSize);
  }
}
