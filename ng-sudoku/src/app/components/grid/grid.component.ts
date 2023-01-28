import { Component } from '@angular/core';

export type Group = Cell[];

export interface Cell {
  id: number;
  value: number | null;
  highlighted: boolean;
  stats: Array<{ value: number, stat: number }>;
  row: Group;
  column: Group;
  square: Group;
}

const DEFAULT = [
  null,
  null,
  3,
  9,
  null,
  6,
  7,
  null,
  1,
  1,
  6,
  null,
  5,
  null,
  null,
  null,
  null,
  null,
  null,
  5,
  null,
  1,
  null,
  null,
  null,
  9,
  null,
  null,
  4,
  null,
  3,
  null,
  1,
  null,
  null,
  6,
  2,
  null,
  null,
  null,
  null,
  9,
  null,
  3,
  null,
  null,
  null,
  null,
  null,
  null,
  7,
  null,
  null,
  5,
  null,
  8,
  7,
  null,
  null,
  null,
  null,
  null,
  4,
  null,
  null,
  2,
  null,
  null,
  null,
  3,
  6,
  null,
  5,
  null,
  6,
  null,
  null,
  null,
  8,
  null,
  9
];

@Component({
  selector: 'sud-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent {
  subSize = 3;
  size = Math.pow(this.subSize, 2);
  cells: Cell[] = new Array<number | null>(Math.pow(this.size, 2)).fill(null).map((_v, i) => ({
    id: i,
    value: null,
    highlighted: false,
    stats: new Array(this.size).fill(0).map((_v, i) => ({ value: i + 1, stat: 1 })),
    row: [], column: [], square: []
  }));

  rows: Group[] = new Array(this.size).fill([]).map(() => [] as Cell[]);
  columns: Group[] = new Array(this.size).fill([]).map(() => [] as Cell[]);
  square: Group[] = new Array(this.size).fill([]).map(() => [] as Cell[]);

  constructor() {
    this.cells.forEach(cell => {
      const row = this.rows[Math.floor(cell.id / this.size)];
      row.push(cell);
      cell.row = row;
      const column = this.columns[cell.id % this.size];
      column.push(cell);
      cell.column = column;
      const squareIndex = Math.floor((cell.id % this.size) / this.subSize) + (Math.floor(cell.id / (this.subSize * this.size)) * this.subSize)
      const square = this.square[squareIndex];
      cell.square = square;
      square.push(cell);
    })

    DEFAULT.forEach((v, i) => {
      if (v !== null) {
        this.selectValue(i, v)
      }
    })
  }

  public trackById(index: number, item: Cell): number {
    return item.id
  }

  public selectValue(id: number, value: number): void {
    if (this.cells[id].stats[value - 1].stat > 0) {
      this.cells[id].value = value;
      this.cells[id].row.forEach(cell => cell.stats[value - 1].stat = 0)
      this.cells[id].column.forEach(cell => cell.stats[value - 1].stat = 0)
      this.cells[id].square.forEach(cell => cell.stats[value - 1].stat = 0)
    }
    console.log(this.cells.map(cell => cell.value))
  }

  public onMouseEnter(id: number): void {
    this.cells[id].row.forEach(cell => cell.highlighted = true);
    this.cells[id].column.forEach(cell => cell.highlighted = true);
    this.cells[id].square.forEach(cell => cell.highlighted = true);
  }

  public onMouseLeave(id: number): void {
    this.cells[id].row.forEach(cell => cell.highlighted = false);
    this.cells[id].column.forEach(cell => cell.highlighted = false);
    this.cells[id].square.forEach(cell => cell.highlighted = false);
  }
}
