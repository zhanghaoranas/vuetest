export const getAreaList = ({ currentPage }) => {
  const areaList = [];
  for (let i = 0; i < 20; i++) {
    areaList.push({
      areaName: `${currentPage} - 区域${i}`,
      areaId: i,
      id: i,
    });
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          data: {
            total: areaList.length,
            records: currentPage < 3 ? areaList : [],
          },
        },
      });
    }, 300);
  });
};
