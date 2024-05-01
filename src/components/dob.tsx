'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

let days: string[] = [];

for (let i = 1; i <= 31; i++) {
  const formattedNumber = i < 10 ? `0${i}` : `${i}`;
  days.push(formattedNumber);
}
let years: number[] = [];

for (let year = 2024; year >= 1990; year--) {
  years.push(year);
}
export function DOB({
  setMonth,
  setDay,
  setYear,
}: {
  setMonth: (month: string) => void;
  setYear: (year: string) => void;
  setDay: (day: string) => void;
}) {
  return (
    <div className="flex p-0 space-x-2 md:space-x-4">
      <Select
        name="month"
        onValueChange={(e) => {
          setMonth(e);
        }}
      >
        <SelectTrigger className="h-12 ">
          <SelectValue placeholder="Month" />
        </SelectTrigger>
        <SelectContent>
          {months.map((month, index) => (
            <SelectItem
              value={index < 9 ? `0${index + 1}` : String(index + 1)}
              key={month}
            >
              {month}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        name="day"
        onValueChange={(e) => {
          setDay(e);
        }}
      >
        <SelectTrigger className="h-12">
          <SelectValue placeholder="Day" />
        </SelectTrigger>
        <SelectContent>
          {days.map((day) => (
            <SelectItem value={day} key={day}>
              {day}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        name="year"
        onValueChange={(e) => {
          setYear(e);
        }}
      >
        <SelectTrigger className="h-12">
          <SelectValue placeholder="Year" />
        </SelectTrigger>
        <SelectContent>
          {years &&
            years.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  );
}
