const currentDate = new Date();
const currentMonth = currentDate.getMonth(); // 0-indexed: Jan = 0
const currentYear = currentDate.getFullYear();

const roomsThisMonth = userDetails?.rooms?.filter(room => {
  const createdAt = new Date(room.createdAt);
  return (
    createdAt.getMonth() === currentMonth &&
    createdAt.getFullYear() === currentYear
  );
}) || [];