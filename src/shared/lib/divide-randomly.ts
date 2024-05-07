export const divideRandomly = (num: number, n: number): number[] => {
  const randomPoints = Array.from({ length: n - 1 }, () => Math.random() * num);
  randomPoints.sort((a, b) => a - b);

  const parts = [randomPoints[0]];
  for (let i = 1; i < n - 1; i++) {
    parts.push(randomPoints[i] - randomPoints[i - 1]);
  }
  parts.push(num - randomPoints[n - 2]);

  return parts.map(part => Math.round(part * 100) / 100);
};
