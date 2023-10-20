export const API_END_POINT = 'https://kdt-frontend.programmers.co.kr';
const USERNAME = 'jaewoong';

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: { 'Content-Type': 'application/json', 'x-username': USERNAME },
    });

    if (res.ok) {
      return await res.json();
    }

    throw new Error('API 호출 오류');
  } catch (e) {
    alert(e.message);
  }
};
