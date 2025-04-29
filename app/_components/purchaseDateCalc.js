// Get current month and year
const now = new Date();
const currentMonth = now.getMonth(); // 0-based
const currentYear = now.getFullYear();

export const inCurrentMonth = function (batteries) {
  return batteries.filter((battery) => {
    if (!battery.PD) return false;

    const parsedDate = new Date(battery.PD);
    return (
      parsedDate.getFullYear() === currentYear &&
      parsedDate.getMonth() === currentMonth
    );
  }).length;
};

export const beforeCurrentMonth = function (batteries) {
  return batteries.filter((battery) => {
    if (!battery.PD) return false;

    const parsedDate = new Date(battery.PD);
    return (
      parsedDate.getFullYear() < currentYear ||
      (parsedDate.getFullYear() === currentYear &&
        parsedDate.getMonth() < currentMonth)
    );
  }).length;
};
