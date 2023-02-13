export function getToday() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = today.getMonth() + 1;
  const dd = today.getDate();

  const result = `${yyyy} - ${String(mm).padStart(2, 0)} - ${String(
    dd
  ).padStart(2, 0)}`;

  return result;
}

export function getTime() {
  const today = new Date();
  const hour = today.getHours();
  const min = today.getMinutes();
  const sec = today.getSeconds();

  console.log(
    `${String(hour).padStart(2, 0)} : ${String(min).padStart(2, 0)} : ${String(
      sec
    ).padStart(2, 0)}`
  );
}

export function getWelcomeTime() {
  return `오늘은 ${getToday} ${getTime}입니다.`;
}
