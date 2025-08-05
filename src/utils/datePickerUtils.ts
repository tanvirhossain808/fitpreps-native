// Date picker utilities matching web checkout.js functionality

// Define specific holidays - make sure months are 0-indexed
const specificHolidays = [
  { year: 2024, month: 3, day: 21 }, // April 21, 2024
  { year: 2025, month: 3, day: 21 }, // April 21, 2025
  { year: 2024, month: 4, day: 5 },  // May 5, 2024
  { year: 2025, month: 4, day: 5 },  // May 5, 2025
  { year: 2024, month: 4, day: 29 }, // May 29, 2024
  { year: 2025, month: 4, day: 29 }, // May 29, 2025
  { year: 2024, month: 5, day: 9 },  // June 9, 2024
  { year: 2025, month: 5, day: 9 }   // June 9, 2025
];

// Function to check if a date matches any of the specific holidays
export const isSpecificHoliday = (date: Date) => {
  const dateObj = {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth(),
    day: date.getUTCDate()
  };

  return specificHolidays.some(holiday =>
    holiday.year === dateObj.year &&
    holiday.month === dateObj.month &&
    holiday.day === dateObj.day
  );
};

// Get next available delivery day (same logic as web)
export const getNextDay = () => {
  // Get current UTC time
  const now = new Date();

  // Convert to Amsterdam time using Intl.DateTimeFormat
  const amsterdamFormatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Amsterdam",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  // Extract formatted parts
  const parts = amsterdamFormatter.formatToParts(now);
  const getPart = (type: string) => parts.find((p) => p.type === type)?.value || '0';

  const year = parseInt(getPart("year"));
  const month = parseInt(getPart("month")) - 1; // Convert to 0-based month
  const day = parseInt(getPart("day"));
  const hour = parseInt(getPart("hour"));
  const minute = parseInt(getPart("minute"));
  const second = parseInt(getPart("second"));

  // Create a new Date object using Amsterdam time components
  let amsterdamDate = new Date(Date.UTC(year, month, day, hour, minute, second));

  // Move to the next day
  amsterdamDate.setUTCDate(amsterdamDate.getUTCDate() + 1);

  // Keep moving to the next day until we find a valid date
  // that's not a weekend and not a specific holiday
  let iterations = 0;
  while (
    (amsterdamDate.getUTCDay() === 6 || // Saturday
      amsterdamDate.getUTCDay() === 0 || // Sunday
      isSpecificHoliday(amsterdamDate)) &&
    iterations < 10 // Prevent infinite loops
  ) {
    amsterdamDate.setUTCDate(amsterdamDate.getUTCDate() + 1);
    iterations++;
  }

  return amsterdamDate.toISOString().split('T')[0];
};

// Get same day delivery date
export const getSameDayDelivery = () => {
  const now = new Date();
  const amsterdamFormatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Amsterdam",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const parts = amsterdamFormatter.formatToParts(now);
  const getPart = (type: string) => parts.find((p) => p.type === type)?.value || '0';

  const year = parseInt(getPart("year"));
  const month = parseInt(getPart("month")) - 1;
  const day = parseInt(getPart("day"));
  const hour = parseInt(getPart("hour"));
  const minute = parseInt(getPart("minute"));
  const second = parseInt(getPart("second"));

  const amsterdamDate = new Date(Date.UTC(year, month, day, hour, minute, second));
  return amsterdamDate.toISOString().split('T')[0];
};

// Format date to YYYY-MM-DD
export const formatDateToYYYYMMDD = (dateInput: string | Date) => {
  const date = new Date(dateInput);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Generate holidays array (same logic as web)
export const generateHolidays = (shippingCountry: string = 'NL') => {
  const years = [2024, 2025];
  const holidayDates: Date[] = [];

  // Convert specific holidays to Date objects
  const specificHolidayDates = specificHolidays.map(holiday =>
    new Date(holiday.year, holiday.month, holiday.day)
  );

  holidayDates.push(...specificHolidayDates);
  
  // Add Belgian holiday if shipping to Belgium
  if (shippingCountry === "BE") {
    holidayDates.push(new Date(2025, 4, 1));
  }

  // Add Saturdays and Sundays for the years 2024 and 2025
  const weekendHolidays: Date[] = [];

  for (const year of years) {
    for (let month = 0; month < 12; month++) {
      for (let day = 1; day <= 31; day++) {
        const date = new Date(year, month, day);
        // Check if the date is within valid bounds for the year
        if (date.getFullYear() === year) {
          if (date.getDay() === 6 || date.getDay() === 0) { // 6 = Saturday, 0 = Sunday
            weekendHolidays.push(date);
          }
        }
      }
    }
  }

  // Combine public holidays and weekend holidays
  let allHolidays = [...holidayDates, ...weekendHolidays];

  // Get today's date to add past dates up to today (excluding today)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const startYear = 2024;
  const endYear = 2025;

  // Loop through each month and add the past dates up to today, excluding today
  for (let year = startYear; year <= endYear; year++) {
    for (let month = 0; month < 12; month++) {
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        date.setHours(0, 0, 0, 0);

        if (date <= today) { // Only include dates strictly before today
          if (!allHolidays.some(holiday => holiday.getTime() === date.getTime())) {
            allHolidays.push(date);
          }
        }
      }
    }
  }

  // Remove duplicates by converting to ISO strings and back to Date objects
  const uniqueHolidays = Array.from(new Set(allHolidays.map(date => date.toISOString()))).map(date => new Date(date));

  // Sort holidays in ascending order
  uniqueHolidays.sort((a, b) => a.getTime() - b.getTime());

  return uniqueHolidays;
};

// Check if a date is a holiday
export const isHoliday = (date: Date, holidays: Date[]) => {
  return holidays.some((holiday) =>
    date.getFullYear() === holiday.getFullYear() &&
    date.getMonth() === holiday.getMonth() &&
    date.getDate() === holiday.getDate()
  );
};

// Check if prioritized order is available
export const checkPriorizedOrderAvailability = () => {
  // Get current time and day in Amsterdam timezone
  const now = new Date();
  const amsterdamFormatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Amsterdam",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const parts = amsterdamFormatter.formatToParts(now);
  const hour = parseInt(parts.find(p => p.type === 'hour')?.value || '0');
  const minute = parseInt(parts.find(p => p.type === 'minute')?.value || '0');
  const weekdayName = parts.find(p => p.type === 'weekday')?.value || '';
  
  // Convert weekday name to number (1=Monday, 7=Sunday)
  const weekdayMap: { [key: string]: number } = {
    'Mon': 1, 'Tue': 2, 'Wed': 3, 'Thu': 4, 'Fri': 5, 'Sat': 6, 'Sun': 7
  };
  const weekday = weekdayMap[weekdayName] || 1;
  
  // Check if current time is between 00:00 and 10:00
  const isInTimeWindow = hour >= 0 && hour < 10;
  
  // Check if current day is NOT Saturday (6) or Sunday (7)
  const isNotWeekend = weekday !== 6 && weekday !== 7;
  
  return isInTimeWindow && isNotWeekend;
};

// Format date for display
export const formatDateForDisplay = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('nl-NL', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Get marked dates for calendar
export const getMarkedDates = (selectedDate: string | null, holidays: Date[]) => {
  const markedDates: { [key: string]: any } = {};

  // Mark holidays as disabled
  holidays.forEach(holiday => {
    const dateString = formatDateToYYYYMMDD(holiday);
    markedDates[dateString] = {
      disabled: true,
      disableTouchEvent: true,
      marked: true,
      dotColor: '#EF4444'
    };
  });

  // Mark selected date
  if (selectedDate) {
    markedDates[selectedDate] = {
      selected: true,
      selectedColor: '#FD4F01',
      selectedTextColor: 'white'
    };
  }

  return markedDates;
}; 